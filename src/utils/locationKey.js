const { url } = require('inspector');
const request = require('request');

const getLocationKey = (long, lat, callback)=>{
    const accuWeatherAPI = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=UEcqLzfdz2pE1MKHirvbrJt3CcYD5Xk0&q="+long+"%2C"+lat;
    const locationKey = request({url:accuWeatherAPI, json:true}, (error, response)=>{
        if(error)
        {
            callback(error, undefined);
        }
        else if(response.body.Message)
        {
            callback(response.body.Message, undefined);
        }
        else
        {
            callback(undefined, response.body.Key);
        }      
    })   
}

module.exports = getLocationKey;