const mysql = require('mysql');

class MySQL {
  constructor() {
    console.log('MySQL constructor');
    console.log('process.env.DB_ENDPOINT', process.env.DB_ENDPOINT);
    this.pool = mysql.createPool({
      host: process.env.DB_ENDPOINT,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      connectionLimit: 10, // Adjust this value according to your needs
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(sql, args, (err, rows) => {
          connection.release();
          if (err) return reject(err);
          resolve(rows);
        });
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.pool.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = MySQL;
