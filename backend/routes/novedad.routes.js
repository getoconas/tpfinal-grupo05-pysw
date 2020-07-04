// Creamos un manejador de rutas modulares
const express = require('express');
const router = express.Router();

// Definimos el controlador para el manejo del CRUD
const novedadCtrl = require('./../controllers/novedad.controller');

// Definimos las rutas
router.get('/', novedadCtrl.getNovedades);
router.post('/', novedadCtrl.createNovedad);
router.get('/:id', novedadCtrl.getNovedad);
router.put('/:id', novedadCtrl.editNovedad);
router.delete('/:id', novedadCtrl.deleteNovedad);

// Exportamos el modulo de rutas
module.exports = router;