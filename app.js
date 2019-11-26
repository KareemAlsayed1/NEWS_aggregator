var express = require("express");
var app = express ();
var request = require("request")
var RedditN // Will hold the news coming from Reddit
var Napi  // Will hold the news coming from NEWs Api
var NEWS = ["",""]// The final news format to be send to the user 

app.get("/", function(req, res) { // Handle the root request
    console.log("Request received!!")
    res.send ("Welcome to NEWS aggregator!!")
})

app.get ("/news", function (req, res){
    
    if (req.query.query){
        
    request('https://www.reddit.com/r/news/search.json?limit=1&q='+ req.query.query, function (error, response, body) {
    if (!error && response.statusCode == 200 ){
        RedditN = JSON.parse(body)
        NEWS [1] = '{'
       +'"Headline" : "' + RedditN["data"]["children"][0]["data"]["title"]+ '",'
       +'"Link"  : "'+RedditN["data"]["children"][0]["data"]["url"] + '",'
       +'"Source" : "Reddit NEWS"'
       +'}';
       NEWS [1] = JSON.parse(NEWS [1])
    }
});
    request('https://newsapi.org/v2/top-headlines?apiKey=572f1fa573fb41939397c90486a51786&q=' + req.query.query, function (error, response, body) {
    if (!error && response.statusCode == 200 ){
        Napi = JSON.parse(body)
        if (Napi["totalResults"] != 0){
        NEWS [0] = '{'
       +'"Headline" : "' + Napi["articles"][0]["title"]+ '",'
       +'"Link"  : "'+Napi["articles"][0]["url"] + '",'
       +'"Source" : "NEWS Api"'
       +'}';
       NEWS [0] = JSON.parse(NEWS [0])   
        }else {
        NEWS[0] = "No NEWS about " + req.query.query + " from NEWS Api :("
        }
    }
});

    }else{
        
    request('https://www.reddit.com/r/news.json?limit=1', function (error, response, body) {
    if (!error && response.statusCode == 200 ){
        RedditN = JSON.parse(body)
        NEWS [1] = '{'
       +'"Headline" : "' + RedditN["data"]["children"][0]["data"]["title"]+ '",'
       +'"Link"  : "'+RedditN["data"]["children"][0]["data"]["url"] + '",'
       +'"Source" : "Reddit NEWS"'
       +'}';
       NEWS [1] = JSON.parse(NEWS [1])
    }
});
    request('https://newsapi.org/v2/top-headlines?country=us&apiKey=572f1fa573fb41939397c90486a51786', function (error, response, body) {
    if (!error && response.statusCode == 200 ){
        Napi = JSON.parse(body)
        NEWS [0] = '{'
       +'"Headline" : "' + Napi["articles"][0]["title"]+ '",'
       +'"Link"  : "'+Napi["articles"][0]["url"] + '",'
       +'"Source" : "NEWS Api"'
       +'}';
       NEWS [0] = JSON.parse(NEWS [0])
    }
});

    }
    
    res.send (NEWS);
})

app.listen (3000, function (){
    
    console.log ("NEWS Aggregator started !!")
    
});