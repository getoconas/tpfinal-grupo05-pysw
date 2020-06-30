const Pago = require('../models/pago');

const pagoCtrl = {}

// Listado de Pagos
pagoCtrl.getPagos = async(req, res) => {
  const pagos = await Pago.find();
  res.json(pagos);
}

// Obtener Pago por ID
pagoCtrl.getPago = async(req, res) => {
  const pagos = await Pago.findById(req.params.id);
  res.json(pagos);
}

// Alta de Pago
pagoCtrl.createPago = async(req, res) => {
  const pago = new Pago(req.body);
  await pago.save();
  res.json({
    'status': 'Pago Saved'
  });
}

// Modificación de Pago
pagoCtrl.editPago = async(req, res) => {
  const vPago = new Pago(req.body);
  await Pago.findByIdAndUpdate(req.params.id, { $set: vPago }, { new: true });
  res.json({
    'status': 'Pago Updated'
  });
}

// Baja de Pago
pagoCtrl.deletePago = async(req, res) => {
  await Pago.findByIdAndRemove(req.params.id);
  res.json({
    'status': 'Pago Removed'
  });
}

module.exports = pagoCtrl;