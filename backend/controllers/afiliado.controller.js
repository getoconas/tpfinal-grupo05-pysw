const Afiliado = require('../models/afiliado');

const afiliadoCtrl = {}

// Listado de Afiliados
afiliadoCtrl.getAfiliados = async(req, res) => {
  const afiliados = await Afiliado.find();
  res.json(afiliados);
}

// Obtener Afiliado por ID
afiliadoCtrl.getAfiliado = async(req, res) => {
  const afiliado = await Afiliado.findById(req.params.id);
  res.json(afiliado);
}

// Alta de Afiliado
afiliadoCtrl.createAfiliado = async(req, res) => {
  const afiliado = new Afiliado(req.body);
  await afiliado.save();
  res.json({
    'status': 'Afiliado Saved'
  });
}

// Modificación de Afiliado
afiliadoCtrl.editAfiliado = async(req, res) => {
  const vAfiliado = new Afiliado(req.body);
  await Afiliado.findByIdAndUpdate(req.params.id, { $set: vAfiliado }, { new: true });
  res.json({
    'status': 'Afiliado Updated'
  });
}

// Baja de Afiliado
afiliadoCtrl.deleteAfiliado = async(req, res) => {
  await Afiliado.findByIdAndRemove(req.params.id);
  res.json({
    'status': 'Afiliado Removed'
  });
}

module.exports = afiliadoCtrl;