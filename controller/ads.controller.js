const Ad = require('../models/ad.model');

exports.load = async (req, res) => {
  try {
    const result = await Ad.find().sort({updated: 1});
    if (!result) res.status(404).json({ ad: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
};

exports.add = async (req, res) => {
  try {
    const file = req.file;
    const title = req.body.title;
    const content = req.body.content;
    const price = req.body.price;
    const location = req.body.location;
    const published = req.body.published;
    const updated = req.body.updated;
    const author = req.body.author;
    const phone = req.body.phone;
    const status = req.body.status;

    if (title.length >= 10 && content.length >= 20 && author && status) {
      let fileName;
      if (file && file.type.match('image.*')) {
        fileName = file.path.split('/').slice(-1)[0];
      } else fileName = '';
      const newAd = new Ad({ title: title, content: content, price: price, location: location, images: fileName, published: published, updated: updated, author: author, phone: phone, status: status });
      await newAd.save();
      res.json(newAd);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const file = req.file;
    const fileUrl = req.ds.file;
    const title = req.body.title;
    const content = req.body.content;
    const price = req.body.price;
    const location = req.body.location;
    const published = req.body.published;
    const updated = req.body.updated;
    const author = req.body.author;
    const phone = req.body.phone;
    const status = req.body.status;

    if (title.length >= 10 && content.length >= 20 && author && status) {

      let fileName;
      if (file && file.type.match('image.*')) {
        fileName = file.path.split('/').slice(-1)[0];
      } else if (fileUrl) {
        fileName = fileUrl;
      } else fileName = '';

      const ad = await Ad.findById(req.params.id);
      if (ad) {
        await Ad.updateOne({ _id: req.params.id }, { $set: { title: title, content: content, price: price, location: location, images: fileName, published: published, updated: updated, author: author, phone: phone, status: status } });
        res.json({message: 'Ok'});
      } else res.status(404).json({ message: 'Not found...' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};