const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
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
