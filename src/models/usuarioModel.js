var database = require("../database/config");
 
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL - autenticar():", email);
    // Tentativa padrão: usa a coluna tipo_usuario quando ela existe no banco.
    var instrucaoSql = `
        SELECT id_usuario, nome, email, tipo_usuario
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .catch(function (erro) {
            // Compatibilidade com banco antigo: alguns ambientes não têm a coluna tipo_usuario.
            // Nesse caso, refazemos o SELECT sem depender da coluna e devolvemos "usuario" por padrão.
            if (erro && erro.code == "ER_BAD_FIELD_ERROR" && String(erro.sqlMessage).includes("tipo_usuario")) {
                var instrucaoFallback = `
                    SELECT id_usuario, nome, email, 'usuario' AS tipo_usuario
                    FROM usuario
                    WHERE email = '${email}' AND senha = '${senha}';
                `;

                console.log("Coluna tipo_usuario não encontrada. Aplicando fallback de compatibilidade.");
                console.log("Executando a instrução SQL (fallback): \n" + instrucaoFallback);

                return database.executar(instrucaoFallback);
            }

            return Promise.reject(erro);
        });
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
