//importe de las funciones utilizadas para administrar la db
const db = require('../db/db_connection');
const bookingFilter = require('../utils/filterOptions');
const Query = require('../utils/queryClass');
//función para obtener todas las solicitudes hechas en este nuevo ciclo
const getRequests = async (req, res) => {

    try {
        let requests = []

        const { bookingOption, cycle, state,
            signature, firstOption, secondOption } = req.query

        //validación para controlar que se quiere filtrar por tipo de 
        //contratación
        if (bookingOption) {
            if (cycle) {
                if (state) {
                    const sendData = await bookingFilter.filterByBookingCycleState(
                        bookingOption, cycle, state)
                    if (sendData) {
                        return res.status(200).json({ "data": sendData })
                    } else {
                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                    }
                } else {
                    const sendData = await bookingFilter.filterByBookingCycle(bookingOption, cycle)
                    if (sendData) {
                        return res.status(200).json({ "data": sendData })
                    } else {
                        return res.status(404).json({ message: 'solicitudes no encontradas' })
                    }
                }
            } else {
                const sendData = await bookingFilter.filterByBooking(bookingOption)
                if (sendData) {
                    return res.status(200).json({ "data": sendData })
                } else {
                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                }
            }


        } else if (cycle) {

            const sendData = await filter.filterByCycle(cycle)
            if (sendData) {
                return res.status(200).json({ "data": sendData })
            } else {
                return res.status(404).json({ message: 'solicitudes no encontradas' })
            }

        } else if (signature) {

            if (firstOption && secondOption) {
                console.log("entra en primera opción y segunda opción")
                const sendData = await filter.filterBySignature(signature, [firstOption, secondOption])
                if (sendData) {
                    return res.status(200).json({ "data": sendData })
                } else {
                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                }


            } else if (firstOption) {

                const sendData = await filter.filterBySignature(signature, [firstOption])
                if (sendData) {
                    return res.status(200).json({ "data": sendData })
                } else {
                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                }

            } else if (secondOption) {

                const sendData = await filter.filterBySignature(signature, [secondOption])
                if (sendData) {
                    return res.status(200).json({ "data": sendData })
                } else {
                    return res.status(404).json({ message: 'solicitudes no encontradas' })
                }
            }

        } else {

            //obteniendo información principal
            requests = await db('rcrt_all_elements')
                .select('*')
                .limit(10)
                .orderBy('id', 'asc');

            //obteniendo identificadores de las solicitudes
            const elementsData = requests.map((object) => {
                return object.id
            })
            //obteniendo la data complementario de cada solicitud
            const complementaryData = await Promise.all(elementsData.map(async (id) => {
                return data = await db('rcrt_elements_data').where('element_id', id)
            }))

            //variable para sacar los items de la data complementaria
            //esto se hace porque la data complementaria trae este formato:
            // [[{},{},{}],[{},{},{}]]
            const items = []

            complementaryData.forEach(data => {
                data.forEach(item => items.push(item))
            })

            //anidando toda la data que se necesita para luego enviarla
            const sendData = requests.map(request => {
                const data = items.filter((item) => item.element_id === request.id)

                if (data) {
                    return { ...request, data }
                } else {
                    return request
                }
            })

            if (sendData) {
                return res.status(200).json({ "data": sendData })
            } else {
                return res.status(404).json({ message: 'solicitudes no encontradas' })
            }
        }

    } catch (error) {
        console.error('Error al obtener las solicitudes: ', error)
        return res.status(500).json({ message: 'Error al obtener las solicitudes' })
    }

}

module.exports = {
    getRequests,
}