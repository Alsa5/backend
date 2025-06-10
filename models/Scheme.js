const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  registrationLink: {
    type: String,
  },
  guidelines: String,
  trainingSectors: [String],
  ngos: [{
      name: String,
      location: String,
      courseDetails: String,
  }],
  fundingNorms: String,
  faqs: [{
      question: String,
      answer: String,
  }],
});

module.exports = mongoose.model('Scheme', SchemeSchema); 