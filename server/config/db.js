const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });


// create connection to database
const dbConfig = {
    connectionLimit: process.env.DB_connectionLimit,
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database,
    ssl: {
        rejectUnauthorized: true
    }
};

// if (process.env.USE_SSL === 'true') {
//     dbConfig.ssl = {
//       rejectUnauthorized: true // Or other Azure-recommended settings
//     };
//   }

const db = mysql.createPool(dbConfig);


// test database connection
db.getConnection((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('MySQL Connected...');
    }
});


module.exports = db.promise();
