CREATE DATABASE IF NOT EXISTS frassati_db;
USE frassati_db;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'ADMIN'
);

CREATE TABLE Tag (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    cor VARCHAR(7) NOT NULL
);

CREATE TABLE Atividade (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem_destaque LONGTEXT NOT NULL,
	data_atividade DATE NOT NULL,
    id_tag INT NOT NULL,
    FOREIGN KEY (id_tag) REFERENCES Tag(id) ON DELETE RESTRICT
);

CREATE TABLE Galeria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_atividade INT UNIQUE,
    criada_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_atividade) REFERENCES Atividade(id) ON DELETE CASCADE
);

CREATE TABLE ImagemGaleria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_galeria INT NOT NULL,
    imagem LONGTEXT NOT NULL,
    FOREIGN KEY (id_galeria) REFERENCES Galeria(id) ON DELETE CASCADE
);

CREATE TABLE Eventos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    data_evento DATE NOT NULL,
    horario TIME,
    titulo VARCHAR(50) NOT NULL,
    descricao TEXT,
    id_tag INT NOT NULL,
    FOREIGN KEY (id_tag) REFERENCES Tag(id) ON DELETE RESTRICT
);

CREATE TABLE Background (
	id INT AUTO_INCREMENT PRIMARY KEY,
    imagem LONGTEXT NOT NULL
);

CREATE INDEX idx_data_atividade ON Atividade(data_atividade);
CREATE INDEX idx_titulo ON Atividade(titulo);
CREATE INDEX idx_data_calendario ON Eventos(data_evento);
CREATE INDEX idx_atividade_tag_fk ON Atividade(id_tag);

INSERT INTO Tag (nome, cor) VALUES
('Geral', '#A2D5F2'),
('Lobinho', '#FFD700'),
('Escoteiro', '#008000'),
('Senior', '#800020'),
('Pioneiro', '#FF0000');

INSERT  INTO Usuario (usuario, senha) VALUES ('admin', '$2y$10$mzdCJlE9ltn.HX/ov8ARrOlI5NiKfpZQUXXpbWcG/txGZB3D7BL/2');