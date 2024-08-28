//importe de la base de datos
const db = require('../db/db_connection');
//impore de variable para poder mapear las solicitudes
const map = require('../utils/mapData')

//función para filtrar las solicitudes en base a la materia 
//deseada ya sea en primera, segunda o en ambas opciones. 

const filterBySignature = async (signature, options) => {
    let requests = []

    try {
        switch (options.length) {
            case 1: {
                if (options[0] == "first") {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where('prim_op', signature)
                        
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData
                } else if (options[0] == "second") {
                    requests = await db('rcrt_all_elements')
                        .select('*')
                        .where('seg_op', signature)
                        
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
                        seg_op: sign                })
                    
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
    filterBySignature
}