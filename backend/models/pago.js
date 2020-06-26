const mongoose = require('mongoose');
const {Schema} = mongoose;

const PagoSchema = new Schema({
    _id: {type: String, required: true},
    afiliado: {type: Schema.Types.ObjectId, ref: Afiliado},
    fecha: {type: Date, required: true},
    monto: {type: Number, required: true},
    año: {type: Number, required: true},
    mes: {type: String, required: true},
   
})

module.exports = mongoose.model('Pago', PagoSchema);