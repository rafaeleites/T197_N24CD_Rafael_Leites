const express = require('express'); // Exemplo
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/estagiarios', require('./routes/estagiarios'));
app.use('/requisicoes', require('./routes/requisicoes'));

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
