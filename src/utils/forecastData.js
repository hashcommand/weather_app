const { url } = require('inspector');
const request = require('request');

const getWeatherData = (locKey, callback) => {
    const accuWeatherAPI = "http://dataservice.accuweather.com/currentconditions/v1/"+ locKey +"?apikey=UEcqLzfdz2pE1MKHirvbrJt3CcYD5Xk0&details=true";
    const fetchData = request({url:accuWeatherAPI, json:true}, (error,response)=>{
        if(error)
        {
            callback(error,undefined);
        }
        else if(response.body.Message)
        {
            callback(error, undefined);
        }
        else
        {
            console.log(accuWeatherAPI);
            data = {
                LocalObservationDateTime : response.body[0].LocalObservationDateTime,
                HasPrecipitation : response.body[0].HasPrecipitation,
                temp : response.body[0].Temperature.Metric.Value,
                IsDayTime : response.body[0].IsDayTime
            }
            callback(undefined, data);
        }
    })
}

module.exports = getWeatherData;