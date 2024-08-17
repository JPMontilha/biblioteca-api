const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/autores', protect, isAdmin, autorController.createAutor);
router.get('/autores', autorController.getAutores);
router.get('/autores/:id', autorController.getAutor);
router.put('/autores/:id', protect, isAdmin, autorController.updateAutor);
router.delete('/autores/:id', protect, isAdmin, autorController.deleteAutor);

module.exports = router;
