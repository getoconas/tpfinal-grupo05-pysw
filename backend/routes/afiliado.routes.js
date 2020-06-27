// Creamos un manejador de rutas modulares
const express = require('express');
const router = express.Router();

// Definimos el controlador para el manejo del CRUD
const afiliadoCtrl = require('./../controllers/afiliado.controller');

// Definimos las rutas
router.get('/', afiliadoCtrl.getAfiliados);
router.post('/', afiliadoCtrl.createAfiliado);
router.get('/:id', afiliadoCtrl.getAfiliado);
router.put('/:id', afiliadoCtrl.editAfiliado);
router.delete('/:id', afiliadoCtrl.deleteAfiliado);

// Exportamos el modulo de rutas
module.exports = router;