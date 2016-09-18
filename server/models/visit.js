'use strict'

let mongoose = require('mongoose')

let VisitSchema = mongoose.Schema({
  _id: String,
  place: String,
  user: String,
  time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Visit', VisitSchema, 'visits')
