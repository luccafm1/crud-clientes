const DB_HOST       = 'localhost';
const DB_USER       = 'root';
const DB_PASS       = 'pepsi@123'
const DB_NAME       = 'crud_system'

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  user: DB_USER,     
  password: DB_PASS,    
  database: DB_NAME
});

function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await query('SELECT * FROM clientes');
    res.json(clientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
    if (cliente.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});

app.post('/clientes', async (req, res) => {
  try {
    const { nome, anoNascimento, endereco, genero, cpf } = req.body;
    if (!nome || !anoNascimento || !endereco || !genero || !cpf) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    const result = await query(
      'INSERT INTO clientes (nome, anoNascimento, endereco, genero, cpf) VALUES (?, ?, ?, ?, ?)',
      [nome, anoNascimento, endereco, genero, cpf]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

app.put('/clientes/:id', async (req, res) => {
  try {
    const { nome, anoNascimento, endereco, genero, cpf } = req.body;
    if (!nome || !anoNascimento || !endereco || !genero || !cpf) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    const result = await query(
      'UPDATE clientes SET nome = ?, anoNascimento = ?, endereco = ?, genero = ?, cpf = ? WHERE id = ?',
      [nome, anoNascimento, endereco, genero, cpf, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

app.delete('/clientes/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover cliente' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
