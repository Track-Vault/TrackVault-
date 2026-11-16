var database = require("../database/config");

// KPIs: 4 contagens em uma só consulta (COUNT = quantidade de linhas)
function resumo() {
    var instrucaoSql = `
        SELECT
            (SELECT COUNT(*) FROM track) AS totalTracks,
            (SELECT COUNT(*) FROM track WHERE MONTH(data_cadastro) = MONTH(CURRENT_DATE())
                                    AND YEAR(data_cadastro) = YEAR(CURRENT_DATE())) AS tracksMesAtual,
            (SELECT COUNT(*) FROM produtor) AS totalProdutores,
            (SELECT COUNT(*) FROM vertente) AS totalVertentes;
    `;
    return database.executar(instrucaoSql);
}

// Tracks mais acessadas nos últimos 7 dias (JOIN junta as tabelas; GROUP BY agrupa por track)
function emAlta() {
    var instrucaoSql = `
        SELECT t.id_track AS id, t.nome AS track, p.nome AS produtor, t.link,
               COUNT(a.id_acesso) AS acessos
        FROM acesso a
        JOIN track t ON t.id_track = a.fk_track
        JOIN produtor p ON p.id_produtor = t.fk_produtor
        WHERE a.data_acesso >= NOW() - INTERVAL 7 DAY
        GROUP BY t.id_track, t.nome, p.nome, t.link
        ORDER BY acessos DESC
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

// Últimas tracks cadastradas (mais recente primeiro)
function ultimas() {
    var instrucaoSql = `
        SELECT t.id_track AS id, t.nome AS track, p.nome AS produtor, v.nome AS vertente,
               t.link, t.data_cadastro
        FROM track t
        JOIN produtor p ON p.id_produtor = t.fk_produtor
        JOIN vertente v ON v.id_vertente = t.fk_vertente
        ORDER BY t.data_cadastro DESC
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

// Produtores com mais tracks no catálogo
function topProdutores() {
    var instrucaoSql = `
        SELECT p.nome, COUNT(t.id_track) AS total
        FROM produtor p
        JOIN track t ON t.fk_produtor = p.id_produtor
        GROUP BY p.id_produtor, p.nome
        ORDER BY total DESC
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

// Produtores mais acessados nos últimos 7 dias
function produtoresAcessados() {
    var instrucaoSql = `
        SELECT p.nome, COUNT(a.id_acesso) AS total
        FROM acesso a
        JOIN track t ON t.id_track = a.fk_track
        JOIN produtor p ON p.id_produtor = t.fk_produtor
        WHERE a.data_acesso >= NOW() - INTERVAL 7 DAY
        GROUP BY p.id_produtor, p.nome
        ORDER BY total DESC
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

// Quantidade de tracks por vertente (para o gráfico de barras)
function porVertente() {
    var instrucaoSql = `
        SELECT v.nome, COUNT(t.id_track) AS total
        FROM vertente v
        JOIN track t ON t.fk_vertente = v.id_vertente
        GROUP BY v.id_vertente, v.nome
        ORDER BY total DESC;
    `;
    return database.executar(instrucaoSql);
}

// Evolução do catálogo: conta quantas tracks foram cadastradas em cada mês (últimos 6 meses)
function evolucaoCatalogo() {
    var instrucaoSql = `
        SELECT
            YEAR(data_cadastro) AS ano,
            MONTH(data_cadastro) AS mes,
            COUNT(*) AS total
        FROM track
        WHERE data_cadastro >= DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 5 MONTH), '%Y-%m-01')
        GROUP BY YEAR(data_cadastro), MONTH(data_cadastro)
        ORDER BY YEAR(data_cadastro), MONTH(data_cadastro);
    `;
    return database.executar(instrucaoSql);
}

// Registra o clique em "Ouvir". Os ids já foram validados como números no controller
function acessar(idUsuario, idTrack) {
    var instrucaoSql = `
        INSERT INTO acesso (fk_usuario, fk_track) VALUES (${idUsuario}, ${idTrack});
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    resumo,
    emAlta,
    ultimas,
    topProdutores,
    produtoresAcessados,
    porVertente,
    evolucaoCatalogo,
    acessar
};
