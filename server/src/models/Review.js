const Model = require('./Model.js')

class Review extends Model {
    static get tableName() {
        return 'reviews'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'rating', 'body'],
            properties: {
                title: { type: 'string' },
                rating: { type: ['string','integer'], minimum: 1, maximum: 10 },
                body: { type: 'string' }
            }
        }
    }

  static get relationMappings() {
    const User = require("./User.js")

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id"
        }
      }
    }
  }
  }

module.exports = Review