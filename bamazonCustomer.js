var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    passsword: "root",
    database: "bamazonDB"
})

connection.connect(function (err) {
    console.log("Connected as id: " + connection.threadId);
    start();
})


var start = function getProducts() {
    connection.query('SELECT * FROM products', function (err, result) {
        if (err) throw err;
        console.log('Items in Store');
        console.log('=================================================');

        result.forEach(function (item) {
            console.log('Item ID: ' + result[i].id + ' Product: ' + result[i].productName + ' Department: ' + result[i].departmentName + ' Price: ' + '$' + result[i].price + ' Quantity left: ' + result[i].stockQuantity)
        }
		console.log('=================================================');
        orderItem();
    })
}

// Ask user to order an item
function orderItem() {
    inquirer.prompt([{
        name: 'selectId',
        message: 'Please enter the ID of the product you would like to buy',
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log('Please enter a valid ID.');
                return false;
            }
        }
    }, {
        name: 'number_of_units',
        message: 'How many units do you want to buy?',
        type: 'input',
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log('Please enter a valid quantity.');
                return false;
            }
        }
    }]).then(function (answer) {
        return new Promise(function (resolve, reject) {
            // query for all items in products table where the id is what was chosen
            connection.query("SELECT * FROM products WHERE id=?", answer.selectId, function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
        }).then(function (result) {
            // if there aren't enough of the item
            if (answer.number_of_units > result[0].stockQuantity) {
                return "Insufficient quantity!";
                // if there are enough
            } else {
                var object = {};
                // answer is the users responses to the prompts
                object.answer = answer;
                // result is the results of the query
                object.result = result;
                return object;
            }
        }).catch(function (err) {
            console.log(err);
            connection.destroy();
        }).then(function (object) {
            // if there was sufficient quantity
            if (object.answer) {
                var newQuantity = object.result[0].stockQuantity - object.answer.number_of_units;
                var product = object.answer.selectId;
                var totalCost = (object.result[0].price * object.answer.number_of_units).toFixed(2);
                // query that updates the quantity of the item
                connection.query("UPDATE products SET stockQuantity=? WHERE id=?", [newQuantity, product], function (err, res) {
                    if (err) reject(err);
                    console.log('Your total cost is $' + totalCost);
                    // destroy connection
                    connection.destroy();
                });
            } else {
                console.log(object);
                // destroy connection
                connection.destroy();
            }
        });
    });
}













           