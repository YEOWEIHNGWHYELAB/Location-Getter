const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, locationController.getLocation);
router.post('/', authMiddleware, locationController.addLocation);

module.exports = router;
