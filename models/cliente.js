const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: String,
  livro_comprado: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livro' }]
});

module.exports = mongoose.model('Cliente', ClienteSchema);
