const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const productsController = require('./controllers/productsControllers');

const PORT = process.env.PORT || 3000;
// const HOST = process.env.HOST || '/';

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsController.createProducts);

// app.use(HOST, app);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
