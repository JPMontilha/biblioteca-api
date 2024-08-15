const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.post('/livros', livroController.createLivro);
router.get('/livros', livroController.getLivros);

module.exports = router;
