//importe de las funciones utilizadas para administrar la db
const db = require('../db/db_connection');
//módulo para obtener los archivos fuente de una ruta 
const path = require('path')

const saveRequestData = async (req, res) => {
    //recibiendo data enviada desde frontend
    var { personalData, academicData, bookingData } = req.body

    //obtención de fecha actual para almacenar en DB
    const fechaActual = new Date()
    const año = fechaActual.getFullYear()
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0')
    const dia = String(fechaActual.getDate()).padStart(2, '0')
    const fechaFormateada = `${año}-${mes}-${dia}`

    //obteniendo imagen de ruta fuente
    const rutaCompleta = personalData[0].Image
    const archivo = path.basename(rutaCompleta)

    //guardando data en db
    try {
        knex('rcrt_all_elements').insert([{ idnumber: personalData[1].Carne },
        { firstname: personalData[2].Nombres }, { lastname: personalData[3].Apellidos },
        { carrera: academicData[0].Carrera },{address:''}, { deleted: '0' }, 
        { comments: bookingData[5].Comentario },
        { nmaterias: academicData[2].MateriasAprobadas }, { cum: academicData[3].Cum },
        { niv_est: academicData[1].NivelEstudio }, { prim_op: bookingData[0].PrimeraOpcion },
        { experiencia: academicData[5].Experiencia }, { fecha: fechaFormateada },
        { nota: bookingData[4].Nota1aOpcion }, { es_remunerado: '0' },
        { seg_op: bookingData[1].SegundaOpcion }, { accepted: '11' }, { semester: bookingData[2].Ciclo },
        { confirmed: '0' }, { accepted_op: '1' }, { picture: archivo }, { nota_seg_op: 'null' }, { curso_aprobado: 'null' }
        ]);

        return res.status(201).json({message: "OK"})
    } catch (error) {
        return res.status(400).json({status: error},{message: "Error al intentar crear la solicitud"})
    }
}

module.exports = {
    saveRequestData
}