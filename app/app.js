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

app.post('/set_log', (req, res) => {
  
  //const {  id, data, server, dados } = req.body;

  //curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "data": "2023-10-26", "server": "meu-server", "dados": {"campo1": "valor1", "campo2": "valor2"}}' http://localhost:3000/set_log

  const server = 666;
  const dados = '{"campo1": "valor1", "campo2": "valor2"}';
  

  const dataAtual = new Date();
  
  connection = connectionRequest()
  // SQL para inserção
  const query = 'INSERT INTO logs (data_c, server, dados) VALUES ( ?, ?, ?)';
  
  // Parâmetros para substituir os placeholders no SQL
  const parametros = [ dataAtual, server, dados];
  
  connection.query(query,parametros, (err, results) => {
    if (err) {
      connection.destroy();
      res.status(500).json({erro:err,status:0});
    } else {
      connection.destroy();
      res.status(200).json({status:1, message:"Inserido com sucesso!"});
    }
  });

});