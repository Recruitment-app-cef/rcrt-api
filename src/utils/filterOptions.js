//importe de la base de datos
const db = require('../db/db_connection');
//impore de variable para poder mapear las solicitudes
const map = require('../utils/mapData')

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
    let acceptedCondition = state ? '>' : '='
    let acceptedValue = state ? 0 : 0

    try {
        switch (bookingOption) {
            case "Remunerado": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where({
                        es_remunerado: 1,
                        semester: cycle,
                    })
                    .where('accepted', acceptedCondition, acceptedValue)
                    .limit(10)
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Ambas": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where({
                        semester: cycle,
                    })
                    .where('accepted', acceptedCondition, acceptedValue)
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
                    })
                    .where('accepted', acceptedCondition, acceptedValue)
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

module.exports = {
    filterByBooking,
    filterByBookingCycle,
    filterByBookingCycleState
}