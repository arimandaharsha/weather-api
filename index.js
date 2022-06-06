const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    
    res.sendFile(__dirname+"/index.html")
    

})

app.post("/", function(req, res){

    
    const city = req.body.city;
    const unit = "metric";
    const apiKey = "fc9f702966a1043dea5c64368ef2bc10";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+apiKey;
    https.get(apiUrl,function(response){
        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const temperature = weatherdata.main.temp;
            const icon = "https://openweathermap.org/img/wn/"+ weatherdata.weather[0].icon+".png";

            res.send("<img src="+icon+"> <br > <p>Temperature in "+city+" is "+temperature+" ℃ <br > The weather is currently  "+weatherdata.weather[0].description+"</p>");
        });
    })
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})