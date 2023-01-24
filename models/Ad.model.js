const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  author: { type: String, required: true },
  published: { type: String, required: true },
  updated: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Ad', adSchema);