//importe de la base de datos
const db = require('../db/db_connection');
//impore de variable para poder mapear las solicitudes
const map = require('../utils/mapData')

//función para filtrar las solicitudes por estado
const filterByState = async (state) => {
    let requests = []
    let acceptedCondition = state ? '>' : '='
    let acceptedValue = state ? 0 : 0

    try {
        requests = await db('rcrt_all_elements')
            .select('*')
            .where('accepted', acceptedCondition, acceptedValue)
            .limit(10)
            .orderBy('id', 'asc');

        const sendData = await map.mappingRequests(requests)
        return sendData
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar las solicitudes en base a la persona que ha validado 
//o aceptado al instructor/a
const filterByValidator = async (idValidator) => {
    let requests = []

    try {

        requests = await db('rcrt_all_elements')
            .select('*')
            .where('accepted', '=', idValidator)
            .limit(10)
            .orderBy('id', 'asc');

        const sendData = await map.mappingRequests(requests)
        return sendData
        
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

module.exports = {
    filterByState,
    filterByValidator
}