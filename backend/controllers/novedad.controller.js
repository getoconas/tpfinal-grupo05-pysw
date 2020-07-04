const Novedad = require('../models/novedad');

const novedadCtrl = {}

// Listado de Novedades
novedadCtrl.getNovedades = async(req, res) => {
  const novedades = await Novedad.find().populate("usuario");
  res.json(novedades);
}

// Obtener Novedad por ID
novedadCtrl.getNovedad = async(req, res) => {
  const novedades = await Novedad.findById(req.params.id).populate("usuario");
  res.json(novedades);
}

// Alta de Novedad
novedadCtrl.createNovedad = async(req, res) => {
  const novedad = new Novedad(req.body);
  await novedad.save();
  res.json({
    'status': 'Novedad Saved'
  });
}

// Modificación de Novedad
novedadCtrl.editNovedad = async(req, res) => {
  const vNovedad = new Novedad(req.body);
  await Novedad.findByIdAndUpdate(req.params.id, { $set: vNoticia }, { new: true });
  res.json({
    'status': 'Novedad Updated'
  });
}

// Baja de Novedad
novedadCtrl.deleteNovedad = async(req, res) => {
  await Novedad.findByIdAndRemove(req.params.id);
  res.json({
    'status': 'Novedad Removed'
  });
}

module.exports = novedadCtrl;