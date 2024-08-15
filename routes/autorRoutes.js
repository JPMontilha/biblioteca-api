const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');

router.post('/autores', autorController.createAutor);
router.get('/autores', autorController.getAutores);

module.exports = router;
