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

const db = require('./src/db/db_connection');

//Probar la conexión a la base de datos
db.raw('SELECT 1')
    .then(() => {
        console.log("Conexión a la base exitosa");
    }).catch((error) => {
        console.error("Error al conectar a la base de datos", error);
    });

//rutas 
const loginRoutes = require('./src/routes/loginRoute')
const requestFormRoute = require('./src/routes/requestFormRoute')
const adminRoute = require('./src/routes/adminRoute')
const dataRoute = require('./src/routes/dataRoute')
//llamada a las rutas
app.use('/auth', loginRoutes)
app.use('/request', requestFormRoute)
app.use('/admin', adminRoute)
app.use('/data', dataRoute)

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
