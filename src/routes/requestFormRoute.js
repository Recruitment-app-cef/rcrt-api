//importe de la librería de express para usar un enrutador
const express = require('express')
const router = express.Router();

//importe de las funciones de obtención y envío de datos para formulario
const {
    saveRequestData,
} = require('../controllers/requestController')

//rutas utilizadas para la vista de front donde se ingresan o se obtienen
//los datos del potencial instructor
router.post('/save', saveRequestData)

module.exports = router