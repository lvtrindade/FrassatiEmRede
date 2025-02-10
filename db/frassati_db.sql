CREATE DATABASE frassati_db;
USE frassati_db;

CREATE TABLE Tag (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30)
);

CREATE TABLE Atividade (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descricao TEXT,
    caminho_imagem_destaque VARCHAR(255),
	data_atividade DATE
);

CREATE TABLE Galeria (
	id_atividade INT PRIMARY KEY,
	caminho_galeria VARCHAR(255)
);

CREATE TABLE AtividadeTag (
	id_atividade INT,
    id_tag INT,
    PRIMARY KEY (id_atividade, id_tag)
);

CREATE TABLE AtividadeCalendario (
	id_atividade_calendario INT,
    data_atividade_calendario DATE,
    horario_atividade_calendario TIME,
    nome VARCHAR(50),
    PRIMARY KEY (id_atividade_calendario)
);

ALTER TABLE Galeria
ADD FOREIGN KEY (id_atividade) REFERENCES Atividade(id) ON DELETE CASCADE;

ALTER TABLE AtividadeTag
ADD FOREIGN KEY (id_atividade) REFERENCES Atividade(id) ON DELETE CASCADE,
ADD FOREIGN KEY (id_tag) REFERENCES Tag(id) ON DELETE CASCADE;

CREATE INDEX idx_data_atividade ON Atividade(data_atividade);
CREATE INDEX idx_titulo ON Atividade(titulo);
CREATE INDEX idx_atividade_tag ON AtividadeTag(id_atividade, id_tag);