import ProdutoBD from "../Persistencia/ProdutoBD.js";

export default class Produto {
    #codigo_Produto; 
    #nome;
    #descricao;
    #preco;
    #quantidade;
    #receita_idReceita;
    #Categoria_idCategoria;

    constructor(codigo_Produto , nome, descricao, preco, quantidade, receita_idReceita, Categoria_idCategoria) {
        this.#codigo_Produto = codigo_Produto;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#preco = preco;
        this.#quantidade = quantidade;
        this.#receita_idReceita = receita_idReceita;
        this.#Categoria_idCategoria = Categoria_idCategoria;

    }

    get codigo_Produto() {
        return this.#codigo_Produto;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        if (novaDescricao != "") 
            this.#nome = novaDescricao;
    }


    get preco(){
        return this.#preco
    }

    set preco(novoPreco){
        
        this.#preco = novoPreco
    }

    get quantidade(){

        return this.#quantidade
    }

    set quantidade(novoEmail){
        
        this.#quantidade = novoEmail
    }

    get receita_idReceita(){

        return this.#receita_idReceita
    }

    set receita_idReceita(novoIdReceeita){
        
        this.#receita_idReceita = novoIdReceeita
    }

    get Categoria_idCategoria(){

        return this.#Categoria_idCategoria
    }

    set Categoria_idCategoria(novoIdCategoria  ){
        
        this.#Categoria_idCategoria = novoIdCategoria
    }




    //override ou sobrescrita do método toJSON
    toJSON(){
        return{
            "codigo_Produto"       : this.#codigo_Produto,
            "nome"      : this.#nome,
            "descricao"  : this.#descricao,
            "preco"  : this.#preco,
            "quantidade"     : this.#quantidade,
            "receita_idReceita"     : this.#receita_idReceita,
            "Categoria_idCategoria"     : this.#Categoria_idCategoria,

        }
        
    }

    async gravar(){
        const produtoBD = new ProdutoBD();
        await produtoBD.incluir(this);

    }

    async atualizar(){
        const produtoBD = new ProdutoBD();
        await produtoBD.alterar(this);

    }

    async remover(){
        const produtoBD = new ProdutoBD();
        await produtoBD.excluir(this);
    }

    async consultar(termo){
        const produtoBD = new ProdutoBD();
        const produtos = await produtoBD.consultar(termo);
        return produtos;
    }

}