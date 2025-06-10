const express = require('express');
const router = express.Router();
const {
  createApplication,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/applicationsController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   POST api/applications
// @desc    Apply for a scheme
// @access  Private
router.post('/', auth, createApplication);

// @route   GET api/applications/my-applications
// @desc    Get user's applications
// @access  Private
router.get('/my-applications', auth, getMyApplications);

// @route   GET api/applications
// @desc    Get all applications (Admin)
// @access  Private/Admin
router.get('/', [auth, admin], getAllApplications);

// @route   PUT api/applications/:id
// @desc    Update application status (Admin)
// @access  Private/Admin
router.put('/:id', [auth, admin], updateApplicationStatus);

// @route   DELETE api/applications/:id
// @desc    Delete an application
// @access  Private
router.delete('/:id', auth, deleteApplication);

module.exports = router; 