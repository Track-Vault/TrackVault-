var painelModel = require("../models/painelModel");

// Função auxiliar: pega a promessa do model e responde o JSON (ou o erro)
// Assim não repetimos o mesmo then/catch em todas as rotas
function responder(res, promessa) {
    promessa
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro no painel: ", erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar os dados do painel");
        });
}

function resumo(req, res) {
    // o resumo volta como lista com 1 linha; o front espera só o objeto
    painelModel.resumo()
        .then(function (resultado) {
            res.json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("Erro no painel: ", erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar o resumo");
        });
}

function emAlta(req, res) {
    responder(res, painelModel.emAlta());
}

function ultimas(req, res) {
    responder(res, painelModel.ultimas());
}

function topProdutores(req, res) {
    responder(res, painelModel.topProdutores());
}

function produtoresAcessados(req, res) {
    responder(res, painelModel.produtoresAcessados());
}

function porVertente(req, res) {
    responder(res, painelModel.porVertente());
}

// Devolve a série mensal (últimos 6 meses) para o gráfico de evolução
function evolucaoCatalogo(req, res) {
    responder(res, painelModel.evolucaoCatalogo());
}

function acessar(req, res) {
    var idTrack = Number(req.params.id);
    var idUsuario = Number(req.body.idUsuarioServer);

    // Number() vira NaN se não for número; isInteger garante que é um número inteiro
    if (!Number.isInteger(idTrack) || !Number.isInteger(idUsuario)) {
        res.status(400).send("Track ou usuário inválido!");
    } else {
        responder(res, painelModel.acessar(idUsuario, idTrack));
    }
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
