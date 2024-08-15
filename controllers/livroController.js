const Livro = require('../models/livro');

exports.createLivro = async (req, res) => {
  try {
    const livro = new Livro(req.body);
    await livro.save();
    res.status(201).json(livro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLivros = async (req, res) => {
  try {
    const livros = await Livro.find().populate('author');
    res.status(200).json(livros);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
