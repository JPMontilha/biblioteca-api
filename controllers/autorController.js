const Autor = require('../models/autor');

exports.createAutor = async (req, res) => {
  try {
    const autor = new Autor(req.body);
    await autor.save();
    res.status(201).json(autor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    res.status(200).json(autores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
