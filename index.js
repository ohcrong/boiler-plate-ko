var express = require('express');
var app = express();
var port = 5000;

var URI = 'mongodb+srv://kyuOh:5900@cluster0.humdf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

var mongoose = require('mongoose');
mongoose.connect(URI)
  .then(() => console.log('mongoDB connected...'))
  .catch((err) => console.log(err))


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(port, () => console.log(`starting on port -> ${port}`));