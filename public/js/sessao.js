// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome; // aqui usamos o id direto da página sem document.getElementById
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    div_aguardar.style.display = "flex"; // aqui usamos o id direto para exibir o loading
}

function finalizarAguardar(texto) {
    div_aguardar.style.display = "none"; // aqui usamos o id direto para ocultar o loading

    if (texto) {
        div_erros_login.style.display = "flex"; // aqui deixamos a referência ao erro dentro do if (texto)
        div_erros_login.innerHTML = texto; // aqui exibimos a mensagem de erro apenas quando há texto
    }
}

