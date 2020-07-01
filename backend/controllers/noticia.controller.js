const Noticia = require('../models/noticia');

const noticiaCtrl = {}

// Listado de Noticias
noticiaCtrl.getNoticias = async(req, res) => {
  const noticias = await Noticia.find().populate("usuario");
  res.json(noticias);
}

// Obtener Noticia por ID
noticiaCtrl.getNoticia = async(req, res) => {
  const noticias = await Noticia.findById(req.params.id).populate("usuario");
  res.json(noticias);
}

// Alta de Noticia
noticiaCtrl.createNoticia = async(req, res) => {
  const noticia = new Noticia(req.body);
  await noticia.save();
  res.json({
    'status': 'Noticia Saved'
  });
}

// Modificación de Noticia
noticiaCtrl.editNoticia = async(req, res) => {
  const vNoticia = new Noticia(req.body);
  await Noticia.findByIdAndUpdate(req.params.id, { $set: vNoticia }, { new: true });
  res.json({
    'status': 'Noticia Updated'
  });
}

// Baja de Noticia
noticiaCtrl.deleteNoticia = async(req, res) => {
  await Noticia.findByIdAndRemove(req.params.id);
  res.json({
    'status': 'Noticia Removed'
  });
}

module.exports = noticiaCtrl;