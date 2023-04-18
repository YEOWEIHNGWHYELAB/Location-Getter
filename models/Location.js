const { Model } = require('objection');

class Location extends Model {
  static get tableName() {
    return 'locations';
  }

  static async findOneByUsername(username) {
    const { rows } = await pool.query(
      'SELECT * FROM locations WHERE username = $1', 
      [username]);

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
