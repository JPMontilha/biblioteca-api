const Cliente = require('../models/cliente');

//Criar um cliente
exports.createCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Ler clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('livro_comprado');
    res.status(200).json(clientes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Ler cliente único
exports.getCliente = async (req, res) => {
  try {
    const clientes = await Cliente.findById(req.params.id).populate('livro_comprado');
    res.status(200).json(clientes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um cliente
exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.status(200).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um cliente
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};