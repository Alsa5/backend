const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scheme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

// Prevent a user from applying to the same scheme more than once
ApplicationSchema.index({ user: 1, scheme: 1 }, { unique: true });


module.exports = mongoose.model('Application', ApplicationSchema); 