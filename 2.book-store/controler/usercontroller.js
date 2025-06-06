const db = require('../db.server');



exports.createBook = (req, res) => {
  const { title, author, price } = req.body;

  const sql = 'INSERT INTO newboook3 (Title, Author, Price) VALUES (?, ?, ?)';
  db.query(sql, [title, author, price], (err, result) => {
    if (err) {
      console.error('Failed to insert book:', err.message);
      return res.status(500).json({ error: 'Database insertion error' });
    }
    res.status(201).json({ message: 'Book inserted successfully', insertedId: result.insertId });
  });
};




//bulk ainsertion
// exports.createBook = (req, res) => {
//   const books = req.body; // Expecting an array of books

//   if (!Array.isArray(books)) {
//     return res.status(400).send(' Please send an array of books');
//   }

//   const values = books.map(book => [book.id, book.name, book.title, book.author]);

//   const query = 'INSERT INTO newboook2 (id, name, title, author) VALUES ?';

//   db.query(query, [values], (err, result) => {
//     if (err) {
//       console.error(' Failed to insert books:', err.message);
//       return res.status(500).send('Something went wrong');
//     }

//     res.send(` ${result.affectedRows} books added successfully`);
//   });
// };




//fetchh al data
exports.fetchbook = (req, res) => {
  db.query('SELECT * FROM newboook3', function(err, result) {
    if (err) {
      console.error('Failed to fetch books:', err.message);
      return res.status(500).send('Something went wrong');
    }
    res.json(result);
  });
};

// update the data
exports.updatebook = (req, res) => {
  const id = req.params.id; // 👈 Corrected this line
  const { title, author, price } = req.body;

  db.query('UPDATE newboook3 SET title=?, author=?, price=? WHERE id=?', [title, author, price, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.send("Updated");
    }
  });
};
//delete
exports.deletebook = (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM newboook3 WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Failed to delete book:', err.message);
      return res.status(500).json({ error: 'Database deletion error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  });
};



