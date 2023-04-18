const Location = require('../models/Location');
const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

router.get('', authMiddleware, function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public/views/location.html'));
});

router.get('', authMiddleware, async (req, res) => {
  const username = req.cookies.username;

  // Get the user's location from the database
  const location = await Location.findByUsername(username);
  
  if (!location) {
    return res.status(404).json({ message: 'Location not found' });
  }

  return res.status(200).json({ location });
});

router.post('', authMiddleware, async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const username = req.user;

    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);

    // Save the user's location to the database
    const location = await Location.addLocation(username, lat, long);

    return res.status(201).json({ location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading location' });
  }
});

module.exports = router;
