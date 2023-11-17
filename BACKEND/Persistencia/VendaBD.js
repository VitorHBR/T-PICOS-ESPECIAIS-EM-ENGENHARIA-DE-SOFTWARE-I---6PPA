import Venda from "../Modelo/Venda.js";
import conectar from "./Conexao.js";

export default class VendaBD {
    async incluir(venda) {
        if (venda instanceof Venda) {
            const conexao = await conectar();

            // Inserção na tabela 'venda'
            const vendaSQL = `
                INSERT INTO venda (
                    data_hora,
                    valor_total,
                    forma_pagamento,
                    cliente_cpf_Cliente,
                    funcionario_idFuncionario
                ) VALUES (?, ?, ?, ?, ?)
            `;

            const valoresVenda = [
                venda.data_hora,
                venda.total,
                venda.forma_pagamento,
                venda.cliente_cpf_Cliente,
                venda.funcionario_idFuncionario
            ];

            // Verifique se a função ExecutaComando está corretamente definida em conectar
            const rowsVenda = await conexao.ExecutaComando(vendaSQL, valoresVenda);

            // Inserção na tabela 'venda_has_produto' para cada produto na venda
            for (const produto of venda.produtos) {
                const vendaHasProdutoSQL = `
                    INSERT INTO venda_has_produto (
                        venda_idVenda,
                        produto_codigo_Produto,
                        venda_quantidade,
                        valor_unitario
                    ) VALUES (?, ?, ?, ?)
                `;

                const valoresVendaHasProduto = [
                    rowsVenda.insertId,
                    produto.produto,
                    produto.quantidade,
                    produto.valor / produto.quantidade
                ];

                await conexao.ExecutaComando(vendaHasProdutoSQL, valoresVendaHasProduto);

                // Atualização de estoque
                const atualizaEstoqueSQL = `
                    UPDATE produto
                    SET quantidade = quantidade - ?
                    WHERE codigo_Produto = ?
                `;

                const valoresAtualizaEstoque = [produto.quantidade, produto.produto];

                await conexao.ExecutaComando(atualizaEstoqueSQL, valoresAtualizaEstoque);
            }
        }
    }
}