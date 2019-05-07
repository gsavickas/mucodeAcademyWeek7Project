const mysql = require("mysql");
let pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "todoAppadmin",
    password: "admin",
    database: "todoApp"
});

module.exports.pool = pool;