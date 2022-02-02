const snakeToCamel = require('../helper/snakeToCamel');
const salesService = require('../services/salesService');

const MESS_SUCCESS = 201;
const MESS_OK = 200;

const createSales = async (req, res) => {
  const [{ productId, quantity }] = snakeToCamel(req.body);
  const reponseSales = await salesService.salesValidate(productId, quantity);

  if (reponseSales.code) {
    return res.status(reponseSales.code)
     .json({ message: reponseSales.message }); 
    }
    return res.status(MESS_SUCCESS).json({ ...reponseSales, itemsSold: req.body });
  };
  // const arrListProducts = snakeToCamel(req.body);
  // console.log('req.body', req.body);
  // const receiveProducts = async ({ productId, quantity }) => {
    // const responseSales = await salesService.salesValidate(productId, quantity);
    
    // if (responseSales.code) {
    //   return res.status(responseSales.code)
    //   .json({ message: responseSales.message }); 
    // }
    // return res.status(MESS_SUCCESS).json({ id, itemsSold: req.body });
    // return responseSales;
  // };
  // console.log(receiveProducts);
  // const [newListProducts] = await Promise.all(arrListProducts.map(receiveProducts));
  // console.log('newListProducts - controllers', newListProducts);
  // const { id } = newListProducts;
  // console.log('id', id);

const getAllSales = async (req, res) => {
  const responseSales = await salesService.allSalesValidate();
  console.log('getAllSales - controllers', responseSales);
  return res.status(MESS_OK).json(responseSales);
};

const getIdSales = async (req, res) => {
  const { id } = req.params;
  const responseIdSales = await salesService.salesIdValidate(id);
  // console.log('getIdSales - controllers', responseIdSales);
  if (responseIdSales.code) {
    return res.status(responseIdSales.code).json({ message: responseIdSales.message });
  }
    return res.status(MESS_OK).json(responseIdSales);
};

module.exports = {
  createSales,
  getAllSales,
  getIdSales,
};