const express = require('express');
const router = express.Router();
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all users
router.get('/', [auth, admin], getUsers);

// Add a new user
router.post('/', [auth, admin], addUser);

// Update a user
router.put('/:id', [auth, admin], updateUser);

// Delete a user
router.delete('/:id', [auth, admin], deleteUser);

module.exports = router; 