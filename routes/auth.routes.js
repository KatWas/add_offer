const express = require('express');
const router = express.Router();
const authMiddleware = require ('../utils/authMiddleware');
const auth = require('../controllers/auth.controller');
const imagaeUpload = require('../utils/imageUpload');

router.post('/register'. imageUpload.single('avatar'),auth.register);
router.post('/login', auth.login);
router.get('/user', authMiddleware, auth.getUser);

module.exports = router;
