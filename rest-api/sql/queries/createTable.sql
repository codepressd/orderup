CREATE TABLE IF NOT EXISTS user_order_up (
    ID int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    firstName VARCHAR(64),
    lastName VARCHAR(64),
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    phone VARCHAR(64),
    address VARCHAR(64),
    city VARCHAR(64),
    state VARCHAR(64),
    zipcode VARCHAR(64)
)