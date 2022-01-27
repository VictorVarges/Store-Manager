const { createProducts,
   getAll, getProductsId, updateProducts } = require('../models/productsModel');

const productsNameValidate = async (name) => {
  const listProductsDb = await getAll();
  const nameAlreadyExists = listProductsDb.some((product) => product.name === name); 
  
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
  if (typeof quantity !== 'number' || quantity < 1) {
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

const updateValidate = async ({ name, quantity, id }) => {
  const productsInDb = await getProductsId(id);
  console.log({ productsInDb });

  if (!productsInDb) return { code: 404, message: 'Product not found' };
  
  if (name.length < 5) {
    return { 
       code: 422, message: '"name" length must be at least 5 characters long' }; 
   } 

   if (typeof quantity !== 'number' || quantity < 1) {
     return {
      code: 422,
      message: '"quantity" must be a number larger than or equal to 1',
    };
  }
      const updateInDb = await updateProducts({ name, quantity, id });

  return updateInDb;
};

module.exports = {
  productsValidate,
  getProductsValidate,
  getProductsIdValidate,
  updateValidate,
};
