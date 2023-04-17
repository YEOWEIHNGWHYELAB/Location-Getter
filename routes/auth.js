const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const path = require('path');

router.get('', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public/views/login.html'));
});

router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
