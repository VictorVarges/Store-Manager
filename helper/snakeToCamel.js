const snakeToCamel = (sales) => {
  const walksSalesProducts = sales.map((sale) => {
    const newObjSalesProducts = {
      date: sale.date,
      productId: sale.product_id,
      quantity: sale.quantity,
      saleId: sale.sale_id,
    }; 
    return newObjSalesProducts;
  });
  return walksSalesProducts;
};

module.exports = snakeToCamel; 