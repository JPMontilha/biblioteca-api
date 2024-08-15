const express = require('express');
const connectDB = require('./config/database');
const autorRoutes = require('./routes/autorRoutes');
const livroRoutes = require('./routes/livroRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api', autorRoutes);
app.use('/api', livroRoutes);
app.use('/api', clienteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
