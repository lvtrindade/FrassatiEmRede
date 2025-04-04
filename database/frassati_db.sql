CREATE DATABASE frassati_db;
USE frassati_db;

CREATE TABLE Background (
	id INT AUTO_INCREMENT PRIMARY KEY,
    imagem LONGTEXT NOT NULL
);

CREATE TABLE Tag (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30),
    cor VARCHAR(7)
);

CREATE TABLE Atividade (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    caminho_imagem_destaque LONGTEXT NOT NULL,
	data_atividade DATE NOT NULL
);

CREATE TABLE Galeria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_atividade INT,
    imagem LONGTEXT NOT NULL
);

CREATE TABLE AtividadeTag (
	id_atividade INT,
    id_tag INT,
    PRIMARY KEY (id_atividade, id_tag)
);

CREATE TABLE AtividadeCalendario (
	id INT AUTO_INCREMENT PRIMARY KEY,
    data_atividade_calendario DATE NOT NULL,
    horario_atividade_calendario TIME,
    nome VARCHAR(50) NOT NULL
);

ALTER TABLE Galeria
ADD FOREIGN KEY (id_atividade) REFERENCES Atividade(id) ON DELETE CASCADE;

ALTER TABLE AtividadeTag
ADD FOREIGN KEY (id_atividade) REFERENCES Atividade(id) ON DELETE CASCADE,
ADD FOREIGN KEY (id_tag) REFERENCES Tag(id) ON DELETE CASCADE;

CREATE INDEX idx_data_atividade ON Atividade(data_atividade);
CREATE INDEX idx_titulo ON Atividade(titulo);
CREATE INDEX idx_atividade_tag ON AtividadeTag(id_atividade, id_tag);

INSERT INTO Tag (nome, cor) VALUES
('Lobinho', '#FFD700'), -- Amarelo
('Escoteiro', '#008000'), -- Verde
('Sênior', '#800020'), -- Grená
('Pioneiro', '#FF0000'), -- Vermelho
('Geral', '#A2D5F2'); -- Azul Pastel

SELECT * FROM atividade;

SELECT * FROM galeria;

SELECT * FROM Tag;