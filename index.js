const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsControllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsController.createProducts);
app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductsId);
app.put('/products/:id', productsController.updateProducts);

// app.use(HOST, app);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
