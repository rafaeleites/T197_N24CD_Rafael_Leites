const fs = require('fs');
const path = require('path');
const pathEstagiarios = path.join(__dirname, '../data/estagiarios.json');

const getEstagiarios = (req, res) => {
  const estagiarios = JSON.parse(fs.readFileSync(pathEstagiarios));
  res.json(estagiarios);
};

module.exports = { getEstagiarios };
