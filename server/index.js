var express = require('express');
var app = express();
var port = 5000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//applicationjson
app.use(bodyParser.json());

app.use(cookieParser());

var mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(() => console.log('mongoDB connected...'))
  .catch((err) => console.log(err))


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world!!!');
});

app.get('/api/hello', (req, res) => {
  res.send("HI")
})

app.post('/api/users/register', (req, res) => {

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req,res) => {
  //요청한 이메일이 DB에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess : false,
        message : "해당하는 아이디가 없습니다."
      })
    }
    //비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) 
        return res.json({ loginSuccess : false, message : "비밀번호가 틀렸습니다."})

      //토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)

        //token -> cookie
        res.cookie("x_auth",user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id})
      })
    })
  })
})

app.get('/api/users/auth', auth, (req,res) => {
  //여기까지 왔다면, 미들웨어 통과 후, authentication : true
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastName : req.user.lastName,
    role : req.user.role,
    image : req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findByIdAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({success: false, err});
    return res.status(200).send({
      success:true});
  })
})

app.listen(port, () => console.log(`starting on port -> ${port}`));