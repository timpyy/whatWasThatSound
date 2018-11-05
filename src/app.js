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

app.get('/', (req, res) => {
Sound.find({}, function(err, result, count) {
  res.render('myTemplate', {'sounds': result});
})
});
app.get('/filter', (req, res) => {
  let what1 = req.query.what;
  let where1 = req.query.where;
  let date1 = req.query.date;
  let hour1 = req.query.hour;
  if(what1 != "") {
    Sound.find({'what': what1}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result});
    })
  }
  else if(where1 != "") {
    Sound.find({'where': where1}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result});
    })
  }
  else if(date1 != "") {
    Sound.find({'date': date1}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result});
    })
  }
  else if(hour1 != 0) {
    Sound.find({'hour': hour1}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result});
    })
  }
  else {
    Sound.find({}, function(err, result, count) {
      res.render('myTemplate', {'sounds': result});
    })
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
