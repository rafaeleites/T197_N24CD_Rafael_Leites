const fs = require('fs');
const path = require('path');
const pathRequisicoes = path.join(__dirname, '../data/requisicoes.json');

const getRequisicoes = (req, res) => {
  const requisicoes = JSON.parse(fs.readFileSync(pathRequisicoes));
  res.json(requisicoes);
};

const createRequisicao = (req, res) => {
  const requisicoes = JSON.parse(fs.readFileSync(pathRequisicoes));
  const nova = req.body;
  requisicoes.push(nova);
  fs.writeFileSync(pathRequisicoes, JSON.stringify(requisicoes, null, 2));
  res.status(201).json(nova);
};

module.exports = { getRequisicoes, createRequisicao };
