import * as mongoose from 'mongoose';
import { ProductModel } from './product';

export type CartModel = mongoose.Document & {
    userId: string,
    products: ProductModel[],
}

const CartSchema = new mongoose.Schema({
    usersId: {
        type: String,
        required: true
    },
    products: [{}]
});

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;