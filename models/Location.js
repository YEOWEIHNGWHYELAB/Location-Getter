const { Model } = require('objection');
const pool = require('../config/db');

class Location extends Model {
  static get tableName() {
    return 'locations';
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      'SELECT * FROM locations WHERE username = $1 ORDER BY timestamp DESC LIMIT 10', 
      [username]);

    return rows;
  }

  // It is advisable to upload the time of sending the location as there is 
  // a delay in receiving the location from the database
  static async addLocation(username, lat, long) {
    let now = new Date();

    // Add the offset to the current date to adjust for the +8 hour locale
    now.setTime(now.getTime() + 8 * 60 * 60 * 1000);

    const dateString = now.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');

    const { rows } = await pool.query(
      'INSERT INTO locations (username, latitude, longitude, timestamp) VALUES ($1, $2, $3, $4) RETURNING *', 
      [username, lat, long, dateString]);

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
