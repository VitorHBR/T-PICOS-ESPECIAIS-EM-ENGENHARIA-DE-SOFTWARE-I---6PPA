import FuncionarioBD from "../Persistencia/FuncionarioBD.js";

export default class Funcionario {
    #idFuncionario; 
    #nome_funcionario;
    #endereco;
    #telefone;
    #email;
    #senha;

    constructor(idFuncionario , nome_funcionario, endereco, telefone, email, senha) {
        this.#idFuncionario = idFuncionario;
        this.#nome_funcionario = nome_funcionario;
        this.#endereco = endereco;
        this.#telefone = telefone;
        this.#email = email;
        this.#senha = senha;
    }

    get idFuncionario() {
        return this.#idFuncionario;
    }

    get nome_funcionario() {
        return this.#nome_funcionario;
    }

    set nome_funcionario(novoNome) {
        this.#nome_funcionario = novoNome;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        if (novoEndereco != "") //regra de negócio que impede que exista funcionarios com o nome_funcionario vazio.
            this.#nome_funcionario = novoEndereco;
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

    get senha(){

        return this.#senha
    }

    set senha(novaSenha){
        
        this.#senha = novaSenha
    }




    //override ou sobrescrita do método toJSON
    toJSON(){
        return{
            "idFuncionario"       : this.#idFuncionario,
            "nome_funcionario"      : this.#nome_funcionario,
            "endereco"  : this.#endereco,
            "telefone"  : this.#telefone,
            "email"     : this.#email,
        }
        
    }

    async gravar(){
        const funcionarioBD = new FuncionarioBD();
        await funcionarioBD.incluir(this);

    }

    async atualizar(){
        const funcionarioBD = new FuncionarioBD();
        await funcionarioBD.alterar(this);

    }

    async remover(){
        const funcionarioBD = new FuncionarioBD();
        await funcionarioBD.excluir(this);
    }

    async consultar(termo){
        const funcionarioBD = new FuncionarioBD();
        const funcionarios = await funcionarioBD.consultar(termo);
        return funcionarios;
    }

}