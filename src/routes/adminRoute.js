//importe de la librería de express para usar un enrutador
const express = require('express')
const router = express.Router();

//importe de las funciones para obtener y filtrar las solicitudes
const {
    getRequests,
    getRequestsByBooking
} = require('../controllers/adminController')

//rutas utilizadas 
router.get('/all',getRequests)
router.get('/all/booking',getRequestsByBooking)

module.exports = router