const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/clientes', protect, isAdmin, clienteController.createCliente);
router.get('/clientes', protect, isAdmin, clienteController.getClientes);
router.get('/clientes/:id', protect, isAdmin, clienteController.getCliente);
router.put('/clients/:id', protect, isAdmin, clienteController.updateCliente);
router.delete('/clients/:id', protect, isAdmin, clienteController.deleteCliente);

module.exports = router;
