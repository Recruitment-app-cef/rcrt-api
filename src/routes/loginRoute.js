//importe de la librería de express para usar un enrutador
const express = require('express')
const router = express.Router();

//importe de las funciones del controlador de autenticación
const {
    verifyUser,
} = require('../controllers/authController')

//rutas utilizadas para la vista de front donde se ingresa la password y el carné de usuario
router.post('/authUser', verifyUser);

module.exports = router;