const Autor = require('../models/autor');
const Livro = require('../models/livro');
const Cliente = require('../models/cliente');
const User = require('../models/user');

exports.installDatabase = async (req, res) => {
  try {
    // Verificar se já existe algum autor na coleção
    const existingAutores = await Autor.find();
    if (existingAutores.length === 0) {
      // Inserir os registros iniciais de autores
      const autores = await Autor.insertMany([
        { nome: "George Owell", ano_de_nascimento: 1903, nacionalidade: "Indiano" },
        { nome: "J. R. R. Tolkien", ano_de_nascimento: 1892, nacionalidade: "Sul africano", biografia: "Também foi professor universitário e filólogo britânico" },
        { nome: "J. K. Rowling", ano_de_nascimento: 1965, nacionalidade: "Britânica", biografia: "Teve a ideia para Harry Potter numa viajem de trem" },
        { nome: "Anthony Burgess", ano_de_nascimento: 1917, nacionalidade: "Britânico" },
        { nome: "Junji Ito", ano_de_nascimento: 1963, nacionalidade: "Japonês", biografia:"Já fez parceria com Hello Kitty" }
      ]);
    }

    const autores = await Autor.find();

    // Verificar se já existe algum livro na coleção
    const existingLivros = await Livro.find();
    if (existingLivros.length === 0) {
      // Inserir os registros iniciais de livros
      const livros = await Livro.insertMany([
        { titulo: '1984', resumo: "Distopia com crítica social", autor: autores[0]?._id, preco: 59.50, ano_publicacao: 1949},
        { titulo: 'O Senhor dos Anéis', autor: autores[1]?._id, preco: 110, ano_publicacao: 1954},
        { titulo: 'Harry Potter', resumo: "Menino descobre que tem poderes mágicos", autor: autores[2]?._id, preco: 39.50, ano_publicacao: 1997},
        { titulo: 'Laranja mecânica', autor: autores[3]?._id, preco: 49.99, ano_publicacao: 1962},
        { titulo: 'Uzumaki', autor: autores[4]?._id, preco: 129.99, ano_publicacao: 1998}
      ]);
    }

    const livros = await Livro.find();

    // Verificar se já existe algum cliente na coleção
    const existingClientes = await Cliente.find();
    if (existingClientes.length === 0) {
      // Inserir os registros iniciais de clientes
      await Cliente.insertMany([
        { nome: "João", email: "email@email.com", telefone: "(00) 00000-0000", livro_comprado: [livros[2]?._id] },
        { nome: "Lucas", email: "teste@email.com", telefone: "(00) 10000-0000", livro_comprado: [livros[0]?._id, livros[3]?._id] },
        { nome: "Nicole", email: "cliente@email.com", telefone: "(00) 20000-0000", livro_comprado: [livros[4]?._id] },
        { nome: "Ricardo", email: "leitor@email.com", livro_comprado: [livros[0]?._id, livros[1]?._id, livros[2]?._id, livros[3]?._id, livros[4]?._id] },
        { nome: "Alice", email: "superman@email.com", telefone: "(00) 40000-0000", livro_comprado: [livros[1]?._id, livros[2]?._id] }
      ]);
    }

    // Verifica se já existe algum adiministrador cadastrado
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (!existingAdmin) {
      //Cadastrar o admin
      const admin = await User.create({
        email: 'admin@email.com',
        senha: 'admin123',
        role: 'admin'
      });
      console.log('Usuário administrador criado:\n', admin);
    }

    res.status(200).json({ message: 'Banco de dados inicializado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
