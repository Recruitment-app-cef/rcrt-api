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

    //guardando data en db
    try {
        const response = await db('rcrt_all_elements').insert([{ idnumber: mappedData[0].carne },
        { firstname: mappedData[0].nombres }, { lastname: mappedData[0].appellidos },
        { carrera: mappedData[1].carrera },{address:''}, { deleted: '0' }, 
        { comments: comentario },
        { nmaterias: mappedData[1].materiasaprobadas }, { cum: mappedData[1].cum },
        { niv_est: mappedData[1].vivelestudio }, { prim_op: mappedData[2].primeraopcion },
        { experiencia: experiencia }, { fecha: fechaFormateada },
        { nota: mappedData[2].nota1aopcion }, { es_remunerado: es_remunerado },
        { seg_op: mappedData[2].segundaopcion }, { accepted: '11' }, { semester: mappedData[2].ciclo },
        { confirmed: '0' }, { accepted_op: '1' }, { picture: archivo }, { nota_seg_op: 'null' }, { curso_aprobado: 'null' }
        ]);

        if(response){
            return res.status(201).json({message: "OK"})
        }
    } catch (error) {
        return res.status(400).json({status: error},{message: "Error al intentar crear la solicitud"})
    }
}

module.exports = {
    saveRequestData
}