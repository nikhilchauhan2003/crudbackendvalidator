
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',    
  user: 'root',        
  password: '',       
  database: 'books_store' 
});


connection.connect((err) => {
  if (err) {
    console.error(' Failed to connect to MySQL:', err.message);
    process.exit(1); 
  }
  console.log(' Connected to MySQL');
});

module.exports = connection;
