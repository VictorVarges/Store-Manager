const connection = require('./connection');

const createProducts = async ({ name, quantity }) => {
  if (!name || !quantity) return false;
  try {
    const query = 'INSERT INTO products (name, quantity) VALUES (?,?)';
    const [rows] = await connection.execute(query, [name, quantity]);
    return {
      id: rows.insertId,
      name,
      quantity,
    };
  } catch (err) {
    return err;
  }
};

const getAllProducts = async () => {
  try {
      const [query] = await connection.execute('SELECT * FROM products');
    
      return query;
    } catch (err) {
      return err;
    }
};

const getProductsId = async (id) => {
  try {
    const [query] = await connection.execute('SELECT * FROM products WHERE id=?', [id]);
    if (query.length === 0) return null;
    return query[0];
  } catch (err) {
    return err;
  }
};

const updateProducts = async ({ name, quantity, id }) => {
    const [query] = await connection
    .execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id]);
    console.log({ query });
  
    return {
      id,
      name,
      quantity,
    };
};

const deleteProductsId = async (id) => {
  try {
    const [query] = await connection.execute('DELETE FROM products WHERE id=?', [id]);
    if (query.length === 0) return null;
    return query;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createProducts,
  getAllProducts,
  getProductsId,
  updateProducts,
  deleteProductsId,
};