// Importar librerías necesarias
const express = require('express'); // Framework para crear el servidor y manejar rutas
const connection = require('./db'); // Importa el archivo de conexión a la base de datos PostgreSQL (configurado previamente)

// Inicializar app de Express
const app = express(); // Crea una instancia de la aplicación Express

// Middlewares
app.use(express.json()); // Permite recibir datos en formato JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios codificados en la URL

// Puerto
const PORT = 3000; // Define el puerto en el que se ejecutará el servidor

// -------------------- RUTAS GENERALES --------------------

app.get('/api/prueba', (req, res) => {
    // Ruta de prueba simple, responde con texto plano
    res.send('Estoy respondiendo por la API');
});

app.get('/api/prueba2', (req, res) => {
    // Otra ruta de prueba que responde con un JSON y detalles del estado
    res.status(200).json({
        message: 'API funciona bien',
        port: PORT,
        status: 'exitoso'
    });
});

// -------------------- CRUD RESTAURANTE --------------------

// Crear restaurante
app.post('/api/restaurante/guardar', (req, res) => {
    
    const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
    
    const query = 'INSERT INTO persona (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5)';

    
    connection.query(query, [id_rest, nombre, ciudad, direccion, fecha_apertura], (error, result) => {
        if (error) {
            
            res.status(500).json({
                message: 'ERROR CREANDO LA PERSONA',
                error: error.message
            });
        } else {
            
            res.status(201).json({ id_rest, nombre, ciudad, direccion, fecha_apertura });
        }
    });
});

// Obtener restaurantes
app.get('/api/restaurante/obtener', (req, res) => {

    const query = 'SELECT * FROM persona';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al recuperar personas', error: error.message });
        } else {

            res.status(200).json({ personas: result.rows });
        }
    });
});

// Eliminar restaurante
app.delete('/api/restaurante/eliminar/:id', (req, res) => {
    
    const { id } = req.params;
    const query = 'DELETE FROM persona WHERE id = $1';

    connection.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al eliminar restaurante', error: error.message });
        } else if (result.rowCount === 0) {

            res.status(404).json({ message: `No se encontró la restaurante con ID ${id}` });
        } else {
            res.status(200).json({ message: 'restaurante eliminado correctamente' });
        }
    });
});

// Actualizar Restaurante
app.put('/api/restaurante/actualizar/:id', (req, res) => {
    const { id } = req.params; 
    const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body; 


    const query = `
        UPDATE persona
        SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4
        WHERE id = $5
    `;

    connection.query(query, [id_rest, nombre, ciudad, direccion, fecha_apertura], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al actualizar restaurante', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró la restaurante con ID ${id}` });
        } else {
            res.status(200).json({ message: 'restaurante actualizada correctamente' });
        }
    });
});
