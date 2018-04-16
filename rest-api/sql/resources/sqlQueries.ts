const fs = require("fs");
import { createSqlString } from '../convertSql';

interface sqlQueries {
    [key: string]: () => Promise<any>;
}
export const sqlQueries: sqlQueries = {

    createTable: async () => createSqlString(process.cwd() + '/sql/queries/createTable.sql'),

}