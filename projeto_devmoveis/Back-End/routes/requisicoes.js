const express = require('express');
const router = express.Router();
const { getRequisicoes, createRequisicao } = require('../controllers/requisicoesController');

router.get('/', getRequisicoes);
router.post('/', createRequisicao);

module.exports = router;
