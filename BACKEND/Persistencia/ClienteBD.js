import Cliente  from "../Modelo/Cliente.js";
import conectar from "./Conexao.js";

export default class ClienteBD{

    async incluir(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="INSERT INTO cliente(idCliente, cpf_Cliente, nome, endereco, telefone, email) VALUES(?,?,?,?,?,?)";
            const valores = [cliente.idCliente, cliente.cpf_Cliente, cliente.nome, cliente.endereco, cliente.telefone, cliente.email];
            await conexao.query(sql, valores);
        }

    }

    async alterar(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="UPDATE cliente SET nome= ?, endereco= ?, telefone= ?,  email= ?, cpf_Cliente =? \
            WHERE idCliente=?";
            const valores = [cliente.nome, cliente.endereco, cliente.telefone, cliente.email, cliente.cpf_Cliente, cliente.idCliente];
            await conexao.query(sql, valores);
        
        }
    }

    async excluir(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="DELETE FROM cliente WHERE idCliente=?";
            const valores = [cliente.idCliente];
            await conexao.query(sql, valores);
        }
      
        
    }

    async consultar(termo){

        const conexao = await conectar();
        const sql = "SELECT * FROM cliente WHERE nome LIKE ?"
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql,valores);
        const listaClientes = [];
        for(const row of rows){
            const cliente = new Cliente(row['idCliente'],row['cpf_Cliente'],row['nome'],row['endereco'],row['telefone'],row['email']);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }

}