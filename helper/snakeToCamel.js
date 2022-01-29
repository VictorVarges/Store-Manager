const snakeToCamel = (sales) => {
  const walksSalesProducts = sales.map((sale) => {
    const newObjSalesProducts = {
      productId: sale.product_id,
      quantity: sale.quantity,
  }; 
  return newObjSalesProducts;
});
  return walksSalesProducts;
};

module.exports = snakeToCamel; 