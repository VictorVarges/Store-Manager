const connection = require('./connection');

const getAll = async () => {
  try {
      const [query] = await connection.execute('SELECT * FROM products');
    
      return query;
    } catch (err) {
      return err;
    }
};

const getProductsId = async (id) => {
    const [query] = await connection.execute('SELECT * FROM products WHERE id=?', [id]);
    if (query.length === 0) return null;
    
    return query[0];
};

const searchProducts = async ({ name }) => {
  if (!name) return false;
  try {
    const [query] = await connection
    .execute('SELECT name FROM StoreManager.products WHERE name = ?', [name]);

    return query[0];
  } catch (err) {
    return err;
  }
};

const createProducts = async ({ name, quantity }) => {
  if (!name || !quantity) return false;
  try {
    // const [query] = await connection.execute('INSERT INTO products (name, quantity) VALUES (?, ?)',
    // [name, quantity]);
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

module.exports = {
  createProducts,
  searchProducts,
  getAll,
  getProductsId,
};