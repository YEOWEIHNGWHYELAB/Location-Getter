const Location = require('../models/Location');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public/views/location.html'));
});

router.get('', authMiddleware, async (req, res) => {
  const { username } = req.cookies.username;

  // Get the user's location from the database
  const location = await Location.findOneByUsername(username);

  if (!location) {
    return res.status(404).json({ message: 'Location not found' });
  }

  return res.status(200).json({ location });
});

router.get('', authMiddleware, async (req, res) => {
  const { latitude, longitude } = req.body;
  const { username } = req.user;

  // Save the user's location to the database
  const location = await Location.create({ username, latitude, longitude });

  return res.status(201).json({ location });
});

module.exports = router;
