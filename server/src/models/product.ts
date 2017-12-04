import * as mongoose from 'mongoose';

export type ProductModel = mongoose.Document & {
    title: string,
    description: string,
    price: {
        unit: number;
        case: number;
    },
    quantity: number;
    unitsPerCase: number;
    category: string; // Need to add more robust type
    image: string;
    supplierId: string,
    supplier: string,
    supplierItemId: string,
};

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        unit: Number,
        case: Number,
    },
    quantity: Number,
    unitsPerCase: Number,
    category: String,
    image: String,
    supplierId: String,
    supplier: String,
    supplierItemId: String,
});
ProductSchema.index(
    {
        title: "text",
        description: "text",
    },
    {
        weights: {
            title: 2,
            description: 1,
        },
        name: "TextIndex"
    }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;