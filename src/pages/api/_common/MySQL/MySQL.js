const mysql = require('mysql');


class MySQL {
  constructor() {
    console.log('MySQL constructor');
    console.log('process.env.DB_ENDPOINT', process.env.DB_ENDPOINT);
    this.connection = mysql.createConnection({
      host: process.env.DB_ENDPOINT,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = MySQL;
