//importe de la librería de express para usar un enrutador
const express = require('express')
const router = express.Router();

//importe de funciones para obtener cursos y semestres
const {
    obtainCourses,
    obtainSemesters
} = require('../controllers/dataController')

//rutas utilizadas
router.get('/courses/all', obtainCourses)
router.get('/semesters/all', obtainSemesters)

module.exports = router