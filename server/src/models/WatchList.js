const Model = require('./Model')

class WatchList extends Model{
  static get tableName() {
    return 'watchlists'
  }

  static relationMappings() {
    const User = require('./User.js')
    
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'watchlists.userId',
          to: 'users.id'
        }
      }
    }
  }

}

module.exports = WatchList 