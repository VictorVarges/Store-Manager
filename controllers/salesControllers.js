const snakeToCamel = require('../helper/snakeToCamel');
const salesService = require('../services/salesService');

const MESS_SUCCESS = 201;

const createSales = async (req, res) => {
  const [{ productId, quantity }] = snakeToCamel(req.body);

  const reponseSales = await salesService.salesValidate(productId, quantity);

  if (reponseSales.code) {
 return res.status(reponseSales.code)
  .json({ message: reponseSales.message }); 
}

  return res.status(MESS_SUCCESS).json({ ...reponseSales, itemsSold: req.body });
};

module.exports = {
  createSales,
};