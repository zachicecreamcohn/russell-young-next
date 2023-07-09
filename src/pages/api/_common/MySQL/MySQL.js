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
          if (err) {
            connection.release();
            console.error(`Error executing query: ${err}`);
            return reject(err);
          }
  
          // Check if the query is a write, update, or delete statement
          const isWriteQuery = /^(INSERT|UPDATE|DELETE)/i.test(sql.trim());
          if (isWriteQuery) {
            const insertQuery = "INSERT INTO db_updates (datetime) VALUES (NOW())";
            connection.query(insertQuery, (err) => {
              if (err) {
                console.error(`Error inserting into db_updates: ${err}`);
                return reject(err);
              }
            });
          }
  
          connection.release();
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
