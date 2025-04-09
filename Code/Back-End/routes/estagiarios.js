const express = require('express'); //Exemplo
const fs = require('fs');
const router = express.Router();

const filePath = './data/estagiarios.json';

// Listar
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

// Adicionar
router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const novo = req.body;
  data.push(novo);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(201).send('Estagiário adicionado');
});

module.exports = router;
