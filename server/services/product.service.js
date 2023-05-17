const mysqlPool = require('../db');
const db = require('../db')


module.exports.getAllProducts= async ()=>{
    const [product_records]= await db.query('SELECT * FROM products')
    return(product_records);
}

module.exports.getProductById= async (id)=>{
    const [product_record]= await db.query('SELECT * FROM products WHERE id = ?',[id])
    return(product_record);
}
module.exports.deleteProduct= async (id)=>{
    const [{affectedRows}]= await db.query('DELETE FROM products WHERE id = ?',[id])
    return affectedRows;
}

module.exports.addProduct = async (obj,id =0) => {
    const [[[{ affectedRows }]]] = await db.query('CALL add_or_edit_products(?,?,?,?,?,?)', [id, obj.title, obj.price, obj.description, obj.category, obj.image]);
    return affectedRows;
  };
  
  
  module.exports.editOrUpdateProduct = async function editOrUpdateProduct(product, id) {
    // Check if product exists
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      throw new Error('No record with the given ID');
    }
  
    // Update product
    const [result] = await db.query('CALL add_or_edit_products(?,?,?,?,?,?)', [
      id,
      product.title,
      product.price,
      product.description,
      product.category,
      product.image,
    ]);
    return result[0][0].affectedRows;
  };

  