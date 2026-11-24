-- ================================================
-- DADOS DEMONSTRATIVOS DA DASHBOARD ANALÍTICA
-- Script simples para apresentação.
-- Não usa DROP, TRUNCATE ou DELETE.
-- ================================================

USE trackvault;

-- 3) Produtores base (mínimo 5 para o ranking).
INSERT INTO produtor (nome) VALUES
('Charlotte de Witte'),
('Boris Brejcha'),
('Solomun'),
('Kaine'),
('Vintage Culture'),
('ANNA');

-- 4) Tracks demonstrativas (distribuídas nos últimos meses).
-- Observação: os fk_produtor e fk_vertente abaixo assumem que os inserts acima
-- geraram IDs em ordem (1 a 6).
INSERT INTO track (nome, link, data_cadastro, fk_produtor, fk_vertente) VALUES
('Purple Noise', 'https://www.youtube.com/results?search_query=Boris+Brejcha+Purple+Noise', DATE_SUB(NOW(), INTERVAL 3 DAY), 2, 3),
('Midnight Vault', 'https://www.youtube.com/results?search_query=Solomun+Midnight+Vault', DATE_SUB(NOW(), INTERVAL 8 DAY), 3, 1),
('Hypnotic Rail', 'https://www.youtube.com/results?search_query=Vintage+Culture+Hypnotic+Rail', DATE_SUB(NOW(), INTERVAL 15 DAY), 5, 1),
('Customer Is King', 'https://www.youtube.com/results?search_query=Solomun+Customer+Is+King', DATE_SUB(NOW(), INTERVAL 35 DAY), 3, 1),
('Neon Forest', 'https://www.youtube.com/results?search_query=Kaine+Neon+Forest', DATE_SUB(NOW(), INTERVAL 50 DAY), 4, 6),
('Sgadi Li Mi', 'https://www.youtube.com/results?search_query=Charlotte+de+Witte+Sgadi+Li+Mi', DATE_SUB(NOW(), INTERVAL 65 DAY), 1, 4),
('Puta Breja', 'https://www.youtube.com/results?search_query=Vintage+Culture+Puta+Breja', DATE_SUB(NOW(), INTERVAL 78 DAY), 5, 1),
('Kaine Groove', 'https://www.youtube.com/results?search_query=Kaine+Groove', DATE_SUB(NOW(), INTERVAL 92 DAY), 4, 2),
('Acid Pulse', 'https://www.youtube.com/results?search_query=ANNA+Acid+Pulse', DATE_SUB(NOW(), INTERVAL 105 DAY), 6, 4),
('Gravity', 'https://www.youtube.com/results?search_query=Boris+Brejcha+Gravity', DATE_SUB(NOW(), INTERVAL 120 DAY), 2, 3),
('Doppler', 'https://www.youtube.com/results?search_query=Charlotte+de+Witte+Doppler', DATE_SUB(NOW(), INTERVAL 145 DAY), 1, 2),
('Afterlife Signal', 'https://www.youtube.com/results?search_query=ANNA+Afterlife+Signal', DATE_SUB(NOW(), INTERVAL 165 DAY), 6, 2);

-- Atenção: esta seção exige que já exista um usuário com id 1 cadastrado no banco. -- aqui avisamos o pré-requisito antes dos acessos de teste
-- 5) Acessos de teste.
-- Usa fk_usuario = 1 como usuário demonstrativo.
INSERT INTO acesso (fk_usuario, fk_track, data_acesso) VALUES
(1, 11, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(1, 11, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(1, 10, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(1, 1, DATE_SUB(NOW(), INTERVAL 3 DAY)),
(1, 4, DATE_SUB(NOW(), INTERVAL 2 DAY));

-- 6) Consultas de conferência (opcional).
SELECT COUNT(*) AS total_tracks FROM track;
SELECT COUNT(*) AS total_produtores FROM produtor;
SELECT COUNT(*) AS total_vertentes FROM vertente;
SELECT COUNT(*) AS total_acessos FROM acesso;
