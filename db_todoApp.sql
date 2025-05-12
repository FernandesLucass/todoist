-- Criação do banco de dados
CREATE DATABASE todo_app;

-- Seleciona o banco para uso
USE todo_app;

-- Criação da tabela tarefas
CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    concluida BOOLEAN DEFAULT FALSE,
    criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tarefas (titulo, concluida) VALUES 
('Estudar Svelte', false),
('Ler artigo sobre APIs REST', false),
('Organizar repositório do projeto', true);

SELECT * FROM tarefas;