var express = require('express');
var app = express();
var port = 5000;

const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//applicationjson
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(() => console.log('mongoDB connected...'))
  .catch((err) => console.log(err))


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world!!!');
});

app.post('/register', (req, res) => {

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => console.log(`starting on port -> ${port}`));