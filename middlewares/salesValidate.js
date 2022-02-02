const snakeToCamel = require('../helper/snakeToCamel');

const salesQuantityValidate = (req, res, next) => {
  req.body.some(({ quantity }) => {
    if (quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    return true;
  });
  const quantityNumberOrGreaterOne = req.body
  .some(({ quantity }) => quantity < 1 || typeof quantity !== 'number');

  if (quantityNumberOrGreaterOne) {
    return res.status(422).json({
      message: '"quantity" must be a number larger than or equal to 1',
    });
  }
  next();
};

const salesProductIdValidate = (req, res, next) => {
  const arrListProducts = snakeToCamel(req.body);

  const eachProduct = arrListProducts.some(({ productId }) => !productId);

  if (eachProduct) {
    return res.status(400).json({ message: '"product_id" is required' });
  }

  next();
};

module.exports = { salesQuantityValidate, salesProductIdValidate };