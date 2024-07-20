//importe de las funciones utilizadas para administrar la db
const db = require('../db/db_connection');

//función para obtener todas las solicitudes hechas en este nuevo ciclo
const getRequests = async (req, res) => {
    //obteniendo información principal
    const requests = await db.select('*').table('rcrt_all_elements')
        .limit(10).orderBy('id', 'asc')

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

const getRequestsByBooking = async (req, res) => {
    const bookingOption = req.query.option

    if (bookingOption == 'Remunerado') {
        const requests = await db().select('*').table('rcrt_all_elements')
            .where('es_remunerado', 1).limit(10).orderBy('id', 'asc')

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
    } else {
        const requests = await db().select('*').table('rcrt_all_elements')
            .where('es_remunerado', 0).limit(10).orderBy('id', 'asc')

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

}

module.exports = {
    getRequests,
    getRequestsByBooking
}