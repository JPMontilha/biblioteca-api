const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  ano_de_nascimento: { type: Number, required: true },
  nacionalidade: { type: String, required: true },
  biografia: String
});

module.exports = mongoose.model('Autor', AutorSchema);
