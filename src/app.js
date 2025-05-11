const express = require('express');
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express();

app.set('view engine', 'hbs')
const staticDirs = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath)
app.use(express.static(staticDirs))
hbs.registerPartials(partialsPath)

app.get('/help/*', (req, res) => {
    res.render("help.hbs", {
        error: 'this help page is not found'
    })
})

app.get('/weather', (req, res) => {
    address = req.query.address
    if (address) {
        geocode(address, (error, data) => {
    
            if(error) {
                return res.send({'Error': error})
            }
        
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if (error) return res.send({'Error': error})
                res.send({
                    full_address: data.full_address,
                    entred_address: address,
                    forecast : forecastData
                })
              })
        })
            
    } else {
        res.send({ 'error': 'please provide an address'})
    }
})

app.get('', (req, res) => {
    res.render("index.hbs", {title: 'title of page (index)', name: 'Amr'})
})

app.get('*', (req, res) => {
    res.render("help.hbs", {
        error: 'this page is not found'
    })
})

app.listen('3000', () => {
    console.log('happening')
})