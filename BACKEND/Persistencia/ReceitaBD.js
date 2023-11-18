import Receita  from "../Modelo/Receita.js";
import conectar from "./Conexao.js";

export default class ReceitaBD{

    async incluir(receita){

        if (receita instanceof Receita){
            const conexao = await conectar();
            const sql="INSERT INTO receita(idReceita, receitanome, receitadescricao, modoPreparo) VALUES(?,?,?,?)";
            const valores = [receita.idReceita, receita.receitanome, receita.receitadescricao, receita.modoPreparo, receita.email, receita.senha];
            await conexao.query(sql, valores);
        }

    }

    async alterar(receita){

        if (receita instanceof Receita){
            const conexao = await conectar();
            const sql="UPDATE receita SET receitanome= ?, receitadescricao= ?, modoPreparo= ? \
            WHERE idReceita=?";
            const valores = [receita.receitanome, receita.receitadescricao, receita.modoPreparo,receita.idReceita];
            await conexao.query(sql, valores);
        
        }
    }

    async excluir(receita){

        if (receita instanceof Receita){
            const conexao = await conectar();
            const sql="DELETE FROM receita WHERE idReceita=?";
            const valores = [receita.idReceita];
            await conexao.query(sql, valores);
        }
      
        
    }

    async consultar(termo){

        const conexao = await conectar();
        const sql = "SELECT * FROM receita WHERE receitanome LIKE ?"
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql,valores);
        const listaReceitas = [];
        for(const row of rows){
            const receita = new Receita(row['idReceita'],row['receitanome'],row['receitadescricao'],row['modoPreparo']);
            listaReceitas.push(receita);
        }
        return listaReceitas;
    }

}