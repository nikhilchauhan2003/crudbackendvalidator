const express = require('express');
const router = express.Router();
const { updateUserDetails,getUsersWithHobbies, signupUser, loginUser, getAllUsers } = require('../controller/user.controller.js');
const authMiddleware = require('../auth.middleware.js');

router.get('/', authMiddleware, getAllUsers);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/dashboard', authMiddleware, getUsersWithHobbies);  // <-- Added authMiddleware here
router.put('/users', authMiddleware,updateUserDetails);

module.exports = router;
