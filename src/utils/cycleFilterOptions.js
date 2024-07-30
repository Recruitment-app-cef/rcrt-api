//importe de la base de datos
const db = require('../db/db_connection');
//impore de variable para poder mapear las solicitudes
const map = require('../utils/mapData')

//función para filtrar las solicitudes por el ciclo seleccionado

const filterByCycle = async (cycle) => {

    let requests = []

    try {
        requests = await db('rcrt_all_elements')
            .select('*')
            .where('semester', cycle)
            .limit(10)
            .orderBy('id', 'asc');

        const sendData = await map.mappingRequests(requests)
        return sendData
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }

}

module.exports = {
    filterByCycle
}