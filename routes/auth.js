const express = require('express');
const router = express.Router();
const cookie = require('cookie');
const path = require('path');
const User = require('../models/User');

router.get('', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public/views/login.html'));
});

//router.post('/login', authController.login);
//router.post('/logout', authController.logout);

// POST new user registration
router.post('', async (req, res) => {
    try {
        // Verify username and password
        const user = await User.findOneByUsername({ where: { username: req.body.username } });

        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials username' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Create a JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    
        // Set the token in a cookie and send the response
        res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development', // Set to true in production
          sameSite: 'strict',
          maxAge: 86400, // Expires in 24 hours
          path: '/',
        }));

        res.status(200).json({ message: 'Logged in successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

module.exports = router;
