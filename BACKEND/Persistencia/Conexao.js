import mysql from 'mysql2/promise';

let conexao;

export default async function conectar() {
    if (conexao && conexao.state !== "disconnected") {
        return conexao;
    }

    conexao = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "padaria"
    });

    return conexao;
}