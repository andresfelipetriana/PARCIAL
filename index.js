const express = require('express');
const connection = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// -------------------- CRUD RESTAURANTE --------------------

// 1. Obtener restaurantes (GET)
app.get('/api/restaurante/obtener', (req, res) => {
    const query = 'SELECT * FROM restaurante';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al recuperar restaurantes', error: error.message });
        } else {
            res.status(200).json({ restaurantes: result.rows });
        }
    });
});

// 2. Crear restaurante (POST)
app.post('/api/restaurante/guardar', (req, res) => {
    const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;

    const query = 'INSERT INTO restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5)';

    connection.query(query, [id_rest, nombre, ciudad, direccion, fecha_apertura], (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'Error creando el restaurante',
                error: error.message
            });
        } else {
            res.status(201).json({ id_rest, nombre, ciudad, direccion, fecha_apertura });
        }
    });
});

// 3. Actualizar restaurante (PUT)
app.put('/api/restaurante/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;

    const query = `
        UPDATE restaurante
        SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4
        WHERE id_rest = $5
    `;

    connection.query(query, [nombre, ciudad, direccion, fecha_apertura, id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al actualizar restaurante', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el restaurante con ID ${id}` });
        } else {
            res.status(200).json({ message: 'Restaurante actualizado correctamente' });
        }
    });
});

// 4. Eliminar restaurante (DELETE)
app.delete('/api/restaurante/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM restaurante WHERE id_rest = $1';

    connection.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al eliminar restaurante', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el restaurante con ID ${id}` });
        } else {
            res.status(200).json({ message: 'Restaurante eliminado correctamente' });
        }
    });
});

// -------------------- CRUD EMPLEADO --------------------


// 1. Obtener empleado (GET)
app.get('/api/empleado/obtener', (req, res) => {
    const query = 'SELECT * FROM empleado';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al recuperar restaurantes', error: error.message });
        } else {
            res.status(200).json({ restaurantes: result.rows });
        }
    });
});

// 2. Crear restaurante (POST)
app.post('/api/empleado/guardar', (req, res) => {
    const { id_empleado, nombre, rol, id_rest } = req.body;

    const query = 'INSERT INTO empleado (id_empleado, nombre, rol, id_rest) VALUES ($1, $2, $3, $4 )';

    connection.query(query, [id_empleado, nombre, rol, id_rest], (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'Error creando el empleado',
                error: error.message
            });
        } else {
            res.status(201).json({ id_empleado, nombre, rol, id_rest });
        }
    });
});

// 3. Actualizar restaurante (PUT)
app.put('/api/empleado/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, rol, id_rest } = req.body;

    const query = `
        UPDATE empleado
        SET nombre = $1, rol = $2, id_rest = $3
        WHERE id_empleado = $4
    `;

    connection.query(query, [nombre, rol, id_rest, id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al actualizar empleado', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el empleado con ID ${id}` });
        } else {
            res.status(200).json({ message: 'Empleado actualizado correctamente' });
        }
    });
});


// 4. Eliminar restaurante (DELETE)
app.delete('/api/empleado/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM empleado WHERE id_empleado = $1';

    connection.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al eliminar empleado', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el empleado con ID ${id}` });
        } else {
            res.status(200).json({ message: 'empleado eliminado correctamente' });
        }
    });
});

// -------------------- CRUD PRODUCTO --------------------

// ==================== PRODUCTO ====================

// 1. Obtener productos (GET)
app.get('/api/producto/obtener', (req, res) => {
    const query = 'SELECT * FROM producto';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al recuperar productos', error: error.message });
        } else {
            res.status(200).json({ productos: result.rows });
        }
    });
});

// 2. Crear producto (POST)
app.post('/api/producto/guardar', (req, res) => {
    const { id_prod, nombre, precio } = req.body;

    const query = 'INSERT INTO producto (id_prod, nombre, precio) VALUES ($1, $2, $3)';

    connection.query(query, [id_prod, nombre, precio], (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'Error creando el producto',
                error: error.message
            });
        } else {
            res.status(201).json({ id_prod, nombre, precio });
        }
    });
});

// 3. Actualizar producto (PUT)
app.put('/api/producto/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    const query = `
        UPDATE producto
        SET nombre = $1, precio = $2
        WHERE id_prod = $3
    `;

    connection.query(query, [nombre, precio, id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el producto con ID ${id}` });
        } else {
            res.status(200).json({ message: 'Producto actualizado correctamente' });
        }
    });
});

// 4. Eliminar producto (DELETE)
app.delete('/api/producto/eliminar/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM producto WHERE id_prod = $1';

    connection.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el producto con ID ${id}` });
        } else {
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        }
    });
});

// ==================== CRUD PEDIDO ====================

// 1. Obtener pedidos (GET)
app.get('/api/pedido/obtener', (req, res) => {
    const query = 'SELECT * FROM pedido';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al recuperar pedidos', error: error.message });
        } else {
            res.status(200).json({ pedidos: result.rows });
        }
    });
});

// 2. Crear pedido (POST)
app.post('/api/pedido/guardar', (req, res) => {
    const { id_pedido, fecha, id_rest, total } = req.body;

    const query = 'INSERT INTO pedido (id_pedido, fecha, id_rest, total) VALUES ($1, $2, $3, $4)';

    connection.query(query, [id_pedido, fecha, id_rest, total], (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'Error creando el pedido',
                error: error.message
            });
        } else {
            res.status(201).json({ id_pedido, fecha, id_rest, total });
        }
    });
});

// 3. Actualizar pedido (PUT)
app.put('/api/pedido/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { fecha, id_rest, total } = req.body;

    const query = `
        UPDATE pedido
        SET fecha = $1, id_rest = $2, total = $3
        WHERE id_pedido = $4
    `;

    connection.query(query, [fecha, id_rest, total, id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al actualizar pedido', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el pedido con ID ${id}` });
        } else {
            res.status(200).json({ message: 'Pedido actualizado correctamente' });
        }
    });
});

// 4. Eliminar pedido (DELETE)
app.delete('/api/pedido/eliminar/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM pedido WHERE id_pedido = $1';

    connection.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al eliminar pedido', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el pedido con ID ${id}` });
        } else {
            res.status(200).json({ message: 'Pedido eliminado correctamente' });
        }
    });
});

// ==================== DETALLE_PEDIDO ====================

// 1. Obtener detalles de pedido (GET)
app.get('/api/detalle_pedido/obtener', (req, res) => {
    const query = 'SELECT * FROM detalle_pedido';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al recuperar los detalles de pedido', error: error.message });
        } else {
            res.status(200).json({ detalles: result.rows });
        }
    });
});

// 2. Crear detalle de pedido (POST)
app.post('/api/detalle_pedido/guardar', (req, res) => {
    const { id_detalle, id_pedido, id_prod, cantidad, subtotal } = req.body;

    const query = `
        INSERT INTO detalle_pedido (id_detalle, id_pedido, id_prod, cantidad, subtotal)
        VALUES ($1, $2, $3, $4, $5)
    `;

    connection.query(query, [id_detalle, id_pedido, id_prod, cantidad, subtotal], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error creando el detalle de pedido', error: error.message });
        } else {
            res.status(201).json({ id_detalle, id_pedido, id_prod, cantidad, subtotal });
        }
    });
});

// 3. Actualizar detalle de pedido (PUT)
app.put('/api/detalle_pedido/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;

    const query = `
        UPDATE detalle_pedido
        SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4
        WHERE id_detalle = $5
    `;

    connection.query(query, [id_pedido, id_prod, cantidad, subtotal, id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al actualizar detalle de pedido', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el detalle con ID ${id}` });
        } else {
            res.status(200).json({ message: 'Detalle de pedido actualizado correctamente' });
        }
    });
});

// 4. Eliminar detalle de pedido (DELETE)
app.delete('/api/detalle_pedido/eliminar/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM detalle_pedido WHERE id_detalle = $1';

    connection.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al eliminar el detalle de pedido', error: error.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: `No se encontró el detalle con ID ${id}` });
        } else {
            res.status(200).json({ message: 'Detalle de pedido eliminado correctamente' });
        }
    });
});

// ==================== CONSULTAS NATIVAS ====================

//Obtener todos los productos de un pedido específico
app.get('/api/pedido/:id/productos', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT p.id_prod, p.nombre, p.precio, dp.cantidad, dp.subtotal
        FROM detalle_pedido dp
        JOIN producto p ON dp.id_prod = p.id_prod
        WHERE dp.id_pedido = $1
    `;

    connection.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al obtener productos del pedido', error: error.message });
        } else {
            res.status(200).json({ productos: result.rows });
        }
    });
});
//Obtener los productos más vendidos (más de X unidades)
app.get('/api/productos/mas-vendidos/:cantidad', (req, res) => {
    const { cantidad } = req.params;
    const query = `
        SELECT p.id_prod, p.nombre, SUM(dp.cantidad) AS total_vendido
        FROM detalle_pedido dp
        JOIN producto p ON dp.id_prod = p.id_prod
        GROUP BY p.id_prod, p.nombre
        HAVING SUM(dp.cantidad) > $1
        ORDER BY total_vendido DESC
    `;

    connection.query(query, [cantidad], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al obtener productos más vendidos', error: error.message });
        } else {
            res.status(200).json({ productos: result.rows });
        }
    });
});
//Obtener el total de ventas por restaurante
app.get('/api/ventas/por-restaurante', (req, res) => {
    const query = `
        SELECT r.id_rest, r.nombre AS restaurante, SUM(p.total) AS total_ventas
        FROM pedido p
        JOIN restaurante r ON p.id_rest = r.id_rest
        GROUP BY r.id_rest, r.nombre
        ORDER BY total_ventas DESC
    `;

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al obtener total de ventas', error: error.message });
        } else {
            res.status(200).json({ ventas: result.rows });
        }
    });
});
//Obtener los pedidos realizados en una fecha específica
app.get('/api/pedidos/fecha/:fecha', (req, res) => {
    const { fecha } = req.params;
    const query = `
        SELECT * FROM pedido WHERE fecha = $1
    `;

    connection.query(query, [fecha], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al obtener pedidos por fecha', error: error.message });
        } else {
            res.status(200).json({ pedidos: result.rows });
        }
    });
});
//Obtener los empleados por rol en un restaurante
app.get('/api/empleados/por-rol/:id_rest/:rol', (req, res) => {
    const { id_rest, rol } = req.params;
    const query = `
        SELECT * FROM empleado
        WHERE id_rest = $1 AND rol = $2
    `;

    connection.query(query, [id_rest, rol], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error al obtener empleados por rol', error: error.message });
        } else {
            res.status(200).json({ empleados: result.rows });
        }
    });
});




// Escuchar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
