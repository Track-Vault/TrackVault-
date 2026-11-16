var express = require("express");
var router = express.Router();

var painelController = require("../controllers/painelController");

// Rotas do dashboard (todas começam com /painel, definido no app.js)

// GET: devolvem dados para os cards e gráficos
router.get("/resumo", function (req, res) {
    painelController.resumo(req, res);
});

router.get("/em-alta", function (req, res) {
    painelController.emAlta(req, res);
});

router.get("/ultimas", function (req, res) {
    painelController.ultimas(req, res);
});

router.get("/top-produtores", function (req, res) {
    painelController.topProdutores(req, res);
});

router.get("/produtores-acessados", function (req, res) {
    painelController.produtoresAcessados(req, res);
});

router.get("/por-vertente", function (req, res) {
    painelController.porVertente(req, res);
});

// Evolução mensal dos cadastros de tracks (últimos 6 meses)
router.get("/evolucao-catalogo", function (req, res) {
    painelController.evolucaoCatalogo(req, res);
});

// POST: registra que o usuário clicou em "Ouvir" (o :id é o id da track)
router.post("/acessar/:id", function (req, res) {
    painelController.acessar(req, res);
});

module.exports = router;
