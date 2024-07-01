// Importar Express
const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 3000;

// Inicializar la aplicación Express
const app = express();

// Ruta principal
app.get('/prueba', (req, res) => {
    res.send('¡Hola Mundo con Node.js y Express!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

const newLocal = './db/db_connection';
//importando database para verificar conexión
const db = require(newLocal)
app.listen(db, () => {
    console.log(`conexión a base exitosa`)
})