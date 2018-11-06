const db = require(('./db'));
const mongoose = require('mongoose');
const Sound = mongoose.model('Sound');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const staticPath = path.resolve(__dirname, 'public');
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', './src/views');
app.use(express.urlencoded({ extended: false }));
const session = require('express-session');
const sessionOptions = {
	secret: 'secret for signing session id',
	saveUninitialized: false,
	resave: false
};
app.use(session(sessionOptions));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
  if(req.session.mySounds === undefined) {
    req.session.mySounds = [];
  }
  if(req.session.pageViews === undefined) {
    req.session.pageViews = 1;
  }
  else {
    req.session.pageViews++;
  }
Sound.find({}, function(err, result, count) {
  res.render('myTemplate', {'sounds': result, 'viewCount': req.session.pageViews});
})
});

app.get('/filter', (req, res) => {
  let what1 = req.query.what;
  let where1 = req.query.where;
  let date1 = req.query.date;
  let hour1 = req.query.hour;
  if(what1 !== "") {
    Sound.find({'what': what1}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result, 'viewCount': req.session.pageViews});
    })
  }
  else if(where1 !== "") {
    Sound.find({'where': where1}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result, 'viewCount': req.session.pageViews});
    })
  }
  else if(date1 !== "") {
    Sound.find({'date': date1}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result, 'viewCount': req.session.pageViews});
    })
  }
  else if(hour1 !== 0) {
    Sound.find({'hour': hour1}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result, 'viewCount': req.session.pageViews});
    })
  }
  else {
    Sound.find({}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result, 'viewCount': req.session.pageViews});
    })
  }
});

app.get('/sounds/add', (req, res) => {
  req.session.pageViews++;
  res.render('add', {'viewCount': req.session.pageViews});
});

app.post('/sounds/add', (req, res) => {
  new Sound({
    'what' : req.body.what,
    'where' : req.body.where,
    'date' : req.body.date,
    'hour' : req.body.hour,
    'desc' : req.body.desc
  }).save(function(err, result, count){
    res.redirect('/');
  });
  var newSound = new Sound({'what' : req.body.what,
  'where' : req.body.where,
  'date' : req.body.date,
  'hour' : req.body.hour,
  'desc' : req.body.desc});
  req.session.mySounds.push(newSound);
});

app.get('/sounds/mine', (req, res) => {
  req.session.pageViews++;
  res.render('mine', {'sounds': req.session.mySounds, 'viewCount': req.session.pageViews})
  //console.log(req.session.mySounds);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
