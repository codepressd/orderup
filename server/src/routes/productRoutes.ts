import { Router } from 'express';
import * as productController from '../controllers/product';

const router = Router();

//Search Routes
router.route('/searchProducts').post(productController.searchProducts);//Search for products

//product routes supplier
router.route('/postProduct').post(productController.postProduct);//post a new product
router.route('/updateProduct').post(productController.updateProduct);//update an existing Product
router.route('/getSingleProduct/:productId').get(productController.getSingleProduct);//get an existing product info
router.route('/getSupplierProducts').post(productController.getSupplierProducts); //get all supplier products
router.route('/removeProduct/:product_id').delete(productController.removeProduct);//delete product

//product routes restaurant

router.route('/getProducts').get(productController.getProducts);//get all products to display
router.route('/getProductCategory').post(productController.getProductCategory);//get all products to display

export default router;