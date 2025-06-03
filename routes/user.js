const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

// Create a new user
router.post('/createUser', controller.createUser);
router.get('/getUsers', controller.getUsers);

// Get all users (if you wanna add this back)
// router.get('/', controller.getUsers);

module.exports = router;
