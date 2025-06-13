
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_auth',
});

connection.connect((err) => {
  if (err) {
    console.error(' Failed to connect to MySQL:', err.message);
    process.exit(1);
  }
  console.log('hlo bhaiii i am working');
});

module.exports = connection;
