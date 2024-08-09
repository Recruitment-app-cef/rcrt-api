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
            .limit(20)
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
            .limit(20)
            .orderBy('id', 'asc');

        const sendData = await map.mappingRequests(requests)
        return sendData

    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar las solicitudes por estado y materia seleccionada

const filterByStateSignature = async (state, signature, options) => {
    let requests = []
    let acceptedCondition = state ? '>' : '='
    let acceptedValue = state ? 0 : 0

    try {
        switch (options.length) {
            case 1: {
                if (options[0] == "first") {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            prim_op: signature
                        })
                        .where('accepted', acceptedCondition, acceptedValue)
                        .limit(20)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData
                } else if (options[0] == "second") {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            seg_op: signature
                        })
                        .where('accepted', acceptedCondition, acceptedValue)
                        .limit(20)
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
                        seg_op: signature
                    })
                    .where('accepted', acceptedCondition, acceptedValue)
                    .limit(20)
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar por asignatura y validador

const filterBySignatureValidator = async (signature, options, idValidator) => {
    let requests = []

    try {
        switch (options.length) {
            case 1: {
                if (options[0] == "first") {

                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            prim_op: signature,
                            accepted: idValidator
                        })
                        .limit(20)
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData

                } else if (options[0] == "second") {

                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where({
                            seg_op: signature,
                            accepted: idValidator
                        })
                        .limit(20)
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
                        accepted: idValidator
                    })
                    .limit(20)
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
    filterByState,
    filterByValidator,
    filterByStateSignature,
    filterBySignatureValidator
}