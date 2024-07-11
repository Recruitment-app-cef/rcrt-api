//importe de las funciones utilizadas para administrar la db
const db = require('../db/db_connection');
//módulo para obtener los archivos fuente de una ruta 
const path = require('path')

const map = require('../utils/mapData')

const saveRequestData = async (req, res) => {
    //obteniendo data proveniente de la request    
    const data = req.body.data
    
    //obteniendo la data contenida en el json por secciones
    const personalData = data[0].value
    const academicData = data[1].value
    const bookingData = data[2].value
    
    //enviando la información filtrada a mapearse y obteniendola
    const mappedData = map.mapData(personalData, academicData, bookingData)

    //debugger para saber si la data está siendo mapeada
    /* console.log(mappedData[0])
    console.log(mappedData[1])
    console.log(mappedData[2]) */

    //destructurando data enviada desde frontend

    //obtención de fecha actual para almacenar en DB
    const fechaActual = new Date()
    const año = fechaActual.getFullYear()
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0')
    const dia = String(fechaActual.getDate()).padStart(2, '0')
    const fechaFormateada = `${año}-${mes}-${dia}`

    //obteniendo imagen de ruta fuente
    const rutaCompleta = mappedData[0].image
    const archivo = path.basename(rutaCompleta)

    //determinando si el aspirante desea ser instructor remunerado o no
    var es_remunerado = ''
    if(mappedData[2].contratación == "remunerado"){
        es_remunerado = '1'
    }else{
        es_remunerado = '0'
    }

    //determinando si la persona colocó experiencia previa
    var experiencia = ''
    if(mappedData[1].experiencia != ''){
        experiencia == mappedData[1].experiencia
    }else{
        experiencia = ''
    }

    //determinando si la persona colocó algún comentario extra
    var comentario = ''
    if(mappedData[2].comentario != ''){
        comentario = mappedData[2].comentario
    }else{
        comentario = ''
    }

    //determinando el nivel académico de la persona
    var nivestudio = ''
    switch(mappedData[1].nivelestudio){
        case 'Primer Ciclo': nivestudio = 1
        case 'Segundo Ciclo': nivestudio = 2
        case 'Tercer Ciclo': nivestudio = 3
        case 'Cuarto Ciclo': nivestudio = 4
        case 'Quinto Ciclo': nivestudio = 5
        case 'Sexto Ciclo': nivestudio = 6
        case 'Septimo Ciclo': nivestudio = 7
        case 'Octavo Ciclo': nivestudio = 8
        case 'Noveno Ciclo' : nivestudio = 9
        case 'Decimo Ciclo' : nivestudio = 10 
    }

    //guardando data en db
    try {
        //verificando que el usuario ya está registrado en la DB
        const verificandoQueExisteEnLaDB = await db('rcrt_all_elements')
        .where('idnumber', mappedData[0].carne) 

        if(verificandoQueExisteEnLaDB.length == 0){
            const response = await db('rcrt_all_elements').returning('id').insert([
            { idnumber: mappedData[0].carne ,
            firstname: mappedData[0].nombres, 
            lastname: mappedData[0].apellidos,
            carrera: mappedData[1].carrera,
            address:'none', 
            deleted: 0, 
            comments: comentario,
            nmaterias: mappedData[1].materiasaprobadas,
            cum: mappedData[1].cum,
            niv_est: nivestudio,
            prim_op: mappedData[2].primeraopcion,
            experiencia: experiencia,
            fecha: fechaFormateada,
            nota: mappedData[2].nota1aopcion,
            es_remunerado: es_remunerado,
            seg_op: mappedData[2].segundaopcion,
            accepted: 11,
            semester: mappedData[2].ciclo,
            confirmed: 0,
            accepted_op: 1,
            picture: archivo,
            nota_seg_op: 0,
            curso_aprobado: 0 }
            ]).returning("*");

            console.log(response[0].id)

            //mapeando emails
            const emailData = map.mappingEmails(mappedData[0].emails, response[0].id)

            //mapeando materias
            const signaturesData = map.mappingSignatures(mappedData[1].materiasproximas, response[0].id)

            //mapeando telefonos y opciones a colaborar
            const addingData = map.mappingContactsAndSignatures(
                mappedData[0].telefonofijo,
                mappedData[0].telefonomovil,
                mappedData[2].primeraopcion,
                mappedData[2].segundaopcion,
                response[0].id
            )

            //creando arreglo final para query
            const dataToQuery = [...emailData,...signaturesData,...addingData]
            
            //guardando datos de usuario en tabla de rcrt_elements_data
            const saveData = await db("rcrt_elements_data").returning('id')
            .insert(dataToQuery).returning('*')
/*             console.log(response) */
            
            console.log(saveData)

            if(response && saveData){
                return res.status(201).json({message: `OK`})
            }
        }else{
            return res.status(400).json({message: "Ya existe un registro en la DB"})
        }

    } catch (error) {
        console.log('Error al guardar la request',error)
        return res.status(400).json({message: "Error al intentar crear la solicitud"})
    }
}

const getRequestData = async (req, res) => {
    //obteniendo id del usuario de la request enviada
    const identifier = req.query.id

    //buscando en la DB y obteniendo la data
    const userData = await db('rcrt_all_elements')
    .where('idnumber', identifier)   

    if(userData.length == 0){
        res.status(404).json({message: "Usuario no encontrado"})
    }else{  
        res.status(200).json({message: `OK`})
    }

}

module.exports = {
    saveRequestData,
    getRequestData
}