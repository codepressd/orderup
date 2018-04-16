const fs = require("fs");

export const createSqlString = async (fileLocation: string) => {

    const readFile = async () => {

        return new Promise((resolve, reject) => {
            const reg: RegExp = /(?:\r\n|\n|\r)/g;
            try {
                fs.readFile(fileLocation, "utf8", (err, data) => {
                    if (err) {
                        return err;
                    } else {
                        resolve(data.replace(reg, ''));
                    }
                });

            } catch (err) {
                console.log(err);
                reject();
            }
        });
    };
    const string = await readFile().then((response) => {
        return response;
    });
    return string;
};