const mongoose = require('mongoose');
const Afiliado = require('./afiliado');
const {Schema} = mongoose;

const PagoSchema = new Schema({
    afiliado: {type: Schema.Types.ObjectId, ref: Afiliado},
    fecha: {type: Date, required: true},
    monto: {type: Number, required: true},
    anio: {type: Number, required: true},
    mes: {type: String, required: true},
})

module.exports = mongoose.model('Pago', PagoSchema);