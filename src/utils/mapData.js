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

module.exports = {
    mapData
}