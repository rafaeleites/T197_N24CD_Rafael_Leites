const express = require('express');
const router = express.Router();
const { getEstagiarios } = require('../controllers/estagiariosController');

router.get('/', getEstagiarios);

module.exports = router;
