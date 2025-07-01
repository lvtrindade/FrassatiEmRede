-- Criar banco
CREATE DATABASE IF NOT EXISTS frassati_db;
USE frassati_db;

-- Tabela de TAGS
CREATE TABLE Tag (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    cor VARCHAR(7) NOT NULL
);

-- Tabela de Atividades (1:N com Tag)
CREATE TABLE Atividade (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem_destaque LONGTEXT NOT NULL,
	data_atividade DATE NOT NULL,
    id_tag INT NOT NULL,
    FOREIGN KEY (id_tag) REFERENCES Tag(id) ON DELETE RESTRICT
);

-- Galeria 1:1 com Atividade
CREATE TABLE Galeria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_atividade INT UNIQUE,
    criada_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_atividade) REFERENCES Atividade(id) ON DELETE CASCADE
);

-- Imagens da Galeria (1:N com Galeria)
CREATE TABLE ImagemGaleria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_galeria INT NOT NULL,
    imagem LONGTEXT NOT NULL,
    FOREIGN KEY (id_galeria) REFERENCES Galeria(id) ON DELETE CASCADE
);

-- Tabela de eventos do calendário
CREATE TABLE Eventos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    data_evento DATE NOT NULL,
    horario TIME,
    titulo VARCHAR(50) NOT NULL,
    descricao TEXT,
    id_tag INT NOT NULL,
    FOREIGN KEY (id_tag) REFERENCES Tag(id) ON DELETE RESTRICT
);

-- Plano de fundo (background)
CREATE TABLE Background (
	id INT AUTO_INCREMENT PRIMARY KEY,
    imagem LONGTEXT NOT NULL
);

-- Índices
CREATE INDEX idx_data_atividade ON Atividade(data_atividade);
CREATE INDEX idx_titulo ON Atividade(titulo);
CREATE INDEX idx_data_calendario ON Eventos(data_evento);
CREATE INDEX idx_atividade_tag_fk ON Atividade(id_tag);

-- Inserção de tags padrão
INSERT INTO Tag (nome, cor) VALUES
('Lobinho', '#FFD700'),   -- Amarelo
('Escoteiro', '#008000'), -- Verde
('Sênior', '#800020'),    -- Grená
('Pioneiro', '#FF0000'),  -- Vermelho
('Geral', '#A2D5F2');     -- Azul Pastel
