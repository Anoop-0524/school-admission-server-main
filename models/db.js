module.exports = function () {
  const mysql = require("mysql2");
  const dbConfig = require("../config/db.config.js");

  // Create a connection to the database
  const connection = mysql.createConnection({
    // connectionLimit: 50,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig?.PORT ? dbConfig.PORT : 3306
  });

  // open the MySQL connection
  connection.connect(error => {
    if (error) {
      console.log("DB connection failed");
      throw error
    }
    else {
      console.log("Successfully connected to the database.");
    }
  });
  return connection;
}


// module.exports = connection;