const Servicio = require('../models/servicio');

const servicioCtrl = {}

// Listado de Servicios
servicioCtrl.getServicios = async(req, res) => {
  const servicios = await Servicio.find().populate("afiliadosInsc");
  res.json(servicios);
}

// Obtener Servicio por ID
servicioCtrl.getServicio = async(req, res) => {
  const servicio = await Servicio.findById(req.params.id);
  res.json(servicio);
}

// Alta de Servicio
servicioCtrl.createServicio = async(req, res) => {
  const servicio = new Servicio(req.body);
  await servicio.save();
  res.json({
    'status': 'Servicio Saved'
  });
}

// Modificación de Servicio
servicioCtrl.editServicio = async(req, res) => {
  const vServicio = new Servicio(req.body);
  await Servicio.findByIdAndUpdate(req.params.id, { $set: vServicio }, { new: true });
  res.json({
    'status': 'Servicio Updated'
  });
}

// Baja de Servicio
servicioCtrl.deleteServicio = async(req, res) => {
  await Servicio.findByIdAndRemove(req.params.id);
  res.json({
    'status': 'Servicio Removed'
  });
}

module.exports = servicioCtrl;