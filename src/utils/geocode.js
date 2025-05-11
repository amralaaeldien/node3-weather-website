const request = require('request');


function geocode(address, callback) {
    console.log(2, "geocode func")
    const url = "https://api.mapbox.com/search/geocode/v6/forward?q=" + encodeURIComponent(address) + "&access_token=pk.eyJ1IjoiYW1yc2hlZG91IiwiYSI6ImNtYTRzZXhoazA5ZDUya3NnOWtvcWdvN24ifQ.l3wxOpVMq4BwIlrDVcifcg&limit=1"
    request({url: url, json: true}, (error, response) => {
        if ( error){
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback("wrong location was entered", undefined)
        } else {
            const data = response.body.features[0].properties
            callback(undefined, {
                full_address: data.full_address,
                longitude: data.coordinates.longitude,
                latitude: data.coordinates.latitude
            })
        }
    })
}

module.exports = geocode