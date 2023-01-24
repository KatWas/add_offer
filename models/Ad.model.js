const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Ads', adsSchema);