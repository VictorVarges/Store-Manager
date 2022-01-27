const prodService = require('../services/prodService');

const createProducts = async (req, res) => {
  const { name, quantity } = req.body;
  // const { code, message } = serviceController.productsValidate;

  const responseProducts = await prodService.productsValidate(name, quantity);

  if (responseProducts.code) {
 return res.status(responseProducts.code)
  .json({ message: responseProducts.message }); 
}
  return res.status(201).json(responseProducts);
};

module.exports = {
  createProducts,
};
