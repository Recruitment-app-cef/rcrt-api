//importe de las funciones utilizadas para administrar la db
const db = require('../db/db_connection');
//módulo para obtener los archivos fuente de una ruta 
const path = require('path')

const map = require('../utils/mapData');

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
    if (mappedData[2].contratacion == "remunerado" || mappedData[2].contratacion == "Remunerado") {
        es_remunerado = '1'
    } else {
        es_remunerado = '0'
    }

    //determinando si la persona colocó algún comentario extra
    var comentario = ''
    if (mappedData[2].comentario != '') {
        comentario = mappedData[2].comentario
    } else {
        comentario = 'sin comentarios'
    }

    //determinando el nivel académico de la persona
    var nivestudio = 0
    switch (mappedData[1].nivelestudio) {
        case 'Primer Ciclo': nivestudio = 1
        case 'Segundo Ciclo': nivestudio = 2
        case 'Tercer Ciclo': nivestudio = 3
        case 'Cuarto Ciclo': nivestudio = 4
        case 'Quinto Ciclo': nivestudio = 5
        case 'Sexto Ciclo': nivestudio = 6
        case 'Séptimo Ciclo': nivestudio = 7
        case 'Octavo Ciclo': nivestudio = 8
        case 'Noveno Ciclo': nivestudio = 9
        case 'Décimo Ciclo': nivestudio = 10
    }

    //guardando data en db
    try {
        //verificando que el usuario ya está registrado en la DB
        const verificandoQueExisteEnLaDB = await db('rcrt_all_elements')
            .where('idnumber', mappedData[0].carne)

        if (verificandoQueExisteEnLaDB.length == 0) {
            const response = await db('rcrt_all_elements').returning('id').insert([
                {
                    idnumber: mappedData[0].carne,
                    firstname: mappedData[0].nombres,
                    lastname: mappedData[0].apellidos,
                    carrera: mappedData[1].carrera,
                    address: 'none',
                    deleted: 0,
                    comments: comentario,
                    nmaterias: mappedData[1].materiasaprobadas,
                    cum: mappedData[1].cum,
                    niv_est: nivestudio,
                    prim_op: mappedData[2].primeraopcion,
                    experiencia: mappedData[1].experiencia,
                    fecha: fechaFormateada,
                    nota: mappedData[2].nota1aopcion,
                    es_remunerado: es_remunerado,
                    seg_op: mappedData[2].segundaopcion,
                    accepted: 0,
                    semester: mappedData[2].ciclo,
                    confirmed: 0,
                    accepted_op: 0,
                    picture: archivo,
                    nota_seg_op: 0,
                    curso_aprobado: 0
                }
            ]).returning("*");

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
            var dataToQuery = []
            if (!Array.isArray(emailData)) {
                dataToQuery = [emailData, ...signaturesData, ...addingData]
            } else if (!Array.isArray(emailData) && !Array.isArray(signaturesData)) {
                dataToQuery = [emailData, signaturesData, ...addingData]
            } else if (!Array.isArray(signaturesData)) {
                dataToQuery = [...emailData, signaturesData, ...addingData]
            } else {
                dataToQuery = [...emailData, ...signaturesData, ...addingData]
            }

            //guardando datos de usuario en tabla de rcrt_elements_data
            const saveData = await db("rcrt_elements_data").returning('id')
                .insert(dataToQuery).returning('*')
            /*             console.log(response) */

            console.log(saveData, response)

            if (response && saveData) {
                return res.status(201).json({ message: `OK` })
            }
        } else {
            return res.status(400).json({ message: "Ya existe un registro en la DB" })
        }

    } catch (error) {
        console.log('Error al guardar la request', error)
        return res.status(400).json({ message: "Error al intentar crear la solicitud" })
    }
}

const getRequestData = async (req, res) => {

    try {//obteniendo id del usuario de la request enviada
        const { id, cycle } = req.query

        //variable para mapear la data adicional obtenida por el usuario
        let userMappedData

        //buscando en la DB y obteniendo la data
        let userData = await db('rcrt_all_elements')
            .where({
                idnumber: id,
                semester: cycle
            })

        //si no hay data del ciclo actual se busca en base al ciclo anterio
        //al ciclo y año actual
        if (userData.length == 0) {

            //se desmiembra el valor que viene en semestre o cycle
            let [letras, numero, anio] = cycle.split(' ')
            const year = parseInt(anio)

            //en base al ciclo se hace la búsqueda
            switch (numero) {

                case '01': {

                    userData = await db('rcrt_all_elements')
                        .where({
                            idnumber: id,
                            semester: `${letras} 03 ${year - 1}`
                        })

                    userMappedData = await db('rcrt_elements_data')
                        .where('element_id', userData[0].id)

                    break
                }
                case '02': {
                    userData = await db('rcrt_all_elements')
                        .where({
                            idnumber: id,
                            semester: `${letras} 01 ${year}`
                        })

                    console.log(userData)

                    userMappedData = await db('rcrt_elements_data')
                        .where('element_id', userData[0].id)

                    console.log(userMappedData)
                    break
                }
                case '03': {
                    userData = await db('rcrt_all_elements')
                        .where({
                            idnumber: id,
                            semester: `${letras} 02 ${year}`
                        })

                    userMappedData = await db('rcrt_elements_data')
                        .where('element_id', userData[0].id)

                    break
                }
            }

        }

        //se mapea la data adicional
        userMappedData = await db('rcrt_elements_data')
            .where('element_id', userData[0].id)

        //se envia la respuesta
        if (userData.length && userMappedData) {
            res.status(200).json({ "data": [...userData, ...userMappedData] })
        } else {
            res.status(404).json({ message: "Usuario no encontrado" })
        }

    } catch (error) {
        res.status(400).json({ message: "error de autenticación" })
    }

}

const updateRequestData = async (req, res) => {
    try {
        const userData = req.body.data;

        //separando la data obtenida
        const personalData = userData[0].value
        const academicData = userData[1].value
        const bookingData = userData[2].value

        //mapeando la data
        const mappedData = map.mapData(personalData, academicData, bookingData)

        //buscando usuario en base de datos para borrar el registro y colocar el nuevo
        const findUser = await db('rcrt_all_elements')
            .where('idnumber', mappedData[0].carne)

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
        if (mappedData[2].contratacion == "remunerado" || mappedData[2].contratacion == "Remunerado") {
            es_remunerado = '1'
        } else {
            es_remunerado = '0'
        }

        //determinando si la persona colocó algún comentario extra
        var comentario = ''
        if (mappedData[2].comentario != '') {
            comentario = mappedData[2].comentario
        } else {
            comentario = 'sin comentarios'
        }

        //determinando el nivel académico de la persona
        var nivestudio = 0
        switch (mappedData[1].nivelestudio) {
            case 'Primer Ciclo': {
                nivestudio = 1
                break
            }
            case 'Segundo Ciclo': {
                nivestudio = 2
                break
            };
            case 'Tercer Ciclo': {
                nivestudio = 3
                break
            }
            case 'Cuarto Ciclo': {
                nivestudio = 4
                break
            }
            case 'Quinto Ciclo': {
                nivestudio = 5
                break
            }
            case 'Sexto Ciclo': {
                nivestudio = 6
                break
            }
            case 'Séptimo Ciclo': {
                nivestudio = 7
                break
            }
            case 'Octavo Ciclo': {
                nivestudio = 8
                break
            }
            case 'Noveno Ciclo': {
                nivestudio = 9
                break
            }
            case 'Décimo Ciclo': {
                nivestudio = 10
                break
            }
        }

        let result

        if (findUser.length > 0) {

            result = await db('rcrt_all_elements')
                .where('idnumber', mappedData[0].carne)
                .update({
                    idnumber: mappedData[0].carne,
                    firstname: mappedData[0].nombres,
                    lastname: mappedData[0].apellidos,
                    carrera: mappedData[1].carrera,
                    address: 'none',
                    deleted: 0,
                    comments: comentario,
                    nmaterias: mappedData[1].materiasaprobadas,
                    cum: mappedData[1].cum,
                    niv_est: nivestudio,
                    prim_op: mappedData[2].primeraopcion,
                    experiencia: mappedData[1].experiencia,
                    fecha: fechaFormateada,
                    nota: mappedData[2].nota1aopcion,
                    es_remunerado: es_remunerado,
                    seg_op: mappedData[2].segundaopcion,
                    accepted: 0,
                    semester: mappedData[2].ciclo,
                    confirmed: 0,
                    accepted_op: 0,
                    picture: archivo,
                    nota_seg_op: 0,
                    curso_aprobado: 0
                }).returning('*')
        }

        //mapeando emails
        const emailData = map.mappingEmails(mappedData[0].emails, result[0].id)
        console.log(result)
        //mapeando materias
        const signaturesData = map.mappingSignatures(mappedData[1].materiasproximas, result[0].id)
        //mapeando telefonos y opciones a colaborar
        const addingData = map.mappingContactsAndSignatures(
            mappedData[0].telefonofijo,
            mappedData[0].telefonomovil,
            mappedData[2].primeraopcion,
            mappedData[2].segundaopcion,
            result[0].id
        )

        //creando arreglo final para query
        var dataToQuery = []
        if (!Array.isArray(emailData)) {
            dataToQuery = [emailData, ...signaturesData, ...addingData]
        } else if (!Array.isArray(emailData) && !Array.isArray(signaturesData)) {
            dataToQuery = [emailData, signaturesData, ...addingData]
        } else if (!Array.isArray(signaturesData)) {
            dataToQuery = [...emailData, signaturesData, ...addingData]
        } else {
            dataToQuery = [...emailData, ...signaturesData, ...addingData]
        }
        
        //determinando si el usuario tiene data adicional en la base de datos
        const userAssociateData = await db('rcrt_elements_data').where('element_id', result[0].id);

        //si no posee data adicional se guarda la que ha sido mapeada
        if (userAssociateData.length == 0) {

            saveData = await db("rcrt_elements_data").insert(dataToQuery);

            //sino se borra la anterior y se guarda la actualizada
        }else{
            await db('rcrt_elements_data').where('element_id', result[0].id).del();

            saveData = await db("rcrt_elements_data").insert(dataToQuery).returning('*');

        }

        if (result) {
            return res.status(200).json({ message: [result, saveData] })
        }

    } catch (error) {
        return res.status(400).json({ message: "error de actualización", messageError: error })
    }
}

module.exports = {
    saveRequestData,
    getRequestData,
    updateRequestData
}