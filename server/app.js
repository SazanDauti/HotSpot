'use strict'

let express    = require('express')
let bodyParser = require('body-parser')
let mongoose   = require('mongoose')
let request    = require('request-promise')

let Place = require('./models/place.js')
let User  = require('./models/user.js')
let Path  = require('./models/path.js')
let Visit = require('./models/visit.js')

require('./connect')()
mongoose.Promise = require('bluebird')

let app = express()
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname, 'public/index.html')
})

app.get('/getArea', (req, res) => {
  return Promise.resolve(getClosestSpots(3))
  .then((placeIds) => {
    let placeQueries = []
    placeIds.forEach((id) => {
      placeQueries.push(Place.findOne({ _id: id }).lean())
    })
    return Promise.all((placeQueries))
  .then((placeInfo) => {
    let hotnessQueries = []
    placeInfo.forEach((place) => {
      hotnessQueries.push(Visit.count({ place: place._id }))
    })
  })

    res.status(200).json(placeIds)
  })
  .catch((err) => {
    console.error(err)
    res.status(500).send(false)
  })
})

let getPlaceInfo = (placeId) => {
  obj = {}
  return Place.findOne({ _id: placeId }.lean())
  .then((placeInfo) => {
    obj = placeInfo
    let timestamp = new Date(Date.now() - 1 * 60 * 60 * 1000)
    return Visit.count({ place: placeInfo._id, timestamp: { $gt: timestamp }})
  })
  .then((hotness) => {
    obj.hotness = hotness
  })
}

let getPathCount = (beginId, endId) => {
  sum = 0
  let timestamp = new Date(Date.now() - 1 * 60 * 60 * 1000)
  return Path.count({ begin: beginId, end: endId, time, timestamp: { $gt: timestamp } })
  .then((resp) => {
    sum = sum + resp
    return Path.count({ begin: endId, end: beginId, timestamp: { $gt: timestamp } })
  })
  .then((resp) => {
    sum = sum + resp
    return (paths: sum, place: endId)
  })
}


let getClosestSpots = (num) => {
  let vals = ['1', '2', '3', '4']
  return vals.slice(0, num);
}

app.listen(8080, (err) => {
  if (err) console.error(err)
  console.log('Listening on port 8080')
})
