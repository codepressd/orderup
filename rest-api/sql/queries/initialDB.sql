CREATE TABLE IF NOT EXISTS user (
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName NVARCHAR VARYING(64),
    lastName NVARCHAR VARYING(64),
    email NVARCHAR VARYING(64) NOT NULL,
    password BINARY NOT NULL,
    phone NVARCHAR VARYING(20),
    address NVARCHAR VARYING(64),
    city NVARCHAR VARYING(64),
    state NVARCHAR VARYING(64),
    zipcode NVARCHAR VARYING(64),
);

CREATE TABLE IF NOT EXISTS company (
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    companyName NVARCHAR VARYING(64) NOT NULL,
    companyType NVARCHAR VARYING(64) NOT NULL,
    phone NVARCHAR VARYING(20),
    address NVARCHAR VARYING(64),
    city NVARCHAR VARYING(64),
    state NVARCHAR VARYING(64),
    zipcode NVARCHAR VARYING(64),
);

CREATE TABLE IF NOT EXISTS userCompany (
    companyId int NOT NULL,
    userId int NOT NULL,
    FOREIGN KEY(companyId) REFERENCES company (ID),
    FOREIGN KEY(userId) REFERENCES user (ID)
);

CREATE TABLE IF NOT EXISTS product(
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productName NVARCHAR VARYING(64) NOT NULL,
    productPrice int NOT NULL,
    productSalePrice int,
    productSize NVARCHAR VARYING(64),
    productSku NVARCHAR VARYING(64),
    productDescription NVARCHAR VARYING(500),
    productImage NVARCHAR VARYING(250)
);

CREATE TABLE IF NOT EXISTS category(
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR VARYING(100),
);

CREATE TABLE IF NOT EXISTS categoryProduct(
    categoryId int NOT NULL,
    productId int NOT NULL,
    companyId int NOT NULL,
    FOREIGN KEY(categoryId) REFERENCES category(ID),
    FOREIGN KEY(companyId) REFERENCES company (ID),
    FOREIGN KEY(productId) REFERENCES product (ID)
);

CREATE TABLE IF NOT EXISTS orders(
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId int NOT NULL,
    createDate TIMESTAMP = CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS orderItems(
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productId int NOT NULL,
    ordersId int NOT NULL,
    quantity int NOT NULL,
    createDate TIMESTAMP = CURRENT_TIMESTAMP,
    FOREIGN KEY(productId) REFERENCES product(ID),
    FOREIGN KEY(ordersId) REFERENCES orders (ID)
)