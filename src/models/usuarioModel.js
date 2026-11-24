var database = require("../database/config");
 
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL - autenticar():", email);
    // Consulta direta usando a coluna tipo_usuario já existente no banco.
    var instrucaoSql = `
        SELECT id_usuario, nome, email, tipo_usuario
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); // aqui mantemos apenas a execução direta do SELECT sem fallback
}
 
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL - cadastrar():", nome, email);
    // tipo_usuario não precisa ser enviado: o banco usa o padrão 'usuario'
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
 
module.exports = {
    autenticar,
    cadastrar
};
