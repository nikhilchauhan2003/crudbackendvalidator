const db = require('../db');

// ============================
// GET all books
// ============================
exports.getAllBook = (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(result); // Send all books
  });
};


exports.getBooksById = (req, res) => {//selcted only one
  const bookId = req.params.id;

  const sql = 'SELECT * FROM books WHERE id = ?';
  db.query(sql, [bookId], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.json(results[0]); // Return the first matched book
  });
};


exports.createBook = (req, res) => {
  const { name, author, price, pages } = req.body;

  // Validation
  if (!name || !author || !price || !pages) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO books (name, author, price, pages) VALUES (?, ?, ?, ?)';
  const values = [name, author, price, pages];

  db.query(sql, values, (err, result) => {
    if (err) {
      if (err) {
        return res.status(400).json({ message: 'Book name must be unique',error: err });
      }
      res.status(201).json({
        message: 'Book created successfully',
        bookId: result.insertId
      });
    }

  });
};



exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const { name, author, price, pages } = req.body;

  const sql = 'UPDATE books SET name = ?, author = ?, price = ?, pages = ? WHERE id = ?';
  const values = [name, author, price, pages, bookId];

  db.query(sql, values, (err, result) => {
    if (err) {
  
      if (err) {
        return res.status(400).json({ message: 'Book name must be unique', error: err });
      }
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully' });
  });
};

exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  const sql = 'DELETE FROM books WHERE id = ?';

  db.query(sql, [bookId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  });
};

