import * as mongoose from "mongoose";
import { ProductModel } from "./product";

export type OrderModel = mongoose.Document & {
    userId: string,
    orderTotal: object,
    orderDate: string,
    userOrdered: string,
    orderNumber: string,
    location: {
        name: string,
        address: string,
        city: string,
        state: string,
        areaCode: string,
    },
    products: ProductModel[],
    suppliers: string[],
}


const OrderSchema = new mongoose.Schema({
    usersId: {
        type: String,
        required: true
    },
    orderTotal: {},
    orderDate: { type: String },
    userOrdered: { type: String },
    orderNumber: { type: String },
    location: {
        name: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        areacode: { type: String }
    },
    products: [{}],
    suppliers: []
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;