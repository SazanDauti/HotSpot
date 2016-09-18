'use strict'

let mongoose = require('mongoose')

let PathSchema = mongoose.Schema({
  _id: String,
  begin: String,
  end: String,
  user: String
})

module.exports = mongoose.model('Path', PathSchema, 'paths')
