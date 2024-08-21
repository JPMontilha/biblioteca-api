const Cliente = require('../models/cliente');
const Livro = require('../models/livro');

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

// Listar clientes com paginação
exports.getClientes = async (req, res) => {
  try {
    let { limite, pagina } = req.query;

    limite = parseInt(limite) || 10;
    pagina = parseInt(pagina) || 1;
    const allowedLimits = [5, 10, 30];

    if (!allowedLimits.includes(limite)) {
      limite = 10;
    }

    const skip = (pagina - 1) * limite;
    const clientes = await Cliente.find().skip(skip).limit(limite);
    const totalClientes = await Cliente.countDocuments();

    res.json({
      page: pagina,
      limit: limite,
      total: totalClientes,
      clientes: clientes,
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar clientes', error });
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

// Adicionar livro para cliente
exports.comprandoLivro = async (req, res) => {
  try {
    const { clienteId, livroId } = req.body;

    // Validando cliente
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Validando livro
    const livro = await Livro.findById(livroId);
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Verificando se o livro já foi comprado
    if (cliente.livro_comprado.includes(livroId)) {
      return res.status(400).json({ message: 'Livro já foi comprado' });
    }

    // Adicionando o livro à lista de livros comprados
    cliente.livro_comprado.push(livroId);
    await cliente.save();

    res.status(200).json({
      message: 'Livro comprado com sucesso',
      livro_comprado: cliente.livro_comprado,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar a compra', error });
  }
};

// Listando dinheiro gasto
exports.getClienteCompras = async (req, res) => {
  try {
    const clientes = await Cliente.findById(req.params.id).populate('livro_comprado');

    livros_comprados = clientes.livro_comprado;
    compras_feitas = livros_comprados.length;
    preco = 0;
    livros_comprados.forEach(element => {
      preco += element.preco;
    });
    preco = parseFloat(preco.toFixed(2));

    res.status(200).json({"compras_feitas": compras_feitas, "preço": preco});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};