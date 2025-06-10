const Application = require('../models/Application');

// Create a new application
exports.createApplication = async (req, res) => {
  try {
    const { schemeId } = req.body;
    const userId = req.user.id;

    // Check if application already exists
    const existingApplication = await Application.findOne({ user: userId, scheme: schemeId });
    if (existingApplication) {
      return res.status(400).json({ msg: 'You have already applied for this scheme' });
    }

    const newApplication = new Application({
      user: userId,
      scheme: schemeId,
    });

    const application = await newApplication.save();
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get applications for the logged-in user
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate('scheme', ['name', 'description'])
      .sort({ appliedDate: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all applications (Admin)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('user', ['name', 'email'])
      .populate('scheme', ['name'])
      .sort({ appliedDate: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update application status (Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an application
exports.deleteApplication = async (req, res) => {
    try {
      const application = await Application.findById(req.params.id);
  
      if (!application) {
        return res.status(404).json({ msg: 'Application not found' });
      }
  
      // Check if the user owns the application or is an admin
      if (application.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await application.deleteOne();
  
      res.json({ msg: 'Application removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Application not found' });
      }
      res.status(500).send('Server Error');
    }
}; 