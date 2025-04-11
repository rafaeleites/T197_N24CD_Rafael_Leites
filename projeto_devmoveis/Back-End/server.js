const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuarios', require('./routes/usuarios'));
app.use('/estagiarios', require('./routes/estagiarios'));
app.use('/requisicoes', require('./routes/requisicoes'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
