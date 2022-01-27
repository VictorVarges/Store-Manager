const { createProducts, getAll } = require('../models/productsModel');

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
  console.log({ quantity });
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
  console.log({ invokeName: invokeName === true, invokeQuantity });
  if (invokeQuantity) {
    return invokeQuantity;
  }
  if (invokeName) {
    console.log('cai no invokeName');
    return invokeName;
  }
  console.log('passei nos testes');
  const insertInDB = await createProducts({ name, quantity });
  console.log({ insertInDB });
    return insertInDB;
};

module.exports = {
  productsValidate,
};
