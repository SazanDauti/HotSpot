'use strict'

let express     = require('express')
let bodyParser  = require('body-parser')
let mongoose    = require('mongoose')
let request     = require('request-promise')
let uuid        = require('node-uuid')
let httpRequest = require('request')

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

app.get('/pingData', (req, res) => {
  let user = req.query.uid
  let lat = req.query.lat
  let long = req.query.long
  let begin = ''
  let end = ''
  return Promise.resolve(getNearByPlaces(lat, long, 1))
  .then((place) => {
    place = place[0]
    end = place.id
    let doc = new Visit({ _id: uuid.v1(), place: place.id, user: user })
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

app.get('/getArea', (req, res) => {
  let lat = req.query.lat
  let long = req.query.long
  return Promise.resolve(getNearByPlaces(lat, long, 20))
  .then((places) => {
    let placeQueries = []
    places.forEach((place) => {
      placeQueries.push(Promise.resolve(getPlaceInfo(place, places)))
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

let getPlaceInfo = (place, places) => {
  let obj = {}
  return Place.findOne({ _id: place.id })
  .then((placeInfo) => {
    if (placeInfo === null) {
      let item = new Place({ _id: place.id, name: place.name, image: place.photoUrl, lat: place.location.lat, long: place.location.lng })
      item.save()
      obj = JSON.parse(JSON.stringify(place))
      return 0
    }
    obj = JSON.parse(JSON.stringify(placeInfo))
    return Visit.count({ place: placeInfo._id })
  })
  .then((hotness) => {
    obj.hotness = hotness
    return obj
  })
  .then((placeInfo) => {
    let pathQueries = []
    places.forEach((place) => {
      pathQueries.push(Promise.resolve(getPathCount(placeInfo._id, place.id)))
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
  return Path.count({ begin: beginId, end: endId })
  .then((resp) => {
    sum = sum + resp
    return Path.count({ begin: endId, end: beginId })
  })
  .then((resp) => {
    sum = sum + resp
    return { paths: sum, endId: endId }
  })
}

let getNearByPlaces = (lat, lng, number) => {
  return request({
    method: 'GET',
    headers: {
      'Accept':'application/json'
    },
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    rankby: 'distance',
    qs: {
      location: lat + ',' + lng,
      radius: 1000,
      key: 'AIzaSyBFhQbasg2vWSyfmS8zL4LdOUeCm4xofRI'
    }
  })
  .then((res) => {
    let body = JSON.parse(res)
    var result = body.results.map(function(obj){

      var reference = ''
      var url = ''

      if (obj.photos !== undefined) {
        reference = obj.photos[0].photo_reference
        url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + reference + "&sensor=false&key=AIzaSyBFhQbasg2vWSyfmS8zL4LdOUeCm4xofRI"
      }

      return {
        id: obj.id,
        location: obj.geometry.location,
        name: obj.name,
        photoUrl: url
      }
    });
    return result.splice(1, number + 1);
  })
}

app.listen(7070, (err) => {
  if (err) console.error(err)
  console.log('Listening on port 7070')
})
