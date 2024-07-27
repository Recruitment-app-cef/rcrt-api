//importe de la base de datos
const db = require('../db/db_connection');
//impore de variable para poder mapear las solicitudes
const map = require('../utils/mapData')

//opciones para filtrar las solicitudes 

//función para filtrar las solicitudes por tipo de contratación
const filterByBooking = async (bookingOption) => {

    let requests = []

    try {
        switch (bookingOption) {
            case "Remunerado": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('es_remunerado', 1)
                    .limit(10)
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Ambas": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .limit(10)
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Por horas sociales": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('es_remunerado', 0)
                    .limit(10)
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar solicitudes por contratación y ciclo

const filterByBookingCycle = async (bookingOption, cycle) => {

    let requests = []

    try {
        switch (bookingOption) {
            case "Remunerado": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where({
                        es_remunerado: 1,
                        semester: cycle
                    })
                    .limit(10)
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Ambas": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('semester', cycle)
                    .limit(10)
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Por horas sociales": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where({
                        es_remunerado: 0,
                        semester: cycle
                    })
                    .limit(10)
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData

            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar solicitudes por contratación, ciclo y estado

const filterByBookingCycleState = async (bookingOption, cycle, state) => {

    let requests = []

    try {

        if (state == "Aceptados y/o confirmados") {
            switch (bookingOption) {
                case "Remunerado": {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            es_remunerado: 1,
                            semester: cycle,

                        })
                        .whereNot('accepted',0)
                        .limit(10)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData
                }
                case "Ambas": {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where('semester', cycle)
                        .whereNot('accepted',0)
                        .limit(10)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData
                }
                case "Por horas sociales": {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            es_remunerado: 0,
                            semester: cycle
                        })
                        .whereNot('accepted',0)
                        .limit(10)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData

                }
            }
        } else {
            switch (bookingOption) {
                case "Remunerado": {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            es_remunerado: 1,
                            semester: cycle,
                            accepted: 0

                        })
                        .limit(10)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData
                }
                case "Ambas": {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            semester : cycle,
                            accepted : 0
                        })
                        .limit(10)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData
                }
                case "Por horas sociales": {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            es_remunerado: 0,
                            semester: cycle,
                            accepted: 0
                        })
                        .limit(10)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData

                }
            }
        }

    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}



/* //función para filtrar las solicitudes por ciclo 
const filterByCycle = async (cycleOption) => {
    let requests = []
    try {
        requests = await db('rcrt_all_elements')
            .select('*')
            .where('semester', cycleOption)
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
        return sendData

    } catch (error) {
        console.error("Error al encontrar las solicitudes", error)
        return requests
    }
}

//función para filtrar resultados en base a la asignatura seleccionada
//y a la opción en que se desee buscar
const filterBySignature = async (signature, options) => {
    let requests = []
    try {
        switch (options.length) {
            case 1: {
                if (options[0] == "first") {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where('prim_op', signature )
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
                    return sendData

                } else {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where('seg_op', signature )
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
                    return sendData

                }
            }
            case 2: {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where({
                        prim_op: signature,
                        seg_op: signature
                    })
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
                return sendData
            }
            default: {
                return requests
            }
        }
    } catch (error) {
        console.error("Error al encontrar las solicitudes", error)
        return requests
    }
}

//función para filtrar resultados por 
 */
module.exports = {
    filterByBooking,
    filterByBookingCycle,
    filterByBookingCycleState
}