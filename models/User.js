const { Model } = require('objection');
const pool = require('../config/db');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static async findOneByUsername(username) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username = $1', 
      [username]);

    return rows[0];
  }

  static async createUser({ username, hashPassword }) {
    const { rows } = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', 
      [username, hashPassword]);

    return rows[0];
  }

  static get relationMappings() {
    const Location = require('./Location');

    return {
      locations: {
        relation: Model.HasManyRelation,
        modelClass: Location,
        join: {
          from: 'users.username',
          to: 'locations.username',
        },
      },
    };
  }
}

module.exports = User;
