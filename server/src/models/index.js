// include all of your models here using CommonJS requires
const User = require("./User.js")
const FilmsList = require('./FilmsList.js')
const WatchList = require('./WatchList.js')
const Review = require('./Review.js')

module.exports = {User, FilmsList, WatchList, Review};
