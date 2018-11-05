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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
