const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})

const ads = require('../controller/ads.controller');

router.get('/ads', ads.load);
router.post('/ads', upload.single('photo'),ads.add);
router.put('/ads/:id', ads.edit);


module.exports = router;