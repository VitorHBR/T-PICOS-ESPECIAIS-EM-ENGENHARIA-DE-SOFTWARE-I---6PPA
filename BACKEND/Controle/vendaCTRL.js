// VendaController.js
import VendaModel from "../Modelo/Venda.js";

export default class VendaCTRL {
    async finalizarVenda(req, res) {
        try {
            const { date, total, formapagamento, cliente, produtos, funcionario } = req.body;

            // Cria uma instância do modelo de Venda
            const venda = new VendaModel(null, date, formapagamento, cliente, total, produtos, funcionario);

            // Realiza o cadastro da venda
            await venda.gravar();

            res.json({
                status: true,
                mensagem: "Venda registrada com sucesso!"
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


