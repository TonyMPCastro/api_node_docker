const express = require("express");
let connectionRequest = require('./connectionRequest')


const app = express();
const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get("/", (req, res, next) => {
  res.json(
    `Seja bem vindo ao VPS rodando Node.JS pelo Docker na porta ${port}`
  );
});



// Rota para obter a lista de produtos
app.get('/logs', (req, res) => {
  
  connection = connectionRequest()
  const query = 'SELECT * FROM logs';

  connection.query(query, (err, results) => {
    if (err) {
      connection.destroy();
      res.status(500).send('Erro: '+ err);
    } else {
      connection.destroy();
      res.status(200).json(results);
    }
  });

});
