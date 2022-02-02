const salesModel = require('../models/salesModel');

const salesProductIdValidate = (productId) => {
  if (!productId) return { code: 400, message: '"product_id" is required' };
};

const salesQuantityValidate = (quantity) => {
  console.log('quantity', quantity);
  if (quantity === undefined) return { code: 400, message: '"quantity" is required' };
 
  if (quantity < 1 || typeof quantity !== 'number') { 
    return { code: 422, message: '"quantity" must be a number larger than or equal to 1' }; 
}
};

const salesValidate = async (productId, quantity) => {
  const invokeProductId = salesProductIdValidate(productId);
  const invokeQuantity = salesQuantityValidate(quantity);

  if (invokeProductId) return invokeProductId;
  if (invokeQuantity) return invokeQuantity;
  const { id } = await salesModel.getSalesId(new Date());

  const salesCreated = await salesModel.createSalesRecord({ id, productId, quantity });

  return salesCreated;
};

const salesIdValidate = async (id) => {
  const salesIdInDb = await salesModel.getIdSales(id);
  console.log('salesIdValidate - service', { salesIdInDb });
  if (salesIdInDb.length === 0) return { code: 404, message: 'Sale not found' };
  return salesIdInDb; 
};

const allSalesValidate = async () => {
  const salesInDb = await salesModel.getAllSales();
  // console.log('allSalesValidate - service', salesInDb);
  return salesInDb;
};

module.exports = {
  salesValidate,
  salesIdValidate,
  allSalesValidate,
};