import * as mongoose from "mongoose";

mongoose.Promise = global.Promise;
let cachedDB: any = null;
export const connectToDatabase = () => {
    if (cachedDB && cachedDB.serverconfig.isConnected()) {
        console.log('using existing database connection');
        return Promise.resolve(cachedDB);
    } else {
        console.log('using new database connection');
        return mongoose.connect(process.env.DB_CONNECT, { poolSize: 10 })
            .then(db => { cachedDB = db; return db; });
    }
};