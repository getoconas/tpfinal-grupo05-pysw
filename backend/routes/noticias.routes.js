// Creamos un manejador de rutas modulares
const express = require('express');
const router = express.Router();

// Definimos el controlador para el manejo del CRUD
const noticiaCtrl = require('./../controllers/noticia.controller');

// Definimos las rutas
router.get('/', noticiaCtrl.getNoticias);
router.post('/', noticiaCtrl.createNoticia);
router.get('/:id', noticiaCtrl.getNoticia);
router.put('/:id', noticiaCtrl.editNoticia);
router.delete('/:id', noticiaCtrl.deleteNoticia);

// Exportamos el modulo de rutas
module.exports = router;