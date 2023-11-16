import Produto  from "../Modelo/Produto.js";
import conectar from "./Conexao.js";

export default class ProdutoBD{

    async incluir(produto) {
        if (produto instanceof Produto) {
          const conexao = await conectar();
      
          const sql = `
            INSERT INTO produto(
              nome,
              descricao,
              preco,
              quantidade,
              receita_idReceita,
              Categoria_idCategoria
            ) VALUES (?, ?, ?, ?, ?, ?)
          `;
      
          const valores = [
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.quantidade,
            produto.receita_idReceita,
            produto.Categoria_idCategoria,
          ];
      
          await conexao.query(sql, valores);
        }
      }

    async alterar(produto){

        if (produto instanceof Produto){
            const conexao = await conectar();
            const sql="UPDATE produto SET nome= ?, descricao= ?, quantidade= ?, preco= ?, receita_idReceita= ?, Categoria_idCategoria= ? \
            WHERE codigo_Produto=?";
            const valores = [produto.nome, produto.descricao, produto.quantidade, produto.preco,produto.receita_idReceita, produto.Categoria_idCategoria,produto.codigo_Produto];
            await conexao.query(sql, valores);
        
        }
    }

    async excluir(produto){

        if (produto instanceof Produto){
            const conexao = await conectar();
            const sql="DELETE FROM produto WHERE codigo_Produto=?";
            const valores = [produto.codigo_Produto];
            await conexao.query(sql, valores);
        }
      
        
    }

    async consultar(termo){

        const conexao = await conectar();
        const sql = 'SELECT * FROM produto LEFT JOIN categoria ON produto.Categoria_idCategoria = categoria.idCategoria LEFT JOIN receita ON produto.receita_idReceita = receita.idReceita ORDER BY `produto`.`nome` ASC';
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql,valores);
        const listaProdutos = [];
        for(const row of rows){
            const produto = new Produto(row['codigo_Produto'],row['nome'],row['descricao'],row['preco'], row['quantidade'], row['receitanome'],row['categoriaDescricao'],row['receita_idReceita'],row['Categoria_idCategoria']);
            listaProdutos.push(produto);
        }
        return listaProdutos;
    }

}