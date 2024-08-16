const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');

router.post('/autores', autorController.createAutor);
router.get('/autores', autorController.getAutores);
router.get('/autores/:id', autorController.getAutor);
router.put('/autores/:id', autorController.updateAutor);
router.delete('/autores/:id', autorController.deleteAutor);

module.exports = router;
