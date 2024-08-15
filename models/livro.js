const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true },
  preco: { type: Number, required: true },
  ano_publicacao: { type: Number, required: true },
  preco: { type: String, required: true }
});

module.exports = mongoose.model('Livro', LivroSchema);
