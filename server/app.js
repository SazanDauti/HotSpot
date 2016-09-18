'use strict'

let express    = require('express')
let bodyParser = require('body-parser')
let mongoose   = require('mongoose')
let request    = require('request-promise')
let uuid       = require('node-uuid');

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

app.get('/addPlace', (req, res) => {
  let id = req.query.id
  let name = req.query.name
  let image = req.query.image

  let doc = new Place({ _id: id, name: name, image: image, lat: 0, long: 0 })
  doc.save()
  res.status(200).send('done')
})

app.get('/addVisit', (req, res) => {
  let id = uuid.v1()
  let place = req.query.place
  let user = req.query.user

  let doc = new Visit({ _id: id, place: place, user: user })
  doc.save()
  res.status(200).send('done')
})

app.get('/addPath', (req, res) => {
  let id = uuid.v1()
  let begin = req.query.begin
  let end = req.query.end
  let user = req.query.user

  let doc = new Path({ _id: id, begin: begin, end: end, user: user })
  doc.save()
  res.status(200).send('done')
})

app.get('/getArea', (req, res) => {
  let lat = req.query.lat
  let long = req.query.long
  return Promise.resolve(getClosestSpots(lat, long, 20))
  .then((placeIds) => {
    let placeQueries = []
    placeIds.forEach((placeId) => {
      placeQueries.push(Promise.resolve(getPlaceInfo(placeId, placeIds)))
    })
    return Promise.all(placeQueries)
  })
  .then((placeInfo) => {
    res.status(200).json(placeInfo)
  })
  .catch((err) => {
    console.error(err)
    res.status(500).send(false)
  })
})

app.get('/pingData', (req, res) => {
  let user = req.query.uid
  let lat = req.query.lat
  let long = req.query.long
  let begin = ''
  let end = ''
  return Promise.resolve(getClosestSpots(lat, long, 1))
  .then((placeId) => {
    end = placeId
    let doc = new Visit({ _id: uuid.v1(), place: placeId, user: user })
    return doc.save()
  })
  .then((resp) => {
    return User.findOne({ _id: user })
  })
  .then((doc) => {
    if (doc === null) {
      let val = new User({ _id: user, place: end })
      return val.save()
    } else {
      begin = doc.place
      if (begin == end) {
        return true
      }
      else {
        let otherVal = new Path({ _id: uuid.v1(), begin: begin, end: end, user: user })
        return otherVal.save()
      }
    }
  })
  .then((resp) => {
    if (begin != end) {
      return User.update(
        { _id: user },
        { $set: { place: end }}
      )
    }
    return true
  })
  .then((resp) => {
    res.status(200).send(true)
  })
})

let getPlaceInfo = (placeId, placeIds) => {
  let obj = {}
  return Place.findOne({ _id: placeId })
  .then((placeInfo) => {
    obj = JSON.parse(JSON.stringify(placeInfo))
    let timestamp = new Date(Date.now() - 1 * 60 * 60 * 1000)
    return Visit.count({ place: placeInfo._id, time: { $gt: timestamp }})
  })
  .then((hotness) => {
    obj.hotness = hotness
    return obj
  })
  .then((placeInfo) => {
    let pathQueries = []
    placeIds.forEach((placeId) => {
      pathQueries.push(Promise.resolve(getPathCount(placeInfo._id, placeId)))
    })
    return Promise.all(pathQueries)
  })
  .then((paths) => {
    let compare = (a, b) => {
      if (a.paths < b.paths)
        return 1;
      if (a.paths > b.paths)
        return -1;
      return 0
    }
    paths.sort(compare)
    obj.links = paths.slice(0, 3)
    return obj
  })
  .then((placeInfo) => {
    let endPlaceQueries = []
    placeInfo.links.forEach((link) => {
      endPlaceQueries.push(Promise.resolve(getEndPlaceInfo(link.paths, link.endId)))
    })
    return Promise.all(endPlaceQueries)
  })
  .then((links) => {
    obj.links = links
    return obj
  })
}

let getEndPlaceInfo = (paths, endId) => {
  return Place.findOne({ _id: endId })
  .then((placeInfo) => {
    return { paths: paths, end: placeInfo }
  })
}

let getPathCount = (beginId, endId) => {
  let sum = 0
  let timestamp = new Date(Date.now() - 1 * 60 * 60 * 1000)
  return Path.count({ begin: beginId, end: endId, time: { $gt: timestamp } })
  .then((resp) => {
    sum = sum + resp
    return Path.count({ begin: endId, end: beginId, time: { $gt: timestamp } })
  })
  .then((resp) => {
    sum = sum + resp
    return { paths: sum, endId: endId }
  })
}

let getClosestSpots = (lat, long, num) => {
  let vals = ['2', '2', '3', '4']
  return vals.slice(0, num);
}

app.listen(7070, (err) => {
  if (err) console.error(err)
  console.log('Listening on port 7070')
})
