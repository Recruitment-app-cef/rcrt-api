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
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Ambas": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Por horas sociales": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('es_remunerado', 0)
                    
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
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Ambas": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('semester', cycle)
                    
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
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData

            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar solicitudes por contratación y estado

const filterByBookingState = async (booking, state) => {
    let requests = []
    let acceptedCondition = state ? '>' : '='
    let acceptedValue = state ? 0 : 0

    try {
        switch (booking) {
            case "Remunerado": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('es_remunerado', 1)
                    .where('accepted', acceptedCondition, acceptedValue)
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Ambas": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('accepted', acceptedCondition, acceptedValue)
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Por horas sociales": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('es_remunerado', 0)
                    .where('accepted', acceptedCondition, acceptedValue)
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData

            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar solicitudes por contratación y asignatura

const filterByBookingSignature = async (booking, signature, options) => {
    let requests = []

    try {
        switch (booking) {
            case "Remunerado": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    prim_op: signature,
                                    es_remunerado: 1
                                })
                                                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    seg_op: signature,
                                    es_remunerado: 1
                                })
                                
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
                                es_remunerado: 1
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData
                    }
                }
            }
            case "Ambas": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    prim_op: signature,
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    seg_op: signature,
                                })
                                
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
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData
                    }
                }
            }
            case "Por horas sociales": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    prim_op: signature,
                                    es_remunerado: 0
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    seg_op: signature,
                                    es_remunerado: 0
                                })
                                
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
                                es_remunerado: 0
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData
                    }
                }
            }
        }
    }
    catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar solicitudes por contratación, estado y asignatura
//en primera, segunda o ambas opciones de aplicación

const filterByBookingStateSignature = async (booking, state, signature, options) => {
    let requests = []
    let acceptedCondition = state ? '>' : '='
    let acceptedValue = state ? 0 : 0

    try {
        switch (booking) {
            case "Remunerado": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    prim_op: signature,
                                    es_remunerado: 1
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    seg_op: signature,
                                    es_remunerado: 1
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
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
                                es_remunerado: 1
                            })
                            .where('accepted', acceptedCondition, acceptedValue)
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
            case "Ambas": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    prim_op: signature
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
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
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
            case "Por horas sociales": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    prim_op: signature,
                                    es_remunerado: 0
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    seg_op: signature,
                                    es_remunerado: 0
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
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
                                es_remunerado: 0
                            })
                            .where('accepted', acceptedCondition, acceptedValue)
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar solicitudes por contratación, asignatura
//en primera, segundao ambas opciones y validador

const filterByBookingSignatureValidator = async (booking, signature,
    options, idValidator) => {
    let requests = []

    try {
        switch (booking) {
            case "Remunerado": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    prim_op: signature,
                                    es_remunerado: 1,
                                    accepted: idValidator
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    seg_op: signature,
                                    es_remunerado: 1,
                                    accepted: idValidator
                                })
                                
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
                                es_remunerado: 1,
                                accepted: idValidator
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
            case "Ambas": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    prim_op: signature,
                                    accepted: idValidator
                                })
                                
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
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
            case "Por horas sociales": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    prim_op: signature,
                                    es_remunerado: 0,
                                    accepted: idValidator
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {

                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    seg_op: signature,
                                    es_remunerado: 0,
                                    accepted: idValidator
                                })
                                
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
                            es_remunerado: 0,
                            accepted: idValidator
                        })
                        
                        .orderBy('id', 'asc');

                    const sendData = await map.mappingRequests(requests)
                    return sendData

                    }
                }
            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }

}

//función para filtrar solicitudes por contratación y validador

const filterByBookingValidator = async (booking, idValidator) => {
    let requests = []

    try {
        switch (booking) {
            case "Remunerado": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('es_remunerado', 1)
                    .where('accepted', '=', idValidator)
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Ambas": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('accepted', '=', idValidator)
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData
            }
            case "Por horas sociales": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where('es_remunerado', 0)
                    .where('accepted', '=', idValidator)
                    
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
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData

            }
        }

    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar por contratación, ciclo, y materia
//en primera o segunda opción

const filterByBookingCycleSignature = async (booking, cycle, signature, options) => {
    let requests = []

    try {
        switch (booking) {
            case "Remunerado": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 1,
                                    semester: cycle,
                                    prim_op: signature
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 1,
                                    semester: cycle,
                                    seg_op: signature
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData
                        }
                    }
                    case 2: {
                        requests = await db('rcrt_all_elements')
                            .select('*')
                            .where({
                                es_remunerado: 1,
                                semester: cycle,
                                prim_op: signature,
                                seg_op: signature
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData
                    }
                }
            }
            case "Ambas": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    semester: cycle,
                                    prim_op: signature
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    semester: cycle,
                                    seg_op: signature
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData
                        }
                    }
                    case 2: {
                        requests = await db('rcrt_all_elements')
                            .select('*')
                            .where({
                                semester: cycle,
                                prim_op: signature,
                                seg_op: signature
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData
                    }
                }
            }
            case "Por horas sociales": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 0,
                                    semester: cycle,
                                    prim_op: signature
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 0,
                                    semester: cycle,
                                    seg_op: signature
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData
                        }
                    }
                    case 2: {
                        requests = await db('rcrt_all_elements')
                            .select('*')
                            .where({
                                es_remunerado: 0,
                                semester: cycle,
                                prim_op: signature,
                                seg_op: signature
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData
                    }
                }

            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }
}

//función para filtrar solicitudes por contratación, ciclo, estado
//y asignatura en primera o segunda opción

const filterByBookingCycleStateSignature = async (booking, cycle, state,
    signature, options
) => {
    let requests = []
    let acceptedCondition = state ? '>' : '='
    let acceptedValue = state ? 0 : 0

    try {
        switch (booking) {
            case "Remunerado": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 1,
                                    semester: cycle,
                                    prim_op: signature
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 1,
                                    semester: cycle,
                                    seg_op: signature
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        }
                    }
                    case 2: {
                        requests = await db('rcrt_all_elements')
                            .select('*')
                            .where({
                                es_remunerado: 1,
                                semester: cycle,
                                prim_op: signature,
                                seg_op: signature
                            })
                            .where('accepted', acceptedCondition, acceptedValue)
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
            case "Ambas": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    semester: cycle,
                                    prim_op: signature
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    semester: cycle,
                                    seg_op: signature
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        }
                    }
                    case 2: {
                        requests = await db('rcrt_all_elements')
                            .select('*')
                            .where({
                                semester: cycle,
                                prim_op: signature,
                                seg_op: signature
                            })
                            .where('accepted', acceptedCondition, acceptedValue)
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
            case "Por horas sociales": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 0,
                                    semester: cycle,
                                    prim_op: signature
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 0,
                                    semester: cycle,
                                    seg_op: signature
                                })
                                .where('accepted', acceptedCondition, acceptedValue)
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        }
                    }
                    case 2: {
                        requests = await db('rcrt_all_elements')
                            .select('*')
                            .where({
                                es_remunerado: 0,
                                semester: cycle,
                                prim_op: signature,
                                seg_op: signature
                            })
                            .where('accepted', acceptedCondition, acceptedValue)
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }

}

//función para filtrar por contratación, ciclo y validador
const filterByBookingCycleValidator = async (booking, cycle, idValidator) => {

    let requests = []

    try {
        switch (booking) {
            case "Remunerado": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where({
                        es_remunerado: 1,
                        semester: cycle,
                        accepted: idValidator
                    })
                    
                    .orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData

            }
            case "Ambas": {
                requests = await db('rcrt_all_elements')
                    .select('*')
                    .where({
                        semester: cycle,
                        accepted: idValidator
                    })
                    
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
                        accepted: idValidator
                    }).orderBy('id', 'asc');

                const sendData = await map.mappingRequests(requests)
                return sendData

            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }

}

//función para filtrar por contratación, ciclo, asignatura y validador
const filterByBookingCycleSignatureValidator = async (booking, cycle,
    signature, options, idValidator
) => {

    let requests = []

    try {
        switch (booking) {
            case "Remunerado": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 1,
                                    semester: cycle,
                                    prim_op: signature,
                                    accepted: idValidator
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 1,
                                    semester: cycle,
                                    seg_op: signature,
                                    accepted: idValidator
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        }
                    }
                    case 2: {
                        requests = await db('rcrt_all_elements')
                            .select('*')
                            .where({
                                es_remunerado: 1,
                                semester: cycle,
                                prim_op: signature,
                                seg_op: signature,
                                accepted: idValidator
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
            case "Ambas": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    semester: cycle,
                                    prim_op: signature,
                                    accepted: idValidator
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    semester: cycle,
                                    seg_op: signature,
                                    accepted: idValidator
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        }
                    }
                    case 2: {
                        requests = await db('rcrt_all_elements')
                            .select('*')
                            .where({
                                semester: cycle,
                                prim_op: signature,
                                seg_op: signature,
                                accepted: idValidator
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
            case "Por horas sociales": {
                switch (options.length) {
                    case 1: {
                        if (options[0] == "first") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 0,
                                    semester: cycle,
                                    prim_op: signature,
                                    accepted: idValidator
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        } else if (options[0] == "second") {
                            requests = await db('rcrt_all_elements')
                                .select('*')
                                .where({
                                    es_remunerado: 0,
                                    semester: cycle,
                                    seg_op: signature,
                                    accepted: idValidator
                                })
                                
                                .orderBy('id', 'asc');

                            const sendData = await map.mappingRequests(requests)
                            return sendData

                        }
                    }
                    case 2: {
                        requests = await db('rcrt_all_elements')
                            .select('*')
                            .where({
                                es_remunerado: 0,
                                semester: cycle,
                                prim_op: signature,
                                seg_op: signature,
                                accepted: idValidator
                            })
                            
                            .orderBy('id', 'asc');

                        const sendData = await map.mappingRequests(requests)
                        return sendData

                    }
                }
            }
        }
    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
    }

}


module.exports = {
    filterByBooking,
    filterByBookingCycle,
    filterByBookingState,
    filterByBookingSignature,
    filterByBookingValidator,
    filterByBookingCycleState,
    filterByBookingCycleSignature,
    filterByBookingCycleStateSignature,
    filterByBookingCycleValidator,
    filterByBookingCycleSignatureValidator,
    filterByBookingStateSignature,
    filterByBookingSignatureValidator
}