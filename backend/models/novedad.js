const mongoose = require('mongoose');
const Usuario = require('./usuario');
const {Schema} = mongoose;

const NoticiaSchema = new Schema({
    usuario: {type: Schema.Types.ObjectId, ref: Usuario},
    texto: {type: String, required: true},        
    estado: {type: Boolean, required: true},    
})

module.exports = mongoose.model('Novedad', NovedadSchema);
