//importe de la librería de express para usar un enrutador
const express = require('express')
const router = express.Router();

//importe de las funciones para obtener y filtrar las solicitudes
const {
    getRequests,
    acceptRequest
} = require('../controllers/adminController')

//rutas utilizadas 
router.get('/all',getRequests)
router.post('/aproved', acceptRequest)

module.exports = router