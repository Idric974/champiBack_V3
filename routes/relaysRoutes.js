const router = require('express').Router();
const relaysControllers = require('../controllers/relaysControllers');

//! POST

router.post('/ActivationEauAuSol', relaysControllers.ActivationEauAuSol);

//! -------------------------------------------------

module.exports = router;