// VendaController.js
import VendaModel from "../Modelo/Venda.js";

export default class VendaCTRL {
    async finalizarVenda(req, res) {
        try {
            const { date, total, formapagamento, cliente_cpf_Cliente
                , produtos, funcionario } = req.body;

            // Cria uma instância do modelo de Venda
            const venda = new VendaModel(null, date, formapagamento, cliente_cpf_Cliente
                , total, produtos, funcionario);

            // Realiza o cadastro da venda e obtém o resultado
            const resultadoCadastro = await venda.gravar();

            res.json({
                status: true,
                mensagem: "Venda registrada com sucesso!",
                vendaId: resultadoCadastro.insertId, // Adiciona o ID da venda ao retorno
            });
        } catch (erro) {
            console.error('Erro ao finalizar a venda:', erro.message);
            res.json({
                status: false,
                mensagem: "Erro ao finalizar a venda: " + erro.message
            });
        }
    }
}