const axios = require('axios');

const weatherStorage = {};

function getWeather(lat, lon) {
    
    if(weatherStorage[`${lat},${lon}`] !== undefined){
        console.log('cached weather');
        setTimeout(function(){ return; }, 3000);
        return weatherStorage[`${lat},${lon}`]
    }

    else{
    console.log('not cached weather');
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    return axios.get(url)
        .then(result => {
            let newForcast = result.data.data.map(elem => {
                return new Forecast(elem)
            })
            weatherStorage[`${lat},${lon}`] = newForcast
            return newForcast
            
        })
    }
}



function Forecast(obj) {
    this.description = obj.weather.description;
    this.date = obj.valid_date;
}

module.exports=getWeather