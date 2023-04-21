const express = require('express');
const router = express.Router();
const cookie = require('cookie');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public/views/login.html'));
});

// POST logout current user
router.post('/logout', async (req, res) => {
  res.clearCookie('jwt');
  res.clearCookie('username');
  return res.redirect('/auth');
});

// POST curret user login 
router.post('', async (req, res) => {
    try {
        // Verify username and password
        const user = await User.findOneByUsername(req.body.username);

        if (!user) {
          return res.redirect('/auth');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
          return res.redirect('/auth');
        }
    
        // Create a JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    
        // Set the token in a cookie and send the response
        res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development', // Set to true in production
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000, // Expires in 24 hours
          path: '/',
        }));

        res.cookie("username", req.body.username, { maxAge: 24 * 60 * 60 * 1000 });

        res.redirect('/location');
      } catch (error) {
        console.error(error);
        res.redirect('/auth');
      }
});

module.exports = router;
