const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  res.json({ email: req.user.emails[0].value });
});

module.exports = router;