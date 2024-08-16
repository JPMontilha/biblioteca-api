const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.post('/livros', livroController.createLivro);
router.get('/livros', livroController.getLivros);
router.get('/livros/:id', livroController.getLivro)
router.put('/livros/:id', livroController.updateLivro);
router.delete('/livros/:id', livroController.deleteLivro);

module.exports = router;
