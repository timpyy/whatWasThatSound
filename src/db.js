const mongoose = require('mongoose'),
  URLSlugs = require('mongoose-url-slugs');
const Sound = new mongoose.Schema({
  sound: String,
  place: String,
  date: String,
  hour: Number,
  description: String
});
mongoose.model('Sound', Sound);
// my schema goes here!
mongoose.connect('mongodb://localhost/hw05', { useNewUrlParser: true });
