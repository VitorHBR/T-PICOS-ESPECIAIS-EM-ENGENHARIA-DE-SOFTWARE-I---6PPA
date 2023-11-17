import VendaBD from "../Persistencia/VendaBD.js";

export default class Venda {
    #idVenda;
    #data_hora;
    #forma_pagamento;
    #cliente_cpf_Cliente;
    #total;
    #produtos;
    #funcionario_idFuncionario;

    constructor(idVenda, data_hora, forma_pagamento, cliente_cpf_Cliente, total, produtos, funcionario_idFuncionario) {
        this.#idVenda = idVenda;
        this.#data_hora = data_hora;
        this.#forma_pagamento = forma_pagamento;
        this.#cliente_cpf_Cliente = cliente_cpf_Cliente;
        this.#total = total;
        this.#produtos = produtos;
        this.#funcionario_idFuncionario = funcionario_idFuncionario;
    }

    get idVenda() {
        return this.#idVenda;
    }

    get data_hora() {
        return this.#data_hora;
    }

    set data_hora(novaData) {
        this.#data_hora = novaData;
    }

    get forma_pagamento(){
        return this.#forma_pagamento;
    }

    set forma_pagamento(novaFormaPagamento){
        this.#forma_pagamento = novaFormaPagamento;
    }

    get cliente_cpf_Cliente(){
        return this.#cliente_cpf_Cliente;
    }

    set cliente_cpf_Cliente(novoClienteCpf){
        this.#cliente_cpf_Cliente = novoClienteCpf;
    }

    get total(){
        return this.#total;
    }

    set total(novoTotal){
        this.#total = novoTotal;
    }

    get produtos(){
        return this.#produtos;
    }

    set produtos(novosProdutos){
        this.#produtos = novosProdutos;
    }

    get funcionario_idFuncionario(){
        return this.#funcionario_idFuncionario;
    }

    set funcionario_idFuncionario(novoIdFuncionario){
        this.#funcionario_idFuncionario = novoIdFuncionario;
    }

    async gravar() {
        const vendaBD = new VendaBD();
        await vendaBD.incluir(this);
    }

}