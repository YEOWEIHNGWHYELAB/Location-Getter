// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

const jwt = require('jsonwebtoken');
const { secret } = process.env.JWT_SECRET;

function generateToken(user) {
  // Create a payload object containing the user ID
  const payload = {
    user: {
      id: user.id
    }
  };

  // Sign the JWT token with the payload and secret
  const token = jwt.sign(payload, secret, {
    expiresIn: '1h'
  });

  return token;
}

module.exports = {
  generateToken
};
