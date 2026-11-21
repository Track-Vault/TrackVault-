let painelModel = require("../models/painelModel");

function resumo(req, res) {
    let objetoResumo = {
        totalTracks: 0,
        tracksMesAtual: 0,
        totalProdutores: 0,
        totalVertentes: 0
    };

    // Busca os 4 números do resumo em sequência, mantendo o mesmo formato de JSON.
    painelModel.totalTracks()
        .then(function (resultadoTracks) {
            objetoResumo.totalTracks = resultadoTracks[0].totalTracks;

            return painelModel.tracksMesAtual();
        })
        .then(function (resultadoMesAtual) {
            objetoResumo.tracksMesAtual = resultadoMesAtual[0].tracksMesAtual;

            return painelModel.totalProdutores();
        })
        .then(function (resultadoProdutores) {
            objetoResumo.totalProdutores = resultadoProdutores[0].totalProdutores;

            return painelModel.totalVertentes();
        })
        .then(function (resultadoVertentes) {
            objetoResumo.totalVertentes = resultadoVertentes[0].totalVertentes;
            res.json(objetoResumo);
        })
        .catch(function (erro) {
            console.log("Erro no painel: ", erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar o resumo");
        });
}

function emAlta(req, res) {
    painelModel.emAlta()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro no painel: ", erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar os dados do painel");
        });
}

function ultimas(req, res) {
    painelModel.ultimas()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro no painel: ", erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar os dados do painel");
        });
}

function topProdutores(req, res) {
    painelModel.topProdutores()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro no painel: ", erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar os dados do painel");
        });
}

function produtoresAcessados(req, res) {
    painelModel.produtoresAcessados()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro no painel: ", erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar os dados do painel");
        });
}

function porVertente(req, res) {
    painelModel.porVertente()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro no painel: ", erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar os dados do painel");
        });
}

// Devolve a série mensal (últimos 6 meses) para o gráfico de evolução
function evolucaoCatalogo(req, res) {
    painelModel.evolucaoCatalogo()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro no painel: ", erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar os dados do painel");
        });
}

function acessar(req, res) {
    let idTrack = Number(req.params.id);
    let idUsuario = Number(req.body.idUsuarioServer);

    if (idTrack <= 0 || idUsuario <= 0) {
        res.status(400).send("Track ou usuário inválido!");
    } else {
        painelModel.acessar(idUsuario, idTrack)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("Erro no painel: ", erro);
                res.status(500).json(erro.sqlMessage || "Erro ao buscar os dados do painel");
            });
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
