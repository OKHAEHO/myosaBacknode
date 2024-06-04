const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "myosa",
  password: "1234",
  database: "cheerupyouth",
});

db.connect();
module.exports = db;
