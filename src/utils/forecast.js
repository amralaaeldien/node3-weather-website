const request = require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

function forecast(longitude, latitude, callback) {
    const url = "https://api.weatherstack.com/current?access_key=f218da55bbfd73f6ab0c364649bfaa13&query=" + latitude + "," + longitude + "&units=f"
    request({ url, json: true }, (error, request) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (request.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = request.body.current
            callback(undefined, `${data.weather_descriptions[0]}. it's currently ${data.temperature} degrees out but feels like ${data.feelslike}`)
        }
    })

}

module.exports = forecast;