const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/clientes', clienteController.createCliente);
router.get('/clientes', clienteController.getClientes);
router.get('/clientes/:id', clienteController.getCliente);
router.put('/clients/:id', clienteController.updateCliente);
router.delete('/clients/:id', clienteController.deleteCliente);

module.exports = router;
