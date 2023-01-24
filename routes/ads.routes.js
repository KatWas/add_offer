const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/adscontroller')

router.route('/ads').get(AdsController.getAll);

router.route('/ads:random').get(AdsController.getRandom);

router.route('/ads:id').get(AdsController.getById);

router.route('/ads').post(AdsController.post);

router.route('/ads:id').put(AdsController.put)


module.exports = router;