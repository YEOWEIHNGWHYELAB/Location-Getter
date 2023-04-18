const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the JWT token from the cookie
  const token = req.cookies.jwt;

  // if token is not found, return 401 unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }

  try {
    // verify token with secret key
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err)
        return res.status(403).send({ errorMsg: "Invalid login token provided, please relogin" });

      req.user = req.cookies.username;

      next();
    });
  } catch (error) {
    // if token is invalid, return 403 forbidden error
    return res.status(403).json({ message: 'Forbidden access.' });
  }
};

module.exports = authMiddleware;
