'use strict'

let mongoose = require('mongoose')

let PlaceSchema = mongoose.Schema({
  _id: String,
  lat: Number,
  long: Number,
  image: String,
  name: String
})

module.exports = mongoose.model('Place', PlaceSchema, 'places')
