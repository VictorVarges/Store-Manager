const { createProducts, getAll, getProductsId } = require('../models/productsModel');

const productsNameValidate = async (name) => {
  const productsDb = await getAll();
  const nameAlreadyExists = productsDb.some((product) => product.name === name); 
  
  if (!name) return { code: 400, message: '"name" is required' }; 

  if (name.length < 5) {
 return { 
    code: 422, message: '"name" length must be at least 5 characters long' }; 
} 

  if (nameAlreadyExists) return { code: 409, message: 'Product already exists' }; 
};

const productsQuantityValidate = (quantity) => {
  if (quantity === undefined) {
    return {
        code: 400,
        message: '"quantity" is required',
    };
  }
  if (typeof quantity === 'string' || quantity < 1) {
    return {
      code: 422,
      message: '"quantity" must be a number larger than or equal to 1',
    };
  }
};

const productsValidate = async (name, quantity) => {
  const invokeName = await productsNameValidate(name);
  const invokeQuantity = productsQuantityValidate(quantity);
  if (invokeQuantity) {
    return invokeQuantity;
  }
  if (invokeName) {
    return invokeName;
  }
  const insertInDB = await createProducts({ name, quantity });
    return insertInDB;
};

const getProductsValidate = async () => {
  const productsInDb = await getAll();

  return productsInDb; 
};

const getProductsIdValidate = async (id) => {
  const productsInDb = await getProductsId(id);
  if (productsInDb === null) return { code: 404, message: 'Product not found' };

  return productsInDb; 
};

module.exports = {
  productsValidate,
  getProductsValidate,
  getProductsIdValidate,
};
