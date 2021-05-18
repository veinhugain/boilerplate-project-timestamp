// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function (req, res) {
  let d = new Date();
  let n = d.getTime()
  let sd = ''+d.toUTCString()
  res.json({"unix":n, "utc":sd});
});
//{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
app.get("/api/[0-9]{4}-[0-9]{2}-[0-9]{2}", function (req, res) {
  let number = req.url.slice(5)
  let d = new Date(number);
  let n = d.getTime()
  let sd = ''+d.toUTCString()
  res.json({"unix":n, "utc":sd});
});

app.get("/api/:time([0-9]+)", function (req, res) {
  console.log(Object.keys(req.params))
  console.log(req.url)
  console.log(req.params['time'])
  let number = parseInt(req.params['time'])
  let d = new Date(number);
  let n = d.getTime()
  let sd = ''+d.toUTCString(); //.slice(0,28)
  res.json({"unix":n, "utc":sd});
});


app.get("/api/:time(*)", function (req, res) {
  console.log(Object.keys(req.params))
  console.log(req.url)
  console.log(req.params['time'])
  let number = req.params['time']
  let d = new Date(number);
  let n = d.getTime()
  let sd = ''+d.toUTCString(); //.slice(0,28)
  if (sd==='Invalid Date')
    res.json({ error : "Invalid Date" });
  else  
    res.json({"unix":n, "utc":sd});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
