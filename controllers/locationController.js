const Location = require('../models/Location');

exports.getLocation = async (req, res) => {
  const { username } = req.user;
  // Get the user's location from the database
  const location = await Location.findOne({ where: { username } });
  if (!location) {
    return res.status(404).json({ message: 'Location not found' });
  }
  return res.status(200).json({ location });
};

exports.addLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  const { username } = req.user;
  // Save the user's location to the database
  const location = await Location.create({ username, latitude, longitude });
  return res.status(201).json({ location });
};
