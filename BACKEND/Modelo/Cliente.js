import ClienteBD from "../Persistencia/ClienteBD.js";

export default class Cliente{
    #idCliente;
    #cpf_Cliente; // define que um atributo seja privado
    #nome;
    #endereco;
    #telefone;
    #email;

    //metodo construtor que define as informações necessarias para criar um  cliente
    constructor(idCliente, cpf_Cliente,nome, endereco, telefone, email){
        this.#idCliente = idCliente;
        this.#cpf_Cliente = cpf_Cliente;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#telefone = telefone;
        this.#email = email;
    }

    get idCliente(){
        return this.#idCliente
    }

    get cpf_Cliente(){
        return this.#cpf_Cliente
    }

    set cpf_Cliente(novoCpf){
        
        this.#cpf_Cliente = novoCpf
    }

    
    get nome(){
        return this.#nome
    }

    set nome(novoNome){
        
        this.#nome = novoNome
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        if (novoEndereco != "") 
            this.#nome = novoEndereco;
    }


    get telefone(){
        return this.#telefone
    }

    set telefone(novoTelefone){
        
        this.#telefone = novoTelefone
    }

    get email(){

        return this.#email
    }

    set email(novoEmail){
        
        this.#email = novoEmail
    }




    //override ou sobrescrita do método toJSON
    toJSON(){
        return{
            "idCliente"       : this.#idCliente,
            "cpf_Cliente"       : this.#cpf_Cliente,
            "nome"      : this.#nome,
            "endereco"  : this.#endereco,
            "telefone"  : this.#telefone,
            "email"     : this.#email,
        }
        
    }

    async gravar(){
        const clienteBD = new ClienteBD();
        await clienteBD.incluir(this);

    }

    async atualizar(){
        const clienteBD = new ClienteBD();
        await clienteBD.alterar(this);

    }

    async remover(){
        const clienteBD = new ClienteBD();
        await clienteBD.excluir(this);
    }

    async consultar(termo){
        const clienteBD = new ClienteBD();
        const clientes = await clienteBD.consultar(termo);
        return clientes;
    }
}