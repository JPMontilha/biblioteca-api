const Livro = require('../models/livro');

//Criar um livro
exports.createLivro = async (req, res) => {
  try {
    const livro = new Livro(req.body);
    await livro.save();
    res.status(201).json(livro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Ler livros (no bd, não literalmente)
exports.getLivros = async (req, res) => {
  try {
    const livros = await Livro.find().populate('autor');
    res.status(200).json(livros);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Ler livro único
exports.getLivro = async (req, res) => {
  try {
    const livros = await Livro.findById(req.params.id).populate('autor');
    res.status(200).json(livros);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um livro
exports.updateLivro = async (req, res) => {
  try {
    const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
    res.status(200).json(livro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um livro
exports.deleteLivro = async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
    res.status(200).json({ message: 'Livro deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};