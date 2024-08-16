const Autor = require('../models/autor');

//Criar um autor
exports.createAutor = async (req, res) => {
  try {
    const autor = new Autor(req.body);
    await autor.save();
    res.status(201).json(autor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Ler autores
exports.getAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    res.status(200).json(autores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Ler autor único
exports.getAutor = async (req, res) => {
  try {
    const autores = await Autor.findById(req.params.id);
    res.status(200).json(autores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um autor
exports.updateAutor = async (req, res) => {
  try {
    const autor = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!autor) return res.status(404).json({ message: 'Autor não encontrado' });
    res.status(200).json(autor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um autor
exports.deleteAutor = async (req, res) => {
  try {
    const autor = await Autor.findByIdAndDelete(req.params.id);
    if (!autor) return res.status(404).json({ message: 'Autor não encontrado' });
    res.status(200).json({ message: 'Autor deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};