const Sequelize = require('sequelize');
const db = require('../models');
const gestionAirsDataModels = db.gestionAirData;
const gestionAirModels = db.gestionAir;

//* ➖ ➖ ➖ ➖ ➖ ➖ Clic sur le bouton activation eau au sol ➖ ➖ ➖ ➖ ➖ ➖ //

exports.ActivationEauAuSol = (req, res) => {
    console.log('test requete');

    res.status(200).json({ message: "Requete OK" });

};