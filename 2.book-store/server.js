const express = require('express');
const app = express();
const PORT = 3333;
const db = require('./db.server')


app.use(express.json());

const router = require('./routes/userrouter');
app.use('/books', router); 


app.get('/', (req, res) => {
  res.send('Welcome to the Book Store API');
});


app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
