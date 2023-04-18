const { Pool } = require("pg");
const fs = require('fs');
const path = require('path');

// Get the absolute path to the SQL script file
const sqlScriptPath = path.join(__dirname, 'createTable.sql');

// Read the SQL script file
const sqlScript = fs.readFileSync(sqlScriptPath).toString();

const pool = new Pool({
  user: process.env.DATABASE_USER.toString(),
  host: process.env.DATABASE_HOST.toString(),
  database: process.env.DATABASE_NAME.toString(),
  password: process.env.DATABASE_PASSWORD.toString(),
  port: process.env.DATABASE_PORT.toString(),
});

pool.connect()
  .then(() => {
    // Execute the SQL script
    pool.query(sqlScript)
      .then(() => {
        console.log('SQL initializer script executed successfully');
      })
      .catch((err) => {
        console.error('Error executing SQL script', err);
      })
      .finally(() => {
        // Close the database connection
        pool.end();
      });

    console.log(`Connected to database: ${process.env.DATABASE_NAME.toString()}`);
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
