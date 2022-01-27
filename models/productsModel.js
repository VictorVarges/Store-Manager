const connection = require('./connection');

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

const getAll = async () => {
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
    console.log('query do getProductsId', { query });
    if (query.length === 0) return null;
    return query[0];
  } catch (err) {
    return err;
  }
};

const updateProducts = async ({ name, quantity, id }) => {
    const [query] = await connection
    .execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id]);
    console.log('fiz a query', { query });
    console.log('fiz a query', { quantity });
  
    return {
      id,
      name,
      quantity,
    };
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

module.exports = {
  createProducts,
  searchProducts,
  getAll,
  getProductsId,
  updateProducts,
};