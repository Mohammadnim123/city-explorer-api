'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const weather = require('./data/weather.json');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3111;
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

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    axios.get(url)
        .then(result => {
            let newForcast = result.data.data.map(elem => {
                return new Forecast(elem)
            })

            res.send(newForcast)
        })

}

function moviesHandler(req, res) {
    let { searchQuery } = req.query
    console.log(searchQuery);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
    axios.get(url)
        .then(result => {
            let newMovie = result.data.results.map(elem => {
                return new Movies(elem)
            })

            res.send(newMovie)
        }).catch(err =>{
            console.log(err);
            res.send(err)
        }

        )

}

function Forecast(obj) {
    this.description = obj.weather.description;
    this.date = obj.valid_date;
}

function Movies(obj){
    this.title= obj.title,
    this.overview= obj.overview,
    this.average_votes= obj.vote_average,
    this.total_votes= obj.vote_average,
    this.image_url= obj.poster_path || `https://st3.depositphotos.com/1322515/35964/v/1600/depositphotos_359648638-stock-illustration-image-available-icon.jpg`,
    this.popularity= obj.popularity,
    this.released_on= obj.release_date
}


app.get('*', errorHandler)

function errorHandler(error, response) {
    // console.log(error);
    response.status(500).send('something went wrong');
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));