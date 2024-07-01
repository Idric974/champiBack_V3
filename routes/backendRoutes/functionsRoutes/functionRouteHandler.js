const express = require('express');
const router = express.Router();
const functionsCtrl = require('../../../controllers/backendControllers/functionControllers/functionsControllerHandler');

//* GET.
router.get('/constructionAxeX', functionsCtrl.constructionAxeX);

//* POST.
router.post('/majEtatRelay', functionsCtrl.majEtatRelay);

module.exports = router;
