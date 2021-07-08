'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3111;
app.get('/',(req,res)=>{
    res.send('home page')
})

app.get('/weatherr',weatherHandlerr)
app.get('/weather',weatherHandler)

function weatherHandlerr(req,res){
    res.send(weather)
}

function weatherHandler(req,res){
    let {searchQuery,lat,lon} = req.query
    let dataBySearchQuery = false;
    

    dataBySearchQuery = weather.find(elem=>{
    
        if(searchQuery.toLocaleLowerCase().includes(elem.city_name.toLocaleLowerCase()) || (elem.lat == lat && elem.lon == lon)){
            return elem
   }
    })

    let newForcast = dataBySearchQuery.data.map(elem=>{
        return new Forecast(elem)
    })

    res.send(newForcast)


}

function Forecast(obj){
    this.description = obj.weather.description;
    this.date = obj.valid_date;
}


app.get('*',errorHandler)

function errorHandler(error, response) {
    // console.log(error);
    response.status(500).send('something went wrong');
  }
  
  app.listen(PORT, () => console.log(`listening on ${PORT}`));