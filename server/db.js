const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'root',
    database:'product_db'
})



module.exports = mysqlPool;