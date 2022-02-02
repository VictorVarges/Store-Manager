const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsControllers');
const salesController = require('./controllers/salesControllers');

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
app.delete('/products/:id', productsController.deleteProducts);

app.post('/sales', salesController.createSales);
app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getIdSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
