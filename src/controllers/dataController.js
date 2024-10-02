//importe de las funciones utilizadas para administrar la db
const db = require('../db/db_connection');
//importe de funciones de mapeo
const map = require('../utils/mapData')

//función para obtener los cursos disponibles en base de datos

const obtainCourses = async (req, res) => {
    let courses = []

    try {

        //obteniendo los cursos
        courses = await db.select().table('rcrt_all_materias')

        if (!courses) {
            return res.status(404).json({ message: "Cursos no encontrados" })
        }

        //concatenando el curso con la actividad
        const mapedCourses = courses.map((object) => {
            const course = {
                course: `${object.materia} ${object.actividad}`
            }
            return course
        })

        //Dando formato a los cursos
        const coursesWithFormat = mapedCourses.map(obj => {
            return obj.course
        })

        if (coursesWithFormat) {
            return res.status(200).json({ data: coursesWithFormat })
        } else {
            return res.status(409).json({ message: "No se pudieron concatenar los cursos" })
        }


    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
        return res.status(404).json({ message: "Cursos no encontrados" })
    }

}

//función para obtener los semestres para renderizar las solicitudes y
//obtener y filtrar

const obtainSemesters = async (req, res) => {
    let semesters = []

    try {

        //obteniendo semestres
        semesters = await db('rcrt_all_elements')
            .select('semester')
            .count('* as count')
            .groupBy('semester')
            .orderBy('semester', 'desc')

        //mapeando para ciclo 01
        const firstCycleSemesters = map.mappingSemesters(semesters, "Ciclo 01")

        //mapeando para ciclo 02
        const secondCycleSemesters = map.mappingSemesters(semesters, "Ciclo 02")

        //mapeando para ciclo 03
        const thirdCycleSemesters = map.mappingSemesters(semesters, "Ciclo 03")

        //concatenando ciclos
        const concatSemesters = map.concatSemesters(firstCycleSemesters,
            secondCycleSemesters, thirdCycleSemesters)

        if (concatSemesters) {
            return res.status(200).json({ message: concatSemesters })
        } else {
            return res.status(404).json({ message: "semestres no encontrados" })
        }

    } catch (error) {
        console.error("Error detectado al intentar buscar las solicitudes", error)
        return res.status(404).json({ message: "Semestres no encontrados" })
    }

}

//función para obtener al administrador deseado
const getAdmin = async (req, res) => {

    //obteniendo id del administrador
    let id = req.query.id
    
    try {

        //obteniendo usuario en base al identificador
        let user = await db('usr_persons')
            .where({id:id}).returning('*')

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" })
        }

        return res.status(200).json({ data: user })

    } catch (error) {
        console.error("error, no se pudo encontrar al usuario administrador", error)
        return res.status(404).json({ message: "Usuario no encontrado" })
    }
}

module.exports = {
    obtainCourses,
    obtainSemesters,
    getAdmin
}