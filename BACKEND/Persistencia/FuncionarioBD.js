import Funcionario  from "../Modelo/Funcionario.js";
import conectar from "./Conexao.js";

export default class FuncionarioBD{

    async incluir(funcionario){

        if (funcionario instanceof Funcionario){
            const conexao = await conectar();
            const sql="INSERT INTO funcionario(idFuncionario, nome_funcionario, endereco, telefone, email, senha) VALUES(?,?,?,?,?,?)";
            const valores = [funcionario.idFuncionario, funcionario.nome_funcionario, funcionario.endereco, funcionario.telefone, funcionario.email, funcionario.senha];
            await conexao.query(sql, valores);
        }

    }

    async alterar(funcionario){

        if (funcionario instanceof Funcionario){
            const conexao = await conectar();
            const sql="UPDATE funcionario SET nome_funcionario= ?, endereco= ?, telefone= ?, email= ?, senha= ? \
            WHERE idFuncionario=?";
            const valores = [funcionario.nome_funcionario, funcionario.endereco, funcionario.telefone, funcionario.email,funcionario.senha ,funcionario.idFuncionario];
            await conexao.query(sql, valores);
        
        }
    }

    async excluir(funcionario){

        if (funcionario instanceof Funcionario){
            const conexao = await conectar();
            const sql="DELETE FROM funcionario WHERE idFuncionario=?";
            const valores = [funcionario.idFuncionario];
            await conexao.query(sql, valores);
        }
      
        
    }

    async consultar(termo){

        const conexao = await conectar();
        const sql = "SELECT * FROM funcionario WHERE nome_funcionario LIKE ?"
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql,valores);
        const listaFuncionarios = [];
        for(const row of rows){
            const funcionario = new Funcionario(row['idFuncionario'],row['nome_funcionario'],row['endereco'],row['telefone'],row['email']);
            listaFuncionarios.push(funcionario);
        }
        return listaFuncionarios;
    }


    async autenticarFuncionario (usuario, senha) {
        //console.log('cheguei aqui banco '+ usuario+' '+ senha);
        const conexao = await conectar();
        const sql = "SELECT * FROM `funcionario` WHERE `email` LIKE '"+usuario+"' AND `senha` LIKE '"+senha+"'";
       
        var row = await conexao.query(sql);
        console.log(row[0]);
        console.log(row.length);
        if(row.length > 0)
            return row[0];
        else 
            return null;
    }


}