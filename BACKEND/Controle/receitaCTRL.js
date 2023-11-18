import Receita from "../Modelo/Receita.js";

// a nossa camada de controle tem a responsabilitade de traduzir requisições http em comando da API
export default class ReceitaCTRL{

    gravar(requisicao, resposta){
        resposta.type('aplication/json');
        //resposta.headers('Content-type','application/json');
        //no cabeçalho da requisição a propriedade Content -Type: application/json
        if (requisicao.method = "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const receitanome = dados.receitanome; 
            const receitadescricao = dados.receitadescricao;
            const modoPreparo = dados.modoPreparo;
            
            if (receitanome && receitadescricao  && modoPreparo){

                const receita = new Receita(null, receitanome, receitadescricao, modoPreparo)
                receita.gravar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Receita adicionado com sucesso!!"
                    });
                    
                }).catch((erro)=>{//funcoes de callback
                    resposta.json({
                        status:false,
                        mensagem:"Não foi possivel gravar o receita: " + erro.message
                    });
                });          
            }
            else {//faltam dados para o receita
                resposta.json({
                    status:false,
                    mensagem: "Informe todos os dados do receita. Verifique a documentação da API."
                });
            }

        }//requisição não é POST ou não possui dados no formato JSON
        else{
            resposta.json({
                status:false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            });
        }

    }

    atualizar(requisicao, resposta){
        resposta.type('aplication/json');
        //resposta.headers('Content-type','application/json');
        //no cabeçalho da requisição a propriedade Content -Type: application/json
        if (requisicao.method === "PUT" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const idReceita = dados.idReceita;
            const receitanome = dados.receitanome; 
            const receitadescricao = dados.receitadescricao;
            const modoPreparo = dados.modoPreparo;
          
            if (idReceita && receitanome && receitadescricao && modoPreparo){

                const receita = new Receita(idReceita, receitanome, receitadescricao, modoPreparo)
                receita.atualizar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Receita atualizado com sucesso!!"
                    });
                    
                }).catch((erro)=>{
                    resposta.json({
                        status:false,
                        mensagem:"Não foi possivel atualizar o receita: " + erro.message
                    });
                });          
            }
            else {//faltam dados para o receita
                resposta.json({
                    status:false,
                    mensagem: "Informe todos os dados do receita. Verifique a documentação da API."
                });
            }

        }//requisição não é PUT ou não possui dados no formato JSON
        else{
            resposta.json({
                status:false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            });
        }

    }
    excluir(requisicao, resposta){
        resposta.type('aplication/json');
        //resposta.headers('Content-type','application/json');
        //no cabeçalho da requisição a propriedade Content -Type: application/json
        if (requisicao.method = "DELETE" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const idReceita = dados.idReceita;
            
            if (idReceita){
                    const receita = new Receita(idReceita);
                    receita.remover().then(()=>{
                        resposta.json({
                            status:true,
                            mensagem:"Receita excluido com sucesso!!"
                        });
                        
                    }).catch((erro)=>{//funcoes de callback
                        resposta.json({
                            status:false,
                            mensagem:"Não foi possivel excluir o receita: " + erro.message
                        });
                    });
                               
            }
            else {//faltam dados para o receita
                resposta.json({
                    status:false,
                    mensagem: "Informe o idReceita do receita. Verifique a documentação da API."
                });
            }

        }//requisição não é DELETE ou não possui dados no formato JSON
        else{
            resposta.json({
                status:false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            });
        }
        
    }
    consultar(requisicao, resposta){ 
        resposta.type('aplication/JSON');
        if(requisicao.method === "GET"){
            const receita = new Receita();
            receita.consultar("").then((listaReceitas)=>{
                resposta.json(listaReceitas);
            }).catch((erro)=>{
                resposta.json({
                    status:"false",
                    mensagem:"Falha ao obter receitas: " + erro.message
                });
            });

        }//requisição não é GET ou não possui dados no formato JSON
        else{
            resposta.json({
                status:false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            });
        }
    }
}

