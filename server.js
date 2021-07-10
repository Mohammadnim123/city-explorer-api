'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const getWeather = require('./modules/weather')
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3111;
const moviesHandler = require('./modules/movies')



app.get('/', (req, res) => {
    res.send('home page')
})

app.get('/weatherr', weatherHandlerr)
app.get('/weather', weatherHandler)
app.get('/movies', moviesHandler)

function weatherHandlerr(req, res) {
    res.send(weather)
}

function weatherHandler(req, res) {
    let { lat, lon } = req.query
    console.log(lat,lon);
    getWeather(lat,lon).then(result =>{
        res.send(result)
    })


}



app.get('*', errorHandler)

function errorHandler(error, response) {
    // console.log(error);
    response.status(500).send('something went wrong');
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));