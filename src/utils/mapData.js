//archivo destinado a realizar el mapeo de los datos obtenidos

const mapData = (personalData, academicData, bookingData) => {

    //campos requeridos para cada área 
    const personalFields = ['Image', 'Carne', 'Nombres', 'Apellidos', 'TelefonoFijo', 'TelefonoMovil', 'Emails']
    const academicFields = ['Carrera', 'NivelEstudio', 'MateriasAprobadas', 'CUM', 'MateriasProximas', 'Experiencia']
    const bookingFields = ['PrimeraOpcion','SegundaOpcion','Ciclo','Contratación','Nota1aOpcion','Comentario']
    
    //funciones de mapeo
    const personalDataMapped = mappingPersonalData(personalFields,personalData)
    const academicDataMapped = mappingAcademicData(academicFields, academicData)
    const bookingDataMapped = mappingBookingData(bookingFields, bookingData)
    
    const dataArray = [personalDataMapped, academicDataMapped, bookingDataMapped]
    
    return dataArray
}    

//función para mapear los datos personales del instructor
const mappingPersonalData = (fields,data) => {
    return fields.reduce((acc, field) => {
        const found = data.find(item => item.identifier === field)
        if(found){
            acc[field.toLowerCase()] = found.value
        }
        return acc
    },{})
}

//función para mapear los datos académicos del instructor
const mappingAcademicData = (fields,data) => {
    return fields.reduce((acc, field) => {
        const found = data.find(item => item.identifier === field)
        if(found){
            acc[field.toLowerCase()] = found.value
        }
        return acc
    },{})
}

//función para mapear los datos de contratación del instructor
const mappingBookingData = (fields,data) => {
    return fields.reduce((acc, field) => {
        const found = data.find(item => item.identifier === field)
        if(found){
            acc[field.toLowerCase()] = found.value
        }
        return acc
    },{})
}

//función para crear un arreglo de objetos para insertar en db con los emails
//del usuario
const mappingEmails = (emails, id) => {
    const mappedEmails = emails.map((email, index) => ({
            content_type: 2,
            data: email,
            element_id:id,
            sort_order:index+1
    }))

    return mappedEmails
}

//función para crear una arreglo de objetos para insertar en db con 
//las materias que cursará el usuario en el próximo ciclo
const mappingSignatures = (signatures, id) => {
    const mappedSignatures = signatures.map((signature, index) => ({
        content_type:4,
        data:signature,
        element_id:id,
        sort_order:index+1
    }))

    return mappedSignatures
}


//función para crear un arreglo de objetos para insertar en db con
//los teléfonos, y opciones de colaboración del usuario
const mappingContactsAndSignatures = (telefonofijo,telefonomovil,primeraopcion,segundaopcion, id) => {
    const mappedArray = [
        {
            content_type: 6,
            data: primeraopcion,
            element_id: id,
            sort_order:1
        },
        {
            content_type: 6,
            data: segundaopcion,
            element_id: id,
            sort_order:2
        },
        {    
            content_type: 3,
            data: telefonofijo,
            element_id: id,
            sort_order:1
        },
        {
            content_type: 3,
            data: telefonomovil,
            element_id: id,
            sort_order:2
        }
    ]

    return mappedArray
}

module.exports = {
    mapData,
    mappingEmails,
    mappingSignatures,
    mappingContactsAndSignatures
}