import * as mongoose from "mongoose";

mongoose.Promise = global.Promise;
let isConnected: boolean = false;
export const connectToDatabase = () => {
    if (isConnected) {
        console.log('using existing database connection');
        return Promise.resolve();
    } else {
        console.log('using new database connection', { isConnected });
        return mongoose.connect(process.env.DB_CONNECT, { poolSize: 10 })
            .then(db => {
                isConnected = true;
            });
    }

};