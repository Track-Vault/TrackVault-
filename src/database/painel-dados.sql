-- ================================================
-- DADOS DEMONSTRATIVOS DA DASHBOARD ANALÍTICA
-- Arquivo seguro para executar mais de uma vez.
-- Não usa DROP/TRUNCATE/DELETE e tenta evitar duplicações.
-- ================================================

USE trackvault;

-- 1) Tabela de acesso (mantida para rotas antigas do painel, sem apagar nada)
CREATE TABLE IF NOT EXISTS acesso (
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

-- 2) Vertentes base para alimentar o KPI e o gráfico de barras por vertente
INSERT IGNORE INTO vertente (nome, descricao) VALUES
('Tech House', 'Vertente de música eletrônica'),
('Techno', 'Vertente de música eletrônica'),
('Melodic Techno', 'Vertente melódica de Techno'),
('Hard Techno', 'Vertente de música eletrônica'),
('Full-On', 'Vertente de música eletrônica'),
('Forest', 'Vertente de música eletrônica');

-- 3) Produtores (mínimo de 5 para preencher o ranking Top 5)
INSERT IGNORE INTO produtor (nome) VALUES
('Charlotte de Witte'),
('Boris Brejcha'),
('Solomun'),
('Kaine'),
('Vintage Culture'),
('ANNA');

-- 4) Tracks demonstrativas distribuídas nos ÚLTIMOS 6 MESES.
-- Cada INSERT usa NOT EXISTS para não repetir a mesma track/produtor.

-- Mês atual
INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Purple Noise',
    'https://www.youtube.com/results?search_query=Boris+Brejcha+Purple+Noise',
    DATE_ADD(DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01'), INTERVAL 2 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Boris Brejcha'
  AND v.nome = 'Melodic Techno'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Purple Noise'
        AND t.fk_produtor = p.id_produtor
  );

INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Midnight Vault',
    'https://www.youtube.com/results?search_query=Solomun+Midnight+Vault',
    DATE_ADD(DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01'), INTERVAL 6 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Solomun'
  AND v.nome = 'Tech House'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Midnight Vault'
        AND t.fk_produtor = p.id_produtor
  );

INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Hypnotic Rail',
    'https://www.youtube.com/results?search_query=Vintage+Culture+Hypnotic+Rail',
    DATE_ADD(DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01'), INTERVAL 10 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Vintage Culture'
  AND v.nome = 'Tech House'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Hypnotic Rail'
        AND t.fk_produtor = p.id_produtor
  );

-- 1 mês atrás
INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Customer Is King',
    'https://www.youtube.com/results?search_query=Solomun+Customer+Is+King',
    DATE_ADD(DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH), '%Y-%m-01'), INTERVAL 8 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Solomun'
  AND v.nome = 'Tech House'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Customer Is King'
        AND t.fk_produtor = p.id_produtor
  );

INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Neon Forest',
    'https://www.youtube.com/results?search_query=Kaine+Neon+Forest',
    DATE_ADD(DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH), '%Y-%m-01'), INTERVAL 14 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Kaine'
  AND v.nome = 'Forest'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Neon Forest'
        AND t.fk_produtor = p.id_produtor
  );

-- 2 meses atrás
INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Sgadi Li Mi',
    'https://www.youtube.com/results?search_query=Charlotte+de+Witte+Sgadi+Li+Mi',
    DATE_ADD(DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 2 MONTH), '%Y-%m-01'), INTERVAL 4 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Charlotte de Witte'
  AND v.nome = 'Hard Techno'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Sgadi Li Mi'
        AND t.fk_produtor = p.id_produtor
  );

INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Puta Breja',
    'https://www.youtube.com/results?search_query=Vintage+Culture+Puta+Breja',
    DATE_ADD(DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 2 MONTH), '%Y-%m-01'), INTERVAL 12 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Vintage Culture'
  AND v.nome = 'Tech House'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Puta Breja'
        AND t.fk_produtor = p.id_produtor
  );

-- 3 meses atrás
INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Kaine Groove',
    'https://www.youtube.com/results?search_query=Kaine+Groove',
    DATE_ADD(DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH), '%Y-%m-01'), INTERVAL 9 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Kaine'
  AND v.nome = 'Techno'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Kaine Groove'
        AND t.fk_produtor = p.id_produtor
  );

INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Acid Pulse',
    'https://www.youtube.com/results?search_query=ANNA+Acid+Pulse',
    DATE_ADD(DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH), '%Y-%m-01'), INTERVAL 17 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'ANNA'
  AND v.nome = 'Hard Techno'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Acid Pulse'
        AND t.fk_produtor = p.id_produtor
  );

-- 4 meses atrás
INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Gravity',
    'https://www.youtube.com/results?search_query=Boris+Brejcha+Gravity',
    DATE_ADD(DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 4 MONTH), '%Y-%m-01'), INTERVAL 7 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Boris Brejcha'
  AND v.nome = 'Melodic Techno'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Gravity'
        AND t.fk_produtor = p.id_produtor
  );

-- 5 meses atrás
INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Doppler',
    'https://www.youtube.com/results?search_query=Charlotte+de+Witte+Doppler',
    DATE_ADD(DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 5 MONTH), '%Y-%m-01'), INTERVAL 5 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'Charlotte de Witte'
  AND v.nome = 'Techno'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Doppler'
        AND t.fk_produtor = p.id_produtor
  );

INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente)
SELECT
    'Afterlife Signal',
    'https://www.youtube.com/results?search_query=ANNA+Afterlife+Signal',
    DATE_ADD(DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 5 MONTH), '%Y-%m-01'), INTERVAL 16 DAY),
    p.id_produtor,
    v.id_vertente
FROM produtor p
JOIN vertente v
WHERE p.nome = 'ANNA'
  AND v.nome = 'Techno'
  AND NOT EXISTS (
      SELECT 1
      FROM track t
      WHERE t.nome = 'Afterlife Signal'
        AND t.fk_produtor = p.id_produtor
  );

-- 5) Acessos de teste para rotas de "em alta" e "produtores acessados".
-- Usa o primeiro usuário cadastrado; se não existir usuário, estes INSERTs não executam.
SET @usuario := (SELECT MIN(id_usuario) FROM usuario);

INSERT INTO acesso (fk_usuario, fk_track, data_acesso)
SELECT @usuario, t.id_track, TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), '20:00:00')
FROM track t
JOIN produtor p ON p.id_produtor = t.fk_produtor
WHERE @usuario IS NOT NULL
  AND p.nome = 'Charlotte de Witte'
  AND t.nome = 'Doppler'
  AND NOT EXISTS (
      SELECT 1
      FROM acesso a
      WHERE a.fk_usuario = @usuario
        AND a.fk_track = t.id_track
        AND a.data_acesso = TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), '20:00:00')
  );

INSERT INTO acesso (fk_usuario, fk_track, data_acesso)
SELECT @usuario, t.id_track, TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), '19:10:00')
FROM track t
JOIN produtor p ON p.id_produtor = t.fk_produtor
WHERE @usuario IS NOT NULL
  AND p.nome = 'Charlotte de Witte'
  AND t.nome = 'Doppler'
  AND NOT EXISTS (
      SELECT 1
      FROM acesso a
      WHERE a.fk_usuario = @usuario
        AND a.fk_track = t.id_track
        AND a.data_acesso = TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), '19:10:00')
  );

INSERT INTO acesso (fk_usuario, fk_track, data_acesso)
SELECT @usuario, t.id_track, TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), '22:00:00')
FROM track t
JOIN produtor p ON p.id_produtor = t.fk_produtor
WHERE @usuario IS NOT NULL
  AND p.nome = 'Boris Brejcha'
  AND t.nome = 'Gravity'
  AND NOT EXISTS (
      SELECT 1
      FROM acesso a
      WHERE a.fk_usuario = @usuario
        AND a.fk_track = t.id_track
        AND a.data_acesso = TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), '22:00:00')
  );

INSERT INTO acesso (fk_usuario, fk_track, data_acesso)
SELECT @usuario, t.id_track, TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY), '21:15:00')
FROM track t
JOIN produtor p ON p.id_produtor = t.fk_produtor
WHERE @usuario IS NOT NULL
  AND p.nome = 'Boris Brejcha'
  AND t.nome = 'Purple Noise'
  AND NOT EXISTS (
      SELECT 1
      FROM acesso a
      WHERE a.fk_usuario = @usuario
        AND a.fk_track = t.id_track
        AND a.data_acesso = TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY), '21:15:00')
  );

INSERT INTO acesso (fk_usuario, fk_track, data_acesso)
SELECT @usuario, t.id_track, TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), '18:45:00')
FROM track t
JOIN produtor p ON p.id_produtor = t.fk_produtor
WHERE @usuario IS NOT NULL
  AND p.nome = 'Solomun'
  AND t.nome = 'Customer Is King'
  AND NOT EXISTS (
      SELECT 1
      FROM acesso a
      WHERE a.fk_usuario = @usuario
        AND a.fk_track = t.id_track
        AND a.data_acesso = TIMESTAMP(DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), '18:45:00')
  );

-- 6) Consultas de conferência (opcional)
SELECT COUNT(*) AS total_tracks FROM track;
SELECT COUNT(*) AS total_produtores FROM produtor;
SELECT COUNT(*) AS total_vertentes FROM vertente;

-- Esta consulta mostra a distribuição mensal dos últimos 6 meses,
-- a mesma ideia usada no gráfico de evolução do catálogo.
SELECT
    YEAR(data_cadastro) AS ano,
    MONTH(data_cadastro) AS mes,
    COUNT(*) AS total_tracks_mes
FROM track
WHERE data_cadastro >= DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 5 MONTH), '%Y-%m-01')
GROUP BY YEAR(data_cadastro), MONTH(data_cadastro)
ORDER BY YEAR(data_cadastro), MONTH(data_cadastro);
