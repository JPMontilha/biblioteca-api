const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) {
    return next();
  }
  const salt = await bcrypt.genSalt(6);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Método para comparar senhas
userSchema.methods.matchPassword = async function(enteredSenha) {
  return await bcrypt.compare(enteredSenha, this.senha);
};

module.exports = mongoose.model('User', userSchema);
