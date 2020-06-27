const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
// definiendo rutas
router.post('/', usuarioCtrl.createUsuario);
router.post('/login', usuarioCtrl.loginUsuario);
//exportacion del modulo de rutas
module.exports = router;