const connection = require('./connection');
  
const getSalesId = async (date) => {
  try {
    const [query] = await connection.execute('INSERT INTO sales (date) VALUES (?)', [date]);

    return { id: query.insertId };
  } catch (err) {
    return err.message;
  } 
};

const createSalesRecord = async ({ id, productId, quantity }) => {
  try {
    const [query] = await connection
    .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
     [id, productId, quantity]);
     
     return { id: query.insertId };
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getSalesId,
  createSalesRecord,
};