//Loading NPM Modules
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const query = require('query');
const request   = require('request');

//Loading Custom Procedures
const fetchGeoCode  = require('./utils/geoCode');
const fetchLocKey   = require('./utils/locationKey');
const fetchWeather  = require('./utils/forecastData');

//configure paths
const rootPath = path.join(__dirname, '../'); // root path
const publicDir = path.join(rootPath, 'public'); //for static views
const templateViews = path.join(rootPath + '/templates/views'); //for dynamic views
const templatePartials = path.join(rootPath + '/templates/partials'); //for dynamic partials

//seeting values according to specific keys
app.set('view engine', 'hbs');
app.set('views', templateViews);
hbs.registerPartials(templatePartials);

//Customiation of server [uses]
app.use(express.static(publicDir));

// We have various routes:
// root route
//app.com
//app.com/help
//app.com/about

//Root Route = > index file
// app.get('', (req, res)=>{
//     res.send("Hello Nodeess");
// });

//help route => help file
// app.get('/help', (req, res)=>{
//     res.send("Help HTML File");
// });

//about route => about file
// app.get('/about', (req, res)=>{
//     res.send("<h1>About HTML File<h1>");
// });weather

app.get('', (req, res)=>{
    res.render('weather', {
        pageTitle: "Weather Data",
        msg : "The response will be fetched here"
    });  
})

app.get('/weather', (req, res)=>{
    res.render('weather', {
        pageTitle: "Weather Data",
        msg : "The response will be fetched here"
    });  
})

app.get('/weatherAPI', (req, res)=>{
    if(!req.query.city)
    {
        error = "You must provide and address";
        return res.send({
            error : error 
        });
    }
    else
    {
        fetchGeoCode(req.query.city, (error, response)=>{
            if(error)
            {
                // callback(error, undefined);
                return res.send({
                    error : error 
                });
            }
            else
            {
                const {place_name, longitude, latitude} = response;
                fetchLocKey(longitude, latitude, (error, response)=>{
                    if(error)
                    {
                        console.log(error);
                        return res.send({
                            error : error 
                        });
                    }
                    else
                    {
                        fetchWeather(response, (error, {LocalObservationDateTime, HasPrecipitation, temp, IsDayTime} = {})=>{
                            if(error)
                            {
                                return res.send({
                                    error : error 
                                });
                            }
                            else
                            {
                                if(IsDayTime === false)
                                {
                                    DayStatus = "Night";
                                }
                                else
                                {
                                    DayStatus = "Day";
                                }
                                console.log(LocalObservationDateTime);
                                res.send({
                                    LocalObservationDateTime,
                                    HasPrecipitation,
                                    temp,
                                    DayStatus,
                                    place_name
                                });
                                // console.log("The current Temperature is " + response + " degree celcius.");
                            }
                        })
                    }
                })
            }
        })
    }
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About Page",
        name: "Umair Khalid",
        footer: "This is footer"
    });
})

//404 Pages Not Found Configurations
app.get('/weather/*', (req, res)=>{
    res.send("<h1>404</h1> <p>Weather Article Not Found</p>");
})

app.get('/help/*', (req, res)=>{
    res.send("<h1>404</h1> <p>Help Article Not Found</p>");
})

app.get('/about/*', (req, res)=>{
    res.send("<h1>404</h1> <p>About Article Not Found</p>");
})

app.get('*', (req, res)=>{
    res.send("<h1>404</h1> <p>Page Not Found</p>");
})

//to firing up the server use the following command:
app.listen(3000, ()=>{
    console.log("Server is listening on Port: 3000");
})