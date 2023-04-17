const jwt = require('jsonwebtoken');

const { secret } = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // get token from request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // if token is not found, return 401 unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }

  try {
    // verify token with secret key
    const decoded = jwt.verify(token, secret);

    // add decoded user information to request object
    req.user = decoded;

    // call next middleware
    next();
  } catch (error) {
    // if token is invalid, return 403 forbidden error
    return res.status(403).json({ message: 'Forbidden access.' });
  }
};

module.exports = authMiddleware;
