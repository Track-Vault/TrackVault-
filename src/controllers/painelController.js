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

function vertentes(req, res) { // aqui listamos as vertentes para preencher o select da tela de interação
    painelModel.vertentes() // aqui chamamos o model que consulta as vertentes no banco
        .then(function (resultado) { // aqui tratamos sucesso da consulta de vertentes
            res.json(resultado); // aqui devolvemos a lista de vertentes em JSON
        })
        .catch(function (erro) { // aqui tratamos erro na consulta de vertentes
            console.log("Erro no painel: ", erro); // aqui registramos o erro no console do servidor
            res.status(500).json(erro.sqlMessage || "Erro ao buscar vertentes"); // aqui devolvemos mensagem de erro para o front
        });
}

function minhasTracks(req, res) { // aqui listamos as tracks pertencentes ao usuário logado
    let idUsuario = Number(req.params.idUsuario); // aqui convertimos o id vindo da rota para número

    if (idUsuario <= 0) { // aqui validamos se o id do usuário é válido
        res.status(400).send("Usuário inválido!"); // aqui devolvemos erro quando o id do usuário não é válido
    } else { // aqui seguimos para a consulta quando o id é válido
        painelModel.minhasTracks(idUsuario) // aqui chamamos o model para buscar as tracks desse usuário
            .then(function (resultado) { // aqui tratamos sucesso da consulta
                res.json(resultado); // aqui devolvemos a lista de tracks em JSON
            })
            .catch(function (erro) { // aqui tratamos erro ao consultar as tracks
                console.log("Erro no painel: ", erro); // aqui registramos o erro no console do servidor
                res.status(500).json(erro.sqlMessage || "Erro ao buscar tracks do usuário"); // aqui devolvemos mensagem de erro para o front
            });
    }
}

function cadastrarTrack(req, res) { // aqui recebemos e validamos os dados para cadastrar uma track
    let nomeTrack = req.body.nomeTrackServer; // aqui recebemos o nome da track enviado pelo front
    let nomeProdutor = req.body.produtorTrackServer; // aqui recebemos o nome do produtor enviado pelo front
    let idVertente = Number(req.body.idVertenteServer); // aqui recebemos e convertemos o id da vertente
    let linkTrack = req.body.linkTrackServer; // aqui recebemos o link da track enviado pelo front
    let idUsuario = Number(req.body.idUsuarioServer); // aqui recebemos e convertemos o id do usuário da sessão

    if (nomeTrack == undefined || nomeProdutor == undefined || linkTrack == undefined) { // aqui validamos se os campos de texto vieram definidos
        res.status(400).send("Dados da track inválidos!"); // aqui devolvemos erro quando falta algum dado obrigatório
    } else if (nomeTrack == "" || nomeProdutor == "" || linkTrack == "") { // aqui validamos se os campos de texto não estão vazios
        res.status(400).send("Preencha todos os campos da track!"); // aqui devolvemos erro quando algum campo está vazio
    } else if (idVertente <= 0 || idUsuario <= 0) { // aqui validamos se ids de vertente e usuário são válidos
        res.status(400).send("Vertente ou usuário inválido!"); // aqui devolvemos erro quando ids são inválidos
    } else { // aqui seguimos para o cadastro quando os dados estão válidos
        painelModel.cadastrarTrack(nomeTrack, nomeProdutor, idVertente, linkTrack, idUsuario) // aqui chamamos o model para cadastrar produtor/track
            .then(function (resultado) { // aqui tratamos sucesso do cadastro
                res.json(resultado); // aqui devolvemos o resultado do insert para o front
            })
            .catch(function (erro) { // aqui tratamos erro no cadastro da track
                console.log("Erro no painel: ", erro); // aqui registramos o erro no console do servidor
                res.status(500).json(erro.sqlMessage || "Erro ao cadastrar track"); // aqui devolvemos mensagem de erro para o front
            });
    }
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
    topProdutores,
    produtoresAcessados,
    porVertente,
    evolucaoCatalogo,
    vertentes,
    minhasTracks,
    cadastrarTrack,
    acessar
};
