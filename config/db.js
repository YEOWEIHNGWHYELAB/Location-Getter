const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DATABASE_USER.toString(),
  host: process.env.DATABASE_HOST.toString(),
  database: process.env.DATABASE_NAME.toString(),
  password: process.env.DATABASE_PASSWORD.toString(),
  port: process.env.DATABASE_PORT.toString(),
});

pool.connect((err, client, done) => {
  if (err) 
    throw err;
  
  console.log(`Connected to database: ${process.env.DATABASE_NAME.toString()}`);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
