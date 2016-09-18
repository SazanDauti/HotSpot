'use strict'

let mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
  _id: String,
  place: String,
  count: Number
})

module.exports = mongoose.model('User', UserSchema, 'users')
