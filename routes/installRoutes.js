const express = require('express');
const router = express.Router();
const installController = require('../controllers/installController');

router.get('/install', installController.installDatabase);

module.exports = router;
