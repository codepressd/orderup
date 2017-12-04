import { Router } from 'express';
import * as cartController from '../controllers/cart';

const router = Router();

// Product routes supplier
router.route('/getSupplierOrders/:supplierId').get(cartController.getSupplierOrders);//get all suppliers orders

// Product routes restaurant
router.route('/addToCart').post(cartController.addToCart);//add to cart
router.route('/deleteProductFromCart').put(cartController.removeFromCart);//remove from cart
router.route('/sendOrders').post(cartController.sendOrders);// Send out orders from cart
router.route('/getRestOrders/:restId').get(cartController.getRestOrders);// get all restaurants orders
router.route('/getSingleOrder/:restId').get(cartController.getSingleOrder);// get a single restaurants order
export default router;