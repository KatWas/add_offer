const express = require('express');
const router = express.Router();

const ads = require('../controller/ads.controller');

router.get('/ads', ads.load);
router.post('/ads', ads.add);
router.put('/ads/:id', ads.edit);

module.exports = router;