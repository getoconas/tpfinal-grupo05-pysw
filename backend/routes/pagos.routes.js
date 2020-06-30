// Creamos un manejador de rutas modulares
const express = require('express');
const router = express.Router();

// Definimos el controlador para el manejo del CRUD
const pagoCtrl = require('./../controllers/pago.controller');

// Definimos las rutas
router.get('/', pagoCtrl.getPagos);
router.post('/', pagoCtrl.createPago);
router.get('/:id', pagoCtrl.getPago);
router.put('/:id', pagoCtrl.editPago);
router.delete('/:id', pagoCtrl.deletePago);

// Exportamos el modulo de rutas
module.exports = router;