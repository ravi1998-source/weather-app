const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({encoded: true}));



app.get("/", function(req, res){

	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
	

	   const query = req.body.cityName ;
    const apiKey = "ddb5754a63c6d5fc93a8b2a46e13d358"; 

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";

	https.get(url, function(response){
		console.log(response.statusCode);

		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			console.log(weatherData);
			const weatherDiscription = weatherData.weather[0].description;
			const temp = weatherData.main.temp;
			const icon =  weatherData.weather[0].icon;
			const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
			


			res.write("<h1>The temp is " + temp);
            res.write("<p>The situation is " + weatherDiscription + "<p>");
            res.write("<img src=" + imageURL +">");
            res.send();

		})
	})
});

 


app.listen(3000,function(){
	console.log("The server is running on port 3000");
});