const Usuario = require ('./../models/usuario')
const usuarioCtrl = {}
usuarioCtrl.createUsuario = async (req, res)=>{
 //en req.body se espera que vengan los datos de usuario a crear
 const usuario = new Usuario (req.body);
 await usuario.save();
 res.json({
    'status': 'Usuario Created'
    });
   }
   usuarioCtrl.loginUsuario = async (req, res)=>{
    //en req.body se espera que vengan las credenciales de login
    //defino los criterios de busqueda en base al username y password recibidos
    const criteria = {
    username: req.body.username,
    password: req.body.password
    }
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    Usuario.findOne(criteria, function(err, user) {
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    if (err) {
        res.json({
        status: 0,
        message: 'error'})
    };
    if (!user) {
        res.json({
        status: 0,
        message: "not found" })
    } else {
        res.json({
        status: 1,
        message: "success",
        username: user.username,
        perfinl: user.perfil });
    }
    })
   }
   //exportacion del modulo controlador
   module.exports= usuarioCtrl;