const Model = require('./Model')

class FilmsList extends Model{
  static get tableName() {
    return 'filmslists'
  }

  static relationMappings(){
    const User = require('./User.js')
    
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'filmslists.userId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = FilmsList 