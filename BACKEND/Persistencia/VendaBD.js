import conectar from "./Conexao.js";

export default class VendaBD {
    async incluir(venda) {
        if (!venda) {
            return;
        }

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

        const [rowsVenda] = await conexao.execute(vendaSQL, valoresVenda);

        for (const produto of venda.produtos) {
            await this.inserirVendaProduto(conexao, rowsVenda.insertId, produto);
            await this.atualizarEstoqueProduto(conexao, produto);
        }

        return rowsVenda;
    }

    async inserirVendaProduto(conexao, vendaId, produto) {
        const vendaHasProdutoSQL = `
            INSERT INTO venda_has_produto (
                venda_idVenda,
                produto_codigo_Produto,
                venda_quantidade,
                valor_unitario
            ) VALUES (?, ?, ?, ?)
        `;

        const valoresVendaHasProduto = [
            vendaId,
            produto.produto,
            produto.quantidade,
            produto.valor / produto.quantidade
        ];

        await conexao.execute(vendaHasProdutoSQL, valoresVendaHasProduto);
    }

    async atualizarEstoqueProduto(conexao, produto) {
        const atualizaEstoqueSQL = `
            UPDATE produto
            SET quantidade = quantidade - ?
            WHERE codigo_Produto = ?
        `;

        const valoresAtualizaEstoque = [produto.quantidade, produto.produto];

        await conexao.execute(atualizaEstoqueSQL, valoresAtualizaEstoque);
    }
}
