// Importar Express
const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 3000;
const cors = require('cors')
// Inicializar la aplicación Express
const app = express();

// Middleware para analizar JSON
app.use(express.json());

//configuración de cors
app.use(cors());

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

//rutas 
const loginRoutes = require('./routes/loginRoute')

//llamada a las rutas
app.use('/auth', loginRoutes)