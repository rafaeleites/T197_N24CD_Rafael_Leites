const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/usuarios.json');

const getUsers = (req, res) => {
  const data = JSON.parse(fs.readFileSync(usersPath));
  res.json(data);
};

const createUser = (req, res) => {
  const data = JSON.parse(fs.readFileSync(usersPath));
  const newUser = req.body;
  data.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
  res.status(201).json(newUser);
};

module.exports = { getUsers, createUser };
