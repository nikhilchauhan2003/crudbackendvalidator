const jwt = require('jsonwebtoken');//Yeh JWT package ko import karta hai, jiska kaam hota hai token banana aur verify karna

module.exports = (req, res, next) => {//Yeh ek middleware function hai. Isse hum routes ke beech mein use karte hain token check karne ke liye.
  const token = req.headers.authorization?.split(' ')[1];// Ye line request ke header se token nikaalti hai.   split(' ') se yeh 2 part mein divide hota hai:
  if (!token) return res.status(401).json({ message: 'Access denied' });
// Agar token nahi mila:

//Server bolega: "Access denied"
  try {
    const user = jwt.verify(token, 'your_jwt_secret');//Token sahi hai? ✅ Toh usse user ki info milti hai.
    req.user = user; // attach user info to request  Ab milne wali user info ko req.user mein store kar lete hain, jisse aage ke route mein use kar sakein.
    next();// Sab kuch sahi mila? Toh request ko aage bhej do (next route pe).
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
 