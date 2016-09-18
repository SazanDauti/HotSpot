
var http = require('http');
function getNearByPlaces(lat, lng, number){
    http.get({
        host: 'maps.googleapis.com',
        path: '/maps/api/place/nearbysearch/json?location=' + lat.toString() + ',' + lng.toString() + '&radius=500&type=restaurant&key=AIzaSyBFhQbasg2vWSyfmS8zL4LdOUeCm4xofRI'
    }, function(response) {

        var result = response.results.map(function(obj){
            var urlattr = obj.photos[0].html_attributions;
            return {
                id: obj.id,
                location: obj.location,
                name: obj.name,
                photoUrl: urlattr.splice(urlattr.slice(urlattr.indexOf('http'), urlattr.indexOf('">')))
            }
        });

        return result.splice(0, number);
    });
}
module.export = {
    getNearByPlaces: getNearByPlaces
}