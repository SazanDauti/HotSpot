'use strict'

let mongoose = require('mongoose')

let VisitSchema = mongoose.Schema({
  _id: String,
  place: String,
  user: String
})

module.exports = mongoose.model('Visit', VisitSchema, 'visits')
