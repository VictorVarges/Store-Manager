const prodService = require('../services/prodService');

const MESS_SUCCESS = 200;

const createProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const responseProducts = await prodService.productsValidate(name, quantity);

  if (responseProducts.code) {
 return res.status(responseProducts.code)
  .json({ message: responseProducts.message }); 
}
  return res.status(201).json(responseProducts);
};

const getProducts = async (req, res) => {
  const responseProducts = await prodService.getProductsValidate();

  return res.status(MESS_SUCCESS).json(responseProducts);
};

const getProductsId = async (req, res) => {
  const { id } = req.params;
  const responseProducts = await prodService.getProductsIdValidate(id);
  
  if (responseProducts.code) {
    return res.status(responseProducts.code).json({ message: responseProducts.message });
  }
  return res.status(MESS_SUCCESS).json(responseProducts);
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const responseProducts = await prodService.updateValidate({ name, quantity, id });

  if (responseProducts.code) {
    return res.status(responseProducts.code).json({ message: responseProducts.message });
  }
  return res.status(MESS_SUCCESS).json(responseProducts);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const responseProducts = await prodService.deleteValidate(id);

  if (responseProducts.code) {
    return res.status(responseProducts.code).json({ message: responseProducts.message });
  }
  return res.status(MESS_SUCCESS).json(responseProducts);
};

module.exports = {
  createProducts,
  getProducts,
  getProductsId,
  updateProducts,
  deleteProducts,
};
