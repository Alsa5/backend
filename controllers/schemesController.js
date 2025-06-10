const Scheme = require('../models/Scheme');

// Get all schemes
exports.getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get single scheme
exports.getScheme = async (req, res) => {
    try {
      const scheme = await Scheme.findById(req.params.id);
      if (!scheme) {
        return res.status(404).json({ msg: 'Scheme not found' });
      }
      res.json(scheme);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Add a new scheme
exports.addScheme = async (req, res) => {
  const { name, description, eligibility, registrationLink, guidelines, trainingSectors, ngos, fundingNorms, faqs } = req.body;

  try {
    const newScheme = new Scheme({
        name,
        description,
        eligibility,
        registrationLink,
        guidelines,
        trainingSectors,
        ngos,
        fundingNorms,
        faqs
    });

    const scheme = await newScheme.save();
    res.json(scheme);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a scheme
exports.updateScheme = async (req, res) => {
  try {
    let scheme = await Scheme.findById(req.params.id);
    if (!scheme) return res.status(404).json({ msg: 'Scheme not found' });

    scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(scheme);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a scheme
exports.deleteScheme = async (req, res) => {
  try {
    let scheme = await Scheme.findById(req.params.id);
    if (!scheme) return res.status(404).json({ msg: 'Scheme not found' });

    await Scheme.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Scheme removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 