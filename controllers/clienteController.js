const Cliente = require('../models/cliente');

exports.createCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('purchasedBooks');
    res.status(200).json(clientes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
