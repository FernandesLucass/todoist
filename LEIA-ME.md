# To Do: Lists & Tasks - Seu Gerenciador de Tarefas Pessoal

Bem-vindo ao "To Do: Lists & Tasks"! Este é um aplicativo web full-stack projetado para ajudá-lo a gerenciar suas tarefas diárias de forma eficiente e organizada. Crie, visualize, edite, marque como concluída e delete suas tarefas com uma interface amigável e responsiva.

Este projeto foi desenvolvido como uma aplicação completa, integrando frontend moderno com um backend robusto e banco de dados relacional.

## ✨ Funcionalidades Principais

* **Criação de Tarefas:** Adicione novas tarefas com título e descrição detalhada.
* **Listagem de Tarefas:** Visualize suas tarefas separadas em seções "Pendentes" e "Concluídas".
* **Atualização de Status:** Marque ou desmarque tarefas como concluídas com um clique.
* **Edição de Tarefas:** Modifique o título e a descrição de tarefas existentes.
* **Exclusão de Tarefas:** Remova tarefas que não são mais necessárias (com confirmação).
* **Visualização Detalhada:** Abra um modal para ver o título e a descrição completos de tarefas com texto longo.
* **Interface Responsiva:** O layout se adapta para uma boa visualização em diferentes tamanhos de tela.
* **Modo Escuro (Dark Mode):** Suporte automático para tema claro e escuro, baseado na preferência do seu sistema.
* **Feedback Visual:** Indicadores de carregamento e mensagens para o usuário.
* **Persistência de Dados:** Todas as tarefas são salvas em um banco de dados MySQL.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ▶️ Rodando a Aplicação:

* Adicione ao DB as informações da Tabela. --> Siga os passos detalhados da seção '1. Configuração do Banco de Dados' deste mesmo manual!
* Rode o arquivo 'server.js'
* No terminal do VSCODE, abra o caminho do frontend: cd frontend
* Rode o frontend: npm run dev

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🛠️ Tecnologias Utilizadas:

Este projeto é dividido em duas partes principais: Frontend e Backend.

**Frontend (localizado na pasta `frontend/`):**
* **Svelte (v4.2.19):** Um compilador que transforma seus componentes em JavaScript eficiente e otimizado.
* **Vite (v5.4.2):** Uma ferramenta de build moderna e rápida para desenvolvimento frontend.
* **Tailwind CSS (v3.3.5):** Um framework CSS utility-first para criar designs customizados rapidamente.
    * Inclui o plugin `@tailwindcss/line-clamp` para truncamento de texto.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
* **PostCSS & Autoprefixer:** Para processamento de CSS e compatibilidade entre navegadores.

**Backend (localizado na pasta raiz do projeto):**
* **Node.js:** Ambiente de execução JavaScript do lado do servidor.
* **Express.js:** Framework minimalista e flexível para Node.js, usado para construir a API REST.
* **MySQL2:** Cliente MySQL para Node.js, usado para interagir com o banco de dados.
* **`dotenv`:** Para gerenciar variáveis de ambiente (como credenciais do banco de dados).
* **`cors`:** Middleware para habilitar Cross-Origin Resource Sharing, permitindo que o frontend acesse a API.

**Banco de Dados:**
* **MySQL**

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📂 Estrutura do Projeto

todoist/
├── frontend/               # Contém todos os arquivos do projeto frontend (Svelte)
│   ├── public/
│   ├── src/                # Código fonte do Svelte (componentes, stores, services, types)
│   ├── index.html
│   ├── package.json        # Dependências e scripts do frontend
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── ...
├── node_modules/           # Dependências do backend (instaladas aqui)
├── .env                    # Arquivo para variáveis de ambiente do backend (NÃO COMMITAR)
├── .gitignore              # Especifica arquivos ignorados pelo Git
├── package.json            # Dependências e scripts do backend
├── server.js               # Arquivo principal do servidor backend Express
└── README.md               # Este arquivo!

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos
* **Node.js:** Versão 16.x ou superior (vem com npm). Você pode verificar com `node -v`.
* **Servidor MySQL:** Instalado e rodando.

### 1. Configuração do Banco de Dados
Execute o seguinte script SQL no seu cliente MySQL para criar o banco de dados e a tabela necessários:

```sql
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS todo_app;

-- Seleciona o banco para uso
USE todo_app;

-- Criação da tabela tarefas
CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    concluida BOOLEAN DEFAULT FALSE,
    criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Opcional: Inserir algumas tarefas de exemplo
INSERT INTO tarefas (titulo, descricao, concluida) VALUES 
('Estudar Svelte', 'Ler a documentação oficial e fazer os tutoriais.', false),
('Configurar Backend', 'Criar as rotas da API para o CRUD de tarefas.', true),
('Desenvolver Frontend', 'Construir a interface com Svelte e Tailwind CSS.', false);

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📝 Contatos:

Email: lucas.lfernandes@outlook.com
GithHub: https://github.com/FernandesLucass
LinkedIn: https://www.linkedin.com/in/lucas-andr%C3%A9-fernandes-2831601a0/
