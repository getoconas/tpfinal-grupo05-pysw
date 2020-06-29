// Creamos un manejador de rutas modulares
const express = require('express');
const router = express.Router();

// Definimos el controlador para el manejo del CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');

// Definimos las rutas
router.get('/', usuarioCtrl.getUsuarios);
router.post('/', usuarioCtrl.createUsuario);
router.get('/:id', usuarioCtrl.getUsuario);
router.put('/:id', usuarioCtrl.editUsuario);
router.delete('/:id', usuarioCtrl.deleteUsuario);
router.post('/login', usuarioCtrl.loginUsuario);

// Exportamos el modulo de rutas
module.exports = router;