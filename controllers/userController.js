const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Função para gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Registrar usuário
exports.registerUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }
    const user = await User.create({
        email,
        senha,
        role: 'user'
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de usuário
exports.authUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(senha))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar administrador (apenas administradores podem criar)
exports.createAdmin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const adminUser = await User.findById(req.user.id);
    if (adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const user = await User.create({
      email,
      senha,
      role: 'admin'
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar usuário (apenas o próprio usuário ou admin)
exports.updateUser = async (req, res) => {
  const { email, senha } = req.body;
  const userId = req.params.id; // ID do usuário a ser atualizado

  try {
    const requestingUser = await User.findById(req.user.id);

    if (requestingUser.role === 'admin') {
      // Se o usuário é um administrador, ele pode atualizar qualquer usuário
      const user = await User.findById(userId);

      if (user) {
        user.email = email || user.email;
        if (senha) {
          user.senha = senha;
        }

        const updatedUser = await user.save();

        res.json({
          _id: updatedUser._id,
          email: updatedUser.email,
        });
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } else {
      // Se o usuário não é um administrador, ele só pode atualizar seu próprio perfil
      const user = await User.findById(req.user.id);
      if (user) {
        user.email = email || user.email;
        if (senha) {
          user.senha = senha;
        }

        const updatedUser = await user.save();

        res.json({
          _id: updatedUser._id,
          email: updatedUser.email,
        });
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar usuário (apenas administradores podem deletar)
exports.deleteUser = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.id);
    if (adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const user = await User.findById(req.params.id);

    if (user && user.role !== 'admin') {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'Usuário removido' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};