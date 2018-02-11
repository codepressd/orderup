import { default as Product, ProductModel } from '../models/product';
import User from '../models/User';
import { Request, Response, NextFunction } from "express";
import * as mongoose from 'mongoose';

function setProductInfo(req: ProductModel) {
    return {
        _id: req._id,
        title: req.title,
        description: req.description,
        singlePrice: req.price.unit,
        casePrice: req.price.case,
        category: req.category,
        imageurl: req.image,
        supplier: req.supplier,
        supplierId: req.supplierId
    }
}


export const postProduct = (req: Request, res: Response, next: NextFunction) => {

    const {
        supplierId,
        supplier,
        productName,
        unitPrice,
        casePrice,
        productDescription,
        productType,
        image,
        numInCases,
        quantity } = req.body;

    if (!productName) {
        return res.status(422).send({ productName: 'You must enter a Product Name.' });
    }
    if (!casePrice) {
        return res.status(422).send({ casePrice: 'You must enter an Case Price.' });
    }
    if (!productType) {
        return res.status(422).send({ productType: 'You must enter a Product Type.' });
    }

    let product = new Product({
        title: productName,
        description: productDescription,
        price: {
            unit: unitPrice,
            case: casePrice
        },
        quantity: quantity,
        unitsPerCase: numInCases,
        category: productType,
        image: image,
        supplierId: supplierId,
        supplier: supplier,
        supplierItemId: ''
    });


    product.save(function (err: Error, product: ProductModel) {
        if (err) {
            return next(err);
        }

        let productInfo = setProductInfo(product);
        res.status(201).json({
            product: productInfo,
            message: 'Product Added Successfully'
        })
    })
}

export const getSupplierProducts = (req: Request, res: Response, next: NextFunction) => {

    const supplyId = req.body.userId;

    Product.find({ supplierId: supplyId }, function (err, products) {
        if (err) {
            return next(err);
        }

        res.status(201).json({ products: products });

    });
}

export const getSingleProduct = (req: Request, res: Response, next: NextFunction) => {

    Product.findOne({
        _id: req.params.productId
    }, function (err, product) {
        if (err) {
            return next(err);
        }

        res.status(201).json({ product: product });
    })


}

export const searchProducts = (req: Request, res: Response, next: NextFunction) => {

    const { search, id, view } = req.body;

    Product.find(
        { $text: { $search: search } },
        { score: { $meta: "textScore" } }, function (err: Error, products: ProductModel[]) {

            if (err) {
                return next(err);
            }

            if (view === 'supplier') {
                console.log('this fired');
                let filteredProducts = products.filter((product: ProductModel) => {
                    return product.supplierId === id;
                });
                res.status(201).json(filteredProducts);
            } else {
                res.status(201).json(products);
            }
        }
    );

}

export const updateProduct = (req: Request, res: Response, next: NextFunction) => {

    const { supplierId, quantity, numInCases, productId, supplier, productName, unitPrice, casePrice, productDescription, productType, image } = req.body;

    const updatedProduct = {
        title: productName,
        description: productDescription,
        price: {
            unit: unitPrice,
            case: casePrice
        },
        quantity: quantity,
        unitsPerCase: numInCases,
        category: productType,
        image: image,
        supplierId: supplierId,
        supplier: supplier,
        supplierItemId: ''

    };

    Product.findOneAndUpdate({
        _id: productId
    }, { $set: updatedProduct }, { new: true }, function (err, product) {
        if (err) {
            return next(err);
        }
        res.status(201).json({ message: 'Product Successfully Updated!' });
    })
}

export const removeProduct = (req: Request, res: Response, next: NextFunction) => {
    Product.remove({

        _id: req.params.product_id

    }, (err: Error) => {

        if (err) {
            return next(err);
        }
        res.status(201).json({ message: 'Product Successfully Deleted!' });
    })
}

//For Restaurant side

export const getProducts = (req: Request, res: Response, next: NextFunction) => {

    Product.find({}, function (err, product) {
        if (err) {
            return next(err);
        }

        res.status(201).json({ products: product });
    })
}

export const getProductCategory = (req: Request, res: Response, next: NextFunction) => {

    let query: object = {
        category: req.body.category
    };

    if (req.body.category === 'all products') {
        query = {}

    }

    Product.find(query, function (err, product) {
        if (err) {
            return next(err);
        }

        res.status(201).json({ products: product });
    })
}