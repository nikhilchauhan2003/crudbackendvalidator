const db = require('../db');
const bcrypt = require('bcryptjs');//Password ko securely encrypt/compare karne ke liye
const jwt = require('jsonwebtoken');//JWT token banane aur verify karne ke liye

// Get all users (example endpoint)
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, name, email FROM users';// Database se user list nikaalne ke liye SQL query banayi gayi hai.
  console.log(sql, 'isMatchisMatch');
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
  console.log("SQL:", sql);

};



// Signup new user
exports.signupUser = async (req, res) => {
  const { name, email, password } = req.body;// Client se aane wala data: name, email, password

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);// Password ko hash (encrypt) karte ho — jisse ki plain password database mein save na ho.

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Database error', error: err });
    }

    res.status(201).json({ message: 'Signup successful', userId: result.insertId });
  });
};



// Login user
exports.loginUser = (req, res) => {// User ke login ke liye email aur password liya gaya
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';// Database mein check kar rahe ho ki email exist karta hai ya nahi
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const user = results[0];

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);//Yeh bcrypt.compare() use karke dekhta hai ki user ka entered password aur database wala hashed password match karte hain ya nahi.
    
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });//error bta do
    }

    // Generate JWT token
    const token = jwt.sign(// Agar password sahi hai, toh JWT token create karo:
      { userId: user.id, email: user.email },//Token mein store hoga: userId aur email
      'your_jwt_secret', 
      { expiresIn: '1h' }//Token expire hoga: 1 hour mein
    );

    res.status(200).json({//Agar sab sahi hai:
      message: 'Login successful',//Success message
      token,
      user: { id: user.id, name: user.name, email: user.email }//User details
    });
  });
};


//user
  exports.getUsersWithHobbies = (req, res) => {
    const sql = `
      SELECT 
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        uh.hobby
      FROM users u
      LEFT JOIN users_hobbies uh ON u.id = uh.user_id
      WHERE u.id = ?;
    `;

    db.query(sql, [req.user.userId], (err, results) => {
      if (err) {
        console.error("Error fetching users with hobbies:", err);
        return res.status(500).json({ message: 'Database error', error: err });
      }

    
      res.status(200).json({
        message: 'Users with hobbies fetched successfully',
        data: results
      });
    });
  };


  // exports.updateUserDetails = (req, res) => {
  //   // Check if req.user exists
  //   if (!req.user) {
  //     return res.status(401).json({ message: "Unauthorized: user data missing." });
  //   }

  //   const { userId } = req.user;
  //   const { name, email, hobby } = req.body;

  //   const query1 = "UPDATE users SET name = ?, email = ? WHERE id = ?;";
  //   const query2 = "UPDATE users_hobbies SET hobby = ? WHERE user_id = ?;";

  //   db.query(query1, [name, email, userId], (err, result) => {
  //     if (err) {
  //       return res.status(400).json({ message: "Error updating users table." });
  //     }

  //     db.query(query2, [hobby, userId], (err, result) => {
  //       if (err) {
  //         return res.status(400).json({ message: "Error updating users_hobbies table." });
  //       }

  //       return res.status(200).json({ message: "Details updated successfully." });
  //     });
  //   });
  // };

 // controller/user.controller.js


exports.updateUserDetails = (req, res) => {
  // 1️⃣ Ensure user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: user data missing." });
  }

  const { userId } = req.user;
  const { name, email, hobby } = req.body;

  // 2️⃣ Define your queries
  const query1 = "UPDATE users SET name = ?, email = ? WHERE id = ?;";
  const query2 = "UPDATE users_hobbies SET hobby = ? WHERE user_id = ?;";

  // 3️⃣ Update users table
  db.query(query1, [name, email, userId], (err) => {
    if (err) {
      return res.status(400).json({ message: "Error updating users table." });
    }

    // 4️⃣ Update hobbies table
    db.query(query2, [hobby, userId], (err) => {
      if (err) {
        return res.status(400).json({ message: "Error updating users_hobbies table." });
      }

      // 5️⃣ Broadcast the change
      req.io.emit('hobbyUpdated', { userId, name, email, hobby });

      // 6️⃣ Send the HTTP response
      return res.status(200).json({ message: "Details updated successfully." });
    });
  });
};

// …export your other controllers (signupUser, loginUser, etc.) here…


//   exports.updateUserDetails = (req, res) => {
//   // … your existing auth check and DB updates …

//   db.query(query2, [hobby, userId], (err, result) => {
//     if (err) {
//       return res.status(400).json({ message: "Error updating users_hobbies table." });
//     }

//     // ← emit the real-time update
//     req.io.emit('hobbyUpdated', {
//       userId,
//       hobby
//     });

//     return res.status(200).json({ message: "Details updated successfully." });
//   });
// };
