DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products( 
id INT(4) NOT NULL,
productName VARCHAR (100),
departmentName VARCHAR (100),
price DECIMAL (6,2),
stockQuantity INT(4) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products(id, productName, departmentName, price, stockQuantity)
VALUES (1, 'Wilson Evolution Indoor Basketball', 'Sports and Fitness', 48.64, 200),
       (2, 'Echo Dot', 'Electronics', 34.99, 1000),
       (3, 'The Office: The Complete Series', 'Movies and TV', 49.99, 25),
       (4, 'The Dark Knight', 'Movies and TV', 19.99, 40),
       (5, 'Cards Against Humanity', 'Toys and Games', 25.00, 100),
       (6, 'Lebron James Cleveland Cavaliers Jersey', 'Sports-Clothing', 129.95, 5),
       (7, 'Tide Pods', 'Health and Household', 18.97, 250),
       (8, 'Keuring K-Select Coffee Maker', 'Kitchen and Dining', 129.99, 25),
       (9, 'Elite Basketball Socks (5-pack)', 'Sports-Clothing', 22.98, 400),
       (10, 'Fossil Mens The Minimalist (watch)', 'Clothing-watches', 75.99, 15);