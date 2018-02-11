import { default as Cart, CartModel } from '../models/cart';
import { default as Order, OrderModel } from '../models/orders';
import { default as Product, ProductModel } from '../models/product';
import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";

//mongoose.Promise = Promise;

export const addToCart = (req: Request, res: Response, next: NextFunction) => {

    const addedProduct = req.body;

    Cart.findOneAndUpdate({
        usersId: addedProduct.userId
    }, { $push: { products: addedProduct } }, { new: true }, function (err: Error, product: ProductModel) {
        if (err) {
            return next(err);
        }
        res.status(201).json(product);
    })

}
export const removeFromCart = (req: Request, res: Response, next: NextFunction) => {

    const removedProductInfo = req.body;

    Cart.update({
        usersId: removedProductInfo.userId
    }, { $pull: { 'products': { productId: removedProductInfo.productId } } }, { new: true }, function (err: Error, data) {
        if (err) {
            return next(err);
        }
        res.status(201).json(data);
    })
}

// Send orders to database

export const sendOrders = (req: Request, res: Response, next: NextFunction) => {

    const usersOrder = req.body;
    const {
            orderNumber,
        orderTotal,
        orderDate,
        userId,
        products,
        suppliers } = req.body;


    Order.findOne({ orderNumber: orderNumber }, function (err: Error, existingOrder: OrderModel) {
        if (err) {
            return next(err);
        }
        if (existingOrder) {
            return res.status(422).send({ order: 'That order already exists.' });
        }
        let order = new Order({
            usersId: userId,
            orderTotal: orderTotal,
            orderNumber: orderNumber,
            orderDate: orderDate,
            products: products,
            suppliers: suppliers

        });

        order.save(function (err: Error, order: OrderModel) {
            if (err) {
                return next(err);
            }

        });
    }).exec()
        .then(function (orders) {
            Cart.findOneAndUpdate({
                usersId: usersOrder.userId
            }, { $set: { products: [] } }, { new: true }).exec()
                .then(function (cart) {
                    res.status(201).json({ message: 'Order added successfully and Cart Removed' });
                })
        })


}

//restaurant Orders

export const getRestOrders = (req: Request, res: Response, next: NextFunction) => {

    const restId = req.params.restId;


    Order.find({
        usersId: restId
    }, function (err, orders) {
        if (err) {
            return next(err);
        }

        res.status(201).json({ orders: orders });
    });

}

export const getSingleOrder = (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.restId;


    Order.findOne({ orderNumber: orderId }, function (err: Error, order) {
        if (err) {

            return next(err);
        }
        res.status(201).json(order);
    });

}

//Suppliers orders

export const getSupplierOrders = (req: Request, res: Response, next: NextFunction) => {

    const { supplierId } = req.params;


    Order.find({
        suppliers: { $in: [supplierId] }
    }, function (err, orders) {
        if (err) {
            return next(err);
        }

        res.status(201).json({ orders: orders });
    });

}