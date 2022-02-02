const snakeToCamel = require('../helper/snakeToCamel');
const salesService = require('../services/salesService');

const MESS_SUCCESS = 201;
const MESS_OK = 200;

const createSales = async (req, res) => {
  const camelCase = snakeToCamel(req.body);
  const reponseSales = await salesService.salesValidate(camelCase);

  return res.status(MESS_SUCCESS).json({ id: reponseSales, itemsSold: req.body });
};

const getAllSales = async (_req, res) => {
  const responseSales = await salesService.allSalesValidate();

  return res.status(MESS_OK).json(responseSales);
};

const getIdSales = async (req, res) => {
  const { id } = req.params;
  const responseIdSales = await salesService.salesIdValidate(id);
  console.log('getIdSales - controllers', responseIdSales);
  if (responseIdSales.code) {
    return res
      .status(responseIdSales.code)
      .json({ message: responseIdSales.message });
  }
  return res.status(MESS_OK).json(responseIdSales);
};

module.exports = {
  createSales,
  getAllSales,
  getIdSales,
};
