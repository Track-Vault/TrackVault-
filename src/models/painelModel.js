let database = require("../database/config");

// KPI 1: total de tracks no catálogo.
function totalTracks() {
    let instrucaoSql = `
        SELECT COUNT(*) AS totalTracks
        FROM track;
    `;
    return database.executar(instrucaoSql);
}

// KPI 4: tracks cadastradas no mês atual.
function tracksMesAtual() {
    let instrucaoSql = `
        SELECT COUNT(*) AS tracksMesAtual
        FROM track
        WHERE MONTH(data_cadastro) = MONTH(CURRENT_DATE())
          AND YEAR(data_cadastro) = YEAR(CURRENT_DATE());
    `;
    return database.executar(instrucaoSql);
}

// KPI 3: total de produtores.
function totalProdutores() {
    let instrucaoSql = `
        SELECT COUNT(*) AS totalProdutores
        FROM produtor;
    `;
    return database.executar(instrucaoSql);
}

// KPI 2: total de vertentes.
function totalVertentes() {
    let instrucaoSql = `
        SELECT COUNT(*) AS totalVertentes
        FROM vertente;
    `;
    return database.executar(instrucaoSql);
}

function vertentes() { // aqui listamos as vertentes para preencher o select da interação
    let instrucaoSql = `
        SELECT id_vertente, nome
        FROM vertente
        ORDER BY nome;
    `; // aqui montamos a consulta de vertentes com id e nome
    return database.executar(instrucaoSql); // aqui executamos a consulta no banco
}

function minhasTracks(idUsuario) { // aqui listamos as tracks cadastradas pelo usuário logado
    let instrucaoSql = `
        SELECT
            t.id_track,
            t.nome AS nome_track,
            p.nome AS nome_produtor,
            v.nome AS nome_vertente,
            t.link,
            t.data_cadastro
        FROM track t
        JOIN produtor p ON p.id_produtor = t.fk_produtor
        JOIN vertente v ON v.id_vertente = t.fk_vertente
        WHERE t.fk_usuario = ${idUsuario}
        ORDER BY t.data_cadastro DESC;
    `; // aqui montamos a consulta das tracks do usuário com produtor e vertente
    return database.executar(instrucaoSql); // aqui executamos a consulta no banco
}

function buscarProdutorPorNome(nomeProdutorTratado) { // aqui buscamos se o produtor já existe pelo nome
    let instrucaoSql = `
        SELECT id_produtor
        FROM produtor
        WHERE nome = '${nomeProdutorTratado}';
    `; // aqui montamos a consulta para localizar produtor existente
    return database.executar(instrucaoSql); // aqui executamos a consulta no banco
}

function inserirProdutor(nomeProdutorTratado) { // aqui inserimos um produtor novo quando ele ainda não existe
    let instrucaoSql = `
        INSERT INTO produtor (nome)
        VALUES ('${nomeProdutorTratado}');
    `; // aqui montamos o insert do produtor
    return database.executar(instrucaoSql); // aqui executamos o insert do produtor
}

function inserirTrack(nomeTrackTratado, linkTrackTratado, idProdutor, idVertente, idUsuario) { // aqui inserimos a track vinculada ao usuário, produtor e vertente
    let instrucaoSql = `
        INSERT INTO track (nome, link, fk_produtor, fk_vertente, fk_usuario)
        VALUES ('${nomeTrackTratado}', '${linkTrackTratado}', ${idProdutor}, ${idVertente}, ${idUsuario});
    `; // aqui montamos o insert da track para alimentar Minhas Tracks e dashboard
    return database.executar(instrucaoSql); // aqui executamos o insert da track
}

function cadastrarTrack(nomeTrack, nomeProdutor, idVertente, linkTrack, idUsuario) { // aqui encadeamos o processo de cadastro de produtor + track
    let nomeTrackTratado = String(nomeTrack).replaceAll("'", "''"); // aqui tratamos aspas simples no nome da track para evitar erro SQL
    let nomeProdutorTratado = String(nomeProdutor).replaceAll("'", "''"); // aqui tratamos aspas simples no nome do produtor para evitar erro SQL
    let linkTrackTratado = String(linkTrack).replaceAll("'", "''"); // aqui tratamos aspas simples no link para evitar erro SQL

    return buscarProdutorPorNome(nomeProdutorTratado) // aqui começamos buscando se o produtor já existe
        .then(function (resultadoProdutor) { // aqui tratamos o retorno da busca do produtor
            if (resultadoProdutor.length > 0) { // aqui verificamos se já existe produtor com esse nome
                let idProdutorExistente = Number(resultadoProdutor[0].id_produtor); // aqui pegamos o id do produtor existente
                return inserirTrack(nomeTrackTratado, linkTrackTratado, idProdutorExistente, idVertente, idUsuario); // aqui inserimos a track usando produtor existente
            } else { // aqui tratamos quando o produtor ainda não existe
                return inserirProdutor(nomeProdutorTratado) // aqui inserimos o produtor novo no banco
                    .then(function (resultadoInsertProdutor) { // aqui pegamos o retorno do insert do produtor
                        let idProdutorNovo = Number(resultadoInsertProdutor.insertId); // aqui obtemos o id do produtor que acabou de ser criado
                        return inserirTrack(nomeTrackTratado, linkTrackTratado, idProdutorNovo, idVertente, idUsuario); // aqui inserimos a track com o produtor novo
                    });
            }
        });
}

// Tracks mais acessadas nos últimos 7 dias (JOIN junta as tabelas; GROUP BY agrupa por track)
function emAlta() {
    let instrucaoSql = `
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
    let instrucaoSql = `
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
    let instrucaoSql = `
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
    let instrucaoSql = `
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
    let instrucaoSql = `
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
    let instrucaoSql = `
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
    let instrucaoSql = `
        INSERT INTO acesso (fk_usuario, fk_track) VALUES (${idUsuario}, ${idTrack});
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    totalTracks,
    tracksMesAtual,
    totalProdutores,
    totalVertentes,
    vertentes,
    minhasTracks,
    cadastrarTrack,
    emAlta,
    ultimas,
    topProdutores,
    produtoresAcessados,
    porVertente,
    evolucaoCatalogo,
    acessar
};
