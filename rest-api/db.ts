import * as mongoose from "mongoose";
import { release } from "os";
const { Pool } = require('pg');

export const connectToPostgres = async () => {
    try {
        const pool = new Pool();
        const client = await pool.connect();
        console.log("Connected");
        return client;
    } catch (e) {
        console.log("this errored", e.stack)
        return e;
    }
}
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