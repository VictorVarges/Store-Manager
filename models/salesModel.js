const connection = require('./connection');

const getSalesId = async (date) => {
  try {
    const [query] = await connection.execute(
      'INSERT INTO sales (date) VALUES (?)',
      [date],
    );

    return { id: query.insertId };
  } catch (err) {
    return err.message;
  }
};

const createSalesRecord = async ({ id, productId, quantity }) => {
  try {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [id, productId, quantity],
    );
    //  console.log('createSalesRecord - models', query);
    return { id };
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const getAllSales = async () => {
  try {
    const [query] = await connection.execute(`SELECT sale_id AS saleId, date, quantity, product_id
    FROM sales AS s INNER JOIN sales_products AS sp on sp.sale_id = s.id;`);
    // console.log('getAllSales - models', query);
    return query;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const getIdSales = async (id) => {
  const [query] = await connection.execute(
    `SELECT date, product_id, quantity
    FROM sales INNER JOIN sales_products on sale_id = id WHERE id = ?;`,
    [id],
  );
  if (query === undefined) return null;
  // console.log('getAIdSales - models', query);
  return query;
};

module.exports = {
  getSalesId,
  createSalesRecord,
  getAllSales,
  getIdSales,
};