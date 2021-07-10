const axios = require('axios');

function getWeather(lat, lon) {
    

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    return axios.get(url)
        .then(result => {
            let newForcast = result.data.data.map(elem => {
                return new Forecast(elem)
            })
            return newForcast
            
        }).catch((err,res)=>{
            res.send(err)
        })

}



function Forecast(obj) {
    this.description = obj.weather.description;
    this.date = obj.valid_date;
}

module.exports=getWeather