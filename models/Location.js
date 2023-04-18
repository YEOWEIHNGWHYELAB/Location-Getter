const { Model } = require('objection');
const pool = require('../config/db');

class Location extends Model {
  static get tableName() {
    return 'locations';
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      'SELECT * FROM locations WHERE username = $1', 
      [username]);

    return rows;
  }

  static async addLocation(username, lat, long) {
    const { rows } = await pool.query(
      'INSERT INTO locations (username, latitude, longitude) VALUES ($1, $2, $3) RETURNING *', 
      [username, lat, long]);

    return rows[0];
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'locations.username',
          to: 'users.username',
        },
      },
    };
  }
}

module.exports = Location;
