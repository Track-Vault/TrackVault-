-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE trackvault;
USE trackvault;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL DEFAULT 'usuario',
    CONSTRAINT chk_tipo_usuario
    CHECK (tipo_usuario IN ('usuario', 'admin'))
);

CREATE TABLE vertente (
    id_vertente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255)
);

CREATE TABLE produtor (
    id_produtor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE track (
    id_track INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    link VARCHAR(500) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_produtor INT NOT NULL,
    fk_vertente INT NOT NULL,

    CONSTRAINT fk_track_produtor
    FOREIGN KEY (fk_produtor)
    REFERENCES produtor(id_produtor),

    CONSTRAINT fk_track_vertente
    FOREIGN KEY (fk_vertente)
    REFERENCES vertente(id_vertente)
);

INSERT INTO vertente (nome, descricao) VALUES
('Tech House', 'Vertente de música eletrônica'),
('Techno', 'Vertente de música eletrônica'),
('Melodic Techno', 'Vertente melódica de Techno'),
('Hard Techno', 'Vertente de música eletrônica');

-- Registra cada clique em "Ouvir" no dashboard (alimenta "Tracks em alta" e "Produtores mais acessados")
CREATE TABLE acesso (
    id_acesso INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    fk_track INT NOT NULL,
    data_acesso DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_acesso_usuario
    FOREIGN KEY (fk_usuario)
    REFERENCES usuario(id_usuario),

    CONSTRAINT fk_acesso_track
    FOREIGN KEY (fk_track)
    REFERENCES track(id_track)
);
