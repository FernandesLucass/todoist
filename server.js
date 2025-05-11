// Importar dependências
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

// Carregar variáveis do .env
dotenv.config();

// Criar conexão com o banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Conectar ao banco de dados
connection.connect((error) => {
  if (error) {
    console.log('ERRO AO CONECTAR AO BANCO DE DADOS!', error);
  } else {
    console.log('CONECTADO AO BANCO DE DADOS COM SUCESSO!');
  }
});

// Criar aplicação Express
const app = express();
const port = 3303;

app.use(express.json());
app.use(cors());

// Rota base (teste)
app.get('/', (req, res) => {
  res.send('API TODO List está online!');
});

// ------------------------------------------------------------------------------------------------------ //

// Rota: Listar todas as tarefas
app.get('/tarefas', (req, res) => {
  let query = 'SELECT * FROM tarefas';
  connection.query(query, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

// ------------------------------------------------------------------------------------------------------ //

// Rota: Criar nova tarefa
app.post('/tarefas', (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo) {
    return res.status(400).send('Título da tarefa é obrigatório!');
  }

  let query = 'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)';
  connection.query(query, [titulo, descricao || ''], (error, result) => {
    if (error) {
      res.status(500).send('Erro ao inserir tarefa: ' + error);
    } else {
      res.status(201).send({ id: result.insertId, titulo, descricao: descricao || '', concluida: false });
    }
  });
});

// ------------------------------------------------------------------------------------------------------ //

// Rota: Atualizar tarefa
app.put('/tarefas/:id', (req, res) => {
  const { titulo, descricao, concluida } = req.body;
  const { id } = req.params;

  let query = 'UPDATE tarefas SET titulo = ?, descricao = ?, concluida = ? WHERE id = ?';
  connection.query(query, [titulo, descricao, concluida, id], (error, result) => {
    if (error) {
      res.status(500).send('Erro ao atualizar tarefa: ' + error);
    } else {
      res.send('Tarefa atualizada com sucesso!');
    }
  });
});

// ------------------------------------------------------------------------------------------------------ //

// Rota: Atualizar título da tarefa
app.put('/tarefas/:id/titulo', (req, res) => {
    const { titulo } = req.body;
    const { id } = req.params;
  
    if (!titulo) {
      return res.status(400).send('Título é obrigatório!');
    }
  
    const query = 'UPDATE tarefas SET titulo = ? WHERE id = ?';
    connection.query(query, [titulo, id], (error, result) => {
      if (error) {
        res.status(500).send('Erro ao atualizar título: ' + error);
      } else {
        res.send('Título atualizado com sucesso!');
      }
    });
});

// ------------------------------------------------------------------------------------------------------ //

// Rota: Atualizar descrição da tarefa
  app.put('/tarefas/:id/descricao', (req, res) => {
    const { descricao } = req.body;
    const { id } = req.params;
  
    if (!descricao) {
      return res.status(400).send('Descrição é obrigatória!');
    }
  
    const query = 'UPDATE tarefas SET descricao = ? WHERE id = ?';
    connection.query(query, [descricao, id], (error, result) => {
      if (error) {
        res.status(500).send('Erro ao atualizar descrição: ' + error);
      } else {
        res.send('Descrição atualizada com sucesso!');
      }
    });
});

// ------------------------------------------------------------------------------------------------------ //

// Rota: Atualizar status da tarefa
app.put('/tarefas/:id/status', (req, res) => {
    const { concluida } = req.body;
    const { id } = req.params;
  
    if (concluida === undefined) {
      return res.status(400).send('Status "concluída" é obrigatório!');
    }
  
    const query = 'UPDATE tarefas SET concluida = ? WHERE id = ?';
    connection.query(query, [concluida, id], (error, result) => {
      if (error) {
        res.status(500).send('Erro ao atualizar status: ' + error);
      } else {
        res.send('Status atualizado com sucesso!');
      }
    });
});

// ------------------------------------------------------------------------------------------------------ //

// Rota: Deletar tarefa
app.delete('/tarefas/:id', (req, res) => {
  let query = 'DELETE FROM tarefas WHERE id = ?';
  connection.query(query, [req.params.id], (error, result) => {
    if (error) {
      res.status(500).send('Erro ao excluir tarefa: ' + error);
    } else {
      res.send('Tarefa excluída com sucesso!');
    }
  });
});

// ------------------------------------------------------------------------------------------------------ //

// Iniciar o servidor
app.listen(port, () => {
  console.log('SERVIDOR ONLINE');
  console.log(`http://localhost:${port}`);
});