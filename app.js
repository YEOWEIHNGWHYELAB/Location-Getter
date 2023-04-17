const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

const db = require('./config/db'); // import db.js
const User = require('./models/User'); // import User model
const Location = require('./models/Location'); // import Location model

// create a connection to the database
// db.connect();

const port = process.env.PORT || 3000;

// Import routes
const authRoute = require('./routes/auth');
const locationRoute = require('./routes/location');
const registerRoute = require('./routes/register');

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');

// Set up body parser and cookie parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/auth', authRoute);
app.use('/register', registerRoute);
app.use('/location', authMiddleware, locationRoute);

// Handle undefined routes
app.use((req, res, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});

// Handle errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Print out the list of available routes
const router = express.Router();
router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`${Object.keys(middleware.route.methods)} -> ${middleware.route.path}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
