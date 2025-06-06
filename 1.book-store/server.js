const express = require('express');
const bodyParser = require('body-parser');  //It's especially used to read req.body for POST and PUT requests.
const bookRoutes = require('./Routes/bookRoutes.js');

const app = express();


app.use(bodyParser.json());
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send(' Welcome to the Book API!');
});

app.listen(3333,()=>{
    console.log(`hey i am working`);
});
