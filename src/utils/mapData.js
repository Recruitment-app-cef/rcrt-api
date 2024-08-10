//importe de base de datos
const db = require('../db/db_connection')

//archivo destinado a realizar el mapeo de los datos obtenidos

const mapData = (personalData, academicData, bookingData) => {

    //campos requeridos para cada área 
    const personalFields = ['Image', 'Carne', 'Nombres', 'Apellidos', 'TelefonoFijo', 'TelefonoMovil', 'Emails']
    const academicFields = ['Carrera', 'NivelEstudio', 'MateriasAprobadas', 'CUM', 'MateriasProximas', 'Experiencia']
    const bookingFields = ['PrimeraOpcion', 'SegundaOpcion', 'Ciclo', 'Contratacion', 'Nota1aOpcion', 'Comentario']

    //funciones de mapeo
    const personalDataMapped = mappingPersonalData(personalFields, personalData)
    const academicDataMapped = mappingAcademicData(academicFields, academicData)
    const bookingDataMapped = mappingBookingData(bookingFields, bookingData)

    const dataArray = [personalDataMapped, academicDataMapped, bookingDataMapped]

    return dataArray
}

//función para mapear los datos personales del instructor
const mappingPersonalData = (fields, data) => {
    return fields.reduce((acc, field) => {
        const found = data.find(item => item.identifier === field)
        if (found) {
            acc[field.toLowerCase()] = found.value
        }
        return acc
    }, {})
}

//función para mapear los datos académicos del instructor
const mappingAcademicData = (fields, data) => {
    return fields.reduce((acc, field) => {
        const found = data.find(item => item.identifier === field)
        if (found) {
            acc[field.toLowerCase()] = found.value
        }
        return acc
    }, {})
}

//función para mapear los datos de contratación del instructor
const mappingBookingData = (fields, data) => {
    return fields.reduce((acc, field) => {
        const found = data.find(item => item.identifier === field)
        if (found) {
            acc[field.toLowerCase()] = found.value
        }
        return acc
    }, {})
}

//función para crear un arreglo de objetos para insertar en db con los emails
//del usuario
const mappingEmails = (emails, id) => {

    if (!Array.isArray(emails)) {
        return {
            content_type: 2,
            data: emails,
            element_id: id,
            sort_order: 1
        }
    } else {
        const mappedEmails = emails.map((email, index) => ({
            content_type: 2,
            data: email,
            element_id: id,
            sort_order: index + 1
        }))

        return mappedEmails
    }
}

//función para crear una arreglo de objetos para insertar en db con 
//las materias que cursará el usuario en el próximo ciclo
const mappingSignatures = (signatures, id) => {

    if (!Array.isArray(signatures)) {
        return {
            content_type: 4,
            data: signatures,
            element_id: id,
            sort_order: 1
        }
    } else {
        const mappedSignatures = signatures.map((signature, index) => ({
            content_type: 4,
            data: signature,
            element_id: id,
            sort_order: index + 1
        }))

        return mappedSignatures
    }
}


//función para crear un arreglo de objetos para insertar en db con
//los teléfonos, y opciones de colaboración del usuario
const mappingContactsAndSignatures = (telefonofijo, telefonomovil, primeraopcion, segundaopcion, id) => {
    const mappedArray = [
        {
            content_type: 6,
            data: primeraopcion,
            element_id: id,
            sort_order: 1
        },
        {
            content_type: 6,
            data: segundaopcion,
            element_id: id,
            sort_order: 2
        },
        {
            content_type: 3,
            data: telefonofijo,
            element_id: id,
            sort_order: 1
        },
        {
            content_type: 3,
            data: telefonomovil,
            element_id: id,
            sort_order: 2
        }
    ]

    return mappedArray
}

//función para devolver las solicitudes con la data 
//extra anidada

const mappingRequests = async (requests) => {

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

//función para mapear los semestres

const mappingSemesters = (semesters, content) => {
    let mappingSemesters = []

    //obteniendo solamente aquellos semestres que cumplan con la 
    //condición proveniente en la variable 'content'

    mappingSemesters = semesters.filter((obj) => {
        return obj.semester.includes(content)
    })

    return mappingSemesters
}

const concatSemesters = (firstCycle, secondCycle, thirdCycle) => {
    var concatSemesters = []

    //obteniendo arreglo de mayor tamaño
    const maxLength = Math.max(firstCycle.length,secondCycle.length,thirdCycle.length)
    
    //concatenando semestres
    /* for (let i = 0; i < maxLength; i++) {
        if (i < secondCycle.length) {
            concatSemesters.push(secondCycle[i].semester)
        }
        if (i < thirdCycle.length) {
            concatSemesters.push(thirdCycle[i].semester)
        }
        if (i < firstCycle.length) {
            concatSemesters.push(firstCycle[i].semester)
        }
    } */

    concatSemesters = Array.from({length: maxLength})
        .flatMap((_,i) => [
            secondCycle[i],
            thirdCycle[i],
            firstCycle[i]
        ].filter(Boolean))

    return concatSemesters
}

module.exports = {
    mapData,
    mappingEmails,
    mappingSignatures,
    mappingContactsAndSignatures,
    mappingRequests,
    mappingSemesters,
    concatSemesters
}