const salesModel = require('../models/salesModel');

const salesProductIdValidate = (productId) => {
  if (!productId) return { code: 400, message: '"product_id" is required' };
};

const salesQuantityValidate = (quantity) => {
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

module.exports = {
  salesValidate,
};