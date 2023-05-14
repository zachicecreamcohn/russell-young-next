const mysql = require('mysql');

class MySQL {
  static pool = mysql.createPool({
    host: process.env.DB_ENDPOINT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionLimit: 50, // Adjust this value according to your needs
  });
  static connectionCount = 0;

  constructor() {
    console.log('MySQL constructor');
    console.log('process.env.DB_ENDPOINT', process.env.DB_ENDPOINT);
    this.connectionCount++;

    // Log the number of active connections every 30 seconds
    setInterval(() => {
      console.log(`Active connections: ${MySQL.pool._allConnections.length}`);
    }, 30000);

    // Add event listener for new connections
    MySQL.pool.on('connection', () => {
      MySQL.connectionCount++;
      console.log(`New connection: ${MySQL.connectionCount}`);
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(sql, args, (err, rows) => {
          connection.release();
          if (err) {
            console.error(`Error releasing connection: ${err}`);
            return reject(err);
          }
          resolve(rows);
        });
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      MySQL.pool.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = MySQL;
