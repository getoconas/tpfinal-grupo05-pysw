// Creamos un manejador de rutas modulares
const express = require('express');
const router = express.Router();

// Definimos el controlador para el manejo del CRUD
const servicioCtrl = require('./../controllers/servicio.controller');

// Definimos las rutas
router.get('/', servicioCtrl.getServicios);
router.post('/', servicioCtrl.createServicio);
router.put('/:id', servicioCtrl.editServicio);
router.delete('/:id', servicioCtrl.deleteServicio);

// Exportamos el modulo de rutas
module.exports = router;