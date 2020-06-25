const mongoose = require('mongoose');
const {Schema} = mongoose;

const AfiliadoSchema = new Schema({
    apellido: {type: String, required: true},
    nombres: {type: String, required: true},
    dni: {type: Number, required: true},
    email: {type: String, required: true},
    imagen: {type: String, required: true},
    telefono: {type: Number, required: true},
})

module.exports = mongoose.model('Afiliado', AfiliadoSchema);
