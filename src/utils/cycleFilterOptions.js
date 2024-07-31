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

//función para filtrar las solicitudes por el ciclo y estado seleccionado

const filterByCycleState = async (cycle, state) => {
    let requests = []
    let acceptedCondition = state ? '>' : '='
    let acceptedValue = state ? 0 : 0

    try {
        requests = await db('rcrt_all_elements')
            .select('*')
            .where('semester', cycle)
            .where('accepted', acceptedCondition, acceptedValue)
            .limit(10)
            .orderBy('id', 'asc');

        const sendData = await map.mappingRequests(requests)
        return sendData
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar las solicitudes por el ciclo y materia seleccionada

const filterByCycleSignature = async (cycle, signature, options) => {
    let requests = []

    try {
        switch (options.length) {
            case 1: {
                if (options[0] == "first") {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            prim_op: signature, 
                            semester: cycle
                        })
                        .limit(10)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData
                } else if (options[0] == "second") {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            seg_op: signature,
                            semester: cycle
                        })
                        .limit(10)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData
                }
            }
            case 2: {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where({
                        prim_op: signature,
                        seg_op: signature,
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

//función para filtrar solicitudes por ciclo y validador

const filterByCycleValidator = async (cycle, idValidator) => {

    let requests = []

    try {
        requests = await db('rcrt_all_elements')
            .select('*')
            .where({
                semester: cycle,
                accepted: idValidator
            })
            .limit(10)
            .orderBy('id', 'asc');

        const sendData = await map.mappingRequests(requests)
        return sendData
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }

}


module.exports = {
    filterByCycle,
    filterByCycleState,
    filterByCycleSignature,
    filterByCycleValidator
}