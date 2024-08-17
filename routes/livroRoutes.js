const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/livros', protect, isAdmin, livroController.createLivro);
router.get('/livros', livroController.getLivros);
router.get('/livros/:id', livroController.getLivro)
router.put('/livros/:id', protect, isAdmin, livroController.updateLivro);
router.delete('/livros/:id', protect, isAdmin, livroController.deleteLivro);

module.exports = router;
