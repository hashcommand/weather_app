const { url } = require('inspector');
const request = require('request');

const getCords = (city_name, callback)=>{
    
    const mapboxAPI = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ city_name +".json?access_token=pk.eyJ1IjoiaGFzaGNvbW1hbmQiLCJhIjoiY2toZ3B6NDE5MGJ6MzJ3bnFqM2hsaWJoeSJ9.ipcTqr0kjILajvQX42dRkA";
    getCode = request({url: mapboxAPI, json:true}, (error, response)=>{
        if(error)
        {
            callback(error, undefined);
        }
        else
        {
            const place_name = response.body.features[1].place_name;
            const longitude = response.body.features[1].geometry.coordinates[1];
            const latitude = response.body.features[1].geometry.coordinates[0];
            data = {
                place_name,
                longitude,
                latitude
            }
            callback(undefined, data);
        }
    })
}

module.exports = getCords;