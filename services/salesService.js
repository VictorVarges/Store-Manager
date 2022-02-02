const salesModel = require('../models/salesModel');

const salesValidate = async (reqBody) => {
  const { id } = await salesModel.getSalesId(new Date());

  await Promise.all(reqBody.map(async ({ productId, quantity }) => {
    const reponseSales = await salesModel.createSalesRecord({ id, productId, quantity });

    return reponseSales;
  }));
  return id;
};

const salesIdValidate = async (id) => {
  const salesIdInDb = await salesModel.getIdSales(id);
  if (salesIdInDb.length === 0) return { code: 404, message: 'Sale not found' };
  return salesIdInDb; 
};

const allSalesValidate = async () => {
  const salesInDb = await salesModel.getAllSales();
  return salesInDb;
};

module.exports = {
  salesValidate,
  salesIdValidate,
  allSalesValidate,
};