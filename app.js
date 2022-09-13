
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//! Gestion des routes.

const relaysRoutes = require('./routes/relaysRoutes');

//! -------------------------------------------------

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//! --------------------------------------------------

//! Liste des routes.

app.use('/api/relays', relaysRoutes);

//! --------------------------------------------------

module.exports = app;