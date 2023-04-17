const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOneByUsername({ where: { username: username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid Username or Password!' });
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid Username or Password' });
  }

  // Generate JWT token
  const token = jwtUtils.generateToken(user.toJSON());
  
  // Set the token in a cookie
  res.cookie('token', token, { httpOnly: true });

  return res.status(200).json({ message: 'Logged in successfully' });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
};
