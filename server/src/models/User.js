/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");
const FilmsList = require("./FilmsList.js")
const WatchList = require("./WatchList.js")

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const FilmsList = require("./FilmsList.js")
    const WatchList = require("./WatchList.js")
    const Review = require("./Review.js")


    return {

      filmslists: {
        relation: Model.HasManyRelation,
        modelClass: FilmsList,
        join: {
          from: "users.id",
          to: "filmslists.userId"
        }
      },
      watchlists: {
        relation: Model.HasManyRelation,
        modelClass: WatchList,
        join: {
          from: "users.id",
          to: "watchlists.userId"
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "users.id",
          to: "reviews.userId"
        }
      }
    }
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string", format: "email" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
