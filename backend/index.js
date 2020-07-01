var express = require('express');
var app = express();

const { mongoose } = require('./database');
const cors = require('cors');

// Middlewares
app.use(express.json({limit: '50mb'}));
app.use(cors({
  origin: 'http://localhost:4200'
}))

// Cargamos el modulo de direccionamiento de rutas
app.use('/api/afiliados', require('./routes/afiliado.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/servicios', require('./routes/servicio.routes'));
app.use('/api/pagos', require('./routes/pagos.routes'));
app.use('/api/noticias', require('./routes/noticias.routes'));


// Setting
app.set('port', process.env.PORT || 3000);

// Staring the server
app.listen(app.get('port'), () => {
  console.log('Server started on port', app.get('port'));
});