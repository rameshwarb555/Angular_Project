const express = require('express');
    router = express.Router()

  const service = require('../services/product.service')  


    //http:localhost:3000/api/products/

router.get('/',async (req,res)=>{
   const products= await service.getAllProducts()
   console.log(products)
    res.send(products)
})

router.get('/:id', async (req, res) => {
    try {
      const product = await service.getProductById(req.params.id);
      if (product.length ===0) {
        res.status(404).json('No records with the given id: ' + req.params.id);
      } else {
        res.send(product);
      }
    } catch (error) {
      // Handle the error
      res.status(500).json('An error occurred: ' + error.message);
    }
  });
  

router.delete('/:id', async (req, res) => {
    try {
      const affectedRows = await service.deleteProduct(req.params.id);
      if (affectedRows === 0) {
        res.status(404).json('No records with the given id: ' + req.params.id);
      } else {
        res.send('Deleted Successfully');
      }
    } catch (error) {
      // Handle the error
      res.status(500).json('An error occurred: ' + error.message);
    }
  });
  

  
router.post('/', async (req, res) => {
    try {
      const { title, price, description, category, image } = req.body;
      await service.addProduct({ title, price, description, category, image });
      res.status(201).json({ message: 'Created Successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
  
    try {
      const affectedRows = await service.editOrUpdateProduct(productData, productId);
  
      if (affectedRows === 0) {
        // If no record was updated, return a 404 response
        return res.status(404).json({ error: 'No record with the given id: ' + productId });
      }
  

     // If record was updated successfully, return a success message
    return res.json({ message: 'Update Successfully' });
    } catch (error) {
      if (error.message === 'No record with the given ID') {
        // If the error is "No record with the given ID", return a 404 response
        return res.status(404).json('No record with the given id: ' + productId);
      }
  
      // For any other error, return a 500 response
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

  
  


module.exports = router;