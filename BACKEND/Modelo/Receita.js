import ReceitaBD from "../Persistencia/ReceitaBD.js";

export default class Receita {
    #idReceita; 
    #receitanome;
    #receitadescricao;
    #modoPreparo;


    constructor(idReceita , receitanome, receitadescricao, modoPreparo) {
        this.#idReceita = idReceita;
        this.#receitanome = receitanome;
        this.#receitadescricao = receitadescricao;
        this.#modoPreparo = modoPreparo;

    }

    get idReceita() {
        return this.#idReceita;
    }

    get receitanome() {
        return this.#receitanome;
    }

    set receitanome(novoNome) {
        this.#receitanome = novoNome;
    }

    get receitadescricao(){
        return this.#receitadescricao;
    }

    set receitadescricao(novoreceitadescricao){
        if (novoreceitadescricao != "") //regra de negócio que impede que exista receitas com o receitanome vazio.
            this.#receitanome = novoreceitadescricao;
    }


    get modoPreparo(){
        return this.#modoPreparo
    }

    set modoPreparo(novomodoPreparo){
        
        this.#modoPreparo = novomodoPreparo
    }

   




    //override ou sobrescrita do método toJSON
    toJSON(){
        return{
            "idReceita"       : this.#idReceita,
            "receitanome"      : this.#receitanome,
            "receitadescricao"  : this.#receitadescricao,
            "modoPreparo"  : this.#modoPreparo,
           
        }
        
    }

    async gravar(){
        const receitaBD = new ReceitaBD();
        await receitaBD.incluir(this);

    }

    async atualizar(){
        const receitaBD = new ReceitaBD();
        await receitaBD.alterar(this);

    }

    async remover(){
        const receitaBD = new ReceitaBD();
        await receitaBD.excluir(this);
    }

    async consultar(termo){
        const receitaBD = new ReceitaBD();
        const receitas = await receitaBD.consultar(termo);
        return receitas;
    }

}