const express = require('express');
const router = express.Router();
const {
  getSchemes,
  getScheme,
  addScheme,
  updateScheme,
  deleteScheme,
} = require('../controllers/schemesController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all schemes
router.get('/', getSchemes);

// Get single scheme
router.get('/:id', getScheme);

// Add a new scheme
router.post('/', [auth, admin], addScheme);

// Update a scheme
router.put('/:id', [auth, admin], updateScheme);

// Delete a scheme
router.delete('/:id', [auth, admin], deleteScheme);

module.exports = router; 