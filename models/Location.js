const { Model } = require('objection');

class Location extends Model {
  static get tableName() {
    return 'locations';
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
