//importe de la librería de express para usar un enrutador
const express = require('express')
const router = express.Router();

//importe de funciones para obtener cursos y semestres
const {
    obtainCourses,
    obtainSemesters,
    getAdmin
} = require('../controllers/dataController')

//rutas utilizadas
router.get('/courses/all', obtainCourses)
router.get('/semesters/all', obtainSemesters)
router.get('/user', getAdmin)

module.exports = router