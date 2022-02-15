const Model = require('./Model')

class FilmsList extends Model{
  static get tableName() {
    return 'filmlists'
  }

  static relationMappings(){
    const User = require('./User.js')
    
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'filmlists.userId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = FilmsList 