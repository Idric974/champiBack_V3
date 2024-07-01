const express = require('express');
const app = express();
const bodyParser = require('body-parser');



//! Utilisation de cors pour les connexions

const cors = require('cors');
app.use(cors());

//! --------------------------------------------------

//! Header pour les Cross Origine

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//! --------------------------------------------------

//! Module de connexion à la base de données.
const db = require('./models');
db.sequelize.sync({
  force: false,
});

//! --------------------------------------------------

//! Utilisation de body parser

app.use(bodyParser.json());

//! --------------------------------------------------

//! Génération des pages html.

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/pageRelay.html', (req, res) => {
  res.sendFile(__dirname + '/pageRelay.html');
});

app.get('/pageCourbes.html', (req, res) => {
  res.sendFile(__dirname + '/pageCourbes.html');
});

app.get('/pageCourbes1.html', (req, res) => {
  res.sendFile(__dirname + '/pageCourbes1.html');
});

//! --------------------------------------------------

//! Les images.

app.use('/images', express.static('/home/pi/Desktop/champiBack_V3/images'));
//! --------------------------------------------------

//! Le CSS.

app.use('/styles', express.static('/home/pi/Desktop/champiBack_V3/styles'));
//! --------------------------------------------------

//! Le Javascript.

app.use('/', express.static('/home/pi/Desktop/champiBack_V3/'));
//! --------------------------------------------------

//! Liste des routes.

const gestionAirRoutes = require('./routes/gestionAirRoutes');
app.use('/api/gestionAirRoutes', gestionAirRoutes);

const gestionHumidite = require('./routes/gestionHumiditeRoutes');
app.use('/api/gestionHumiditeRoutes', gestionHumidite);

const gestionCo2 = require('./routes/gestionCo2Routes');
app.use('/api/gestionCo2Routes', gestionCo2);

const gestionCourbe = require('./routes/gestionCourbeRoutes');
app.use('/api/gestionCourbeRoutes', gestionCourbe);

const substratRoutes = require('./routes/gestionSubstratRoutes');
app.use('/api/gestionSubstratRoutes', substratRoutes);

const gestionLogs = require('./routes/logsBackRoutes');
app.use('/api/logsBackRoutes', gestionLogs);

const relayRoutes = require('./routes/relayRoutes');
app.use('/api/relayRoutes', relayRoutes);

const brocheRoutes = require('./routes/broche');
app.use('/api/broche', brocheRoutes);

const orderSmsRoutes = require('./routes/gestionSmsOrders');
app.use('/api/postSmsOrderRoute', orderSmsRoutes);

const functionsRoutes = require('./routes/backendRoutes/functionsRoutes/functionRouteHandler');
app.use('/api/functionsRoutes', functionsRoutes);

//! --------------------------------------------------

module.exports = app;
