import Funcionario from "../Modelo/Funcionario.js";

// a nossa camada de controle tem a responsabilitade de traduzir requisições http em comando da API
export default class FuncionarioCTRL{

    gravar(requisicao, resposta){
        resposta.type('aplication/json');
        //resposta.headers('Content-type','application/json');
        //no cabeçalho da requisição a propriedade Content -Type: application/json
        if (requisicao.method = "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome_funcionario = dados.nome_funcionario; 
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            const email = dados.email;
            const senha = dados.senha;
            if (nome_funcionario && endereco  && telefone && email && senha){

                const funcionario = new Funcionario(null, nome_funcionario, endereco, telefone, email, senha)
                funcionario.gravar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Funcionario adicionado com sucesso!!"
                    });
                    
                }).catch((erro)=>{//funcoes de callback
                    resposta.json({
                        status:false,
                        mensagem:"Não foi possivel gravar o funcionario: " + erro.message
                    });
                });          
            }
            else {//faltam dados para o funcionario
                resposta.json({
                    status:false,
                    mensagem: "Informe todos os dados do funcionario. Verifique a documentação da API."
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
            const idFuncionario = dados.idFuncionario;
            const nome_funcionario = dados.nome_funcionario; 
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            const email = dados.email;
            const senha = dados.senha;
            if (idFuncionario && nome_funcionario && endereco && telefone && email && senha){

                const funcionario = new Funcionario(idFuncionario, nome_funcionario, endereco, telefone, email, senha)
                funcionario.atualizar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Funcionario atualizado com sucesso!!"
                    });
                    
                }).catch((erro)=>{
                    resposta.json({
                        status:false,
                        mensagem:"Não foi possivel atualizar o funcionario: " + erro.message
                    });
                });          
            }
            else {//faltam dados para o funcionario
                resposta.json({
                    status:false,
                    mensagem: "Informe todos os dados do funcionario. Verifique a documentação da API."
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
            const idFuncionario = dados.idFuncionario;
            
            if (idFuncionario){
                    const funcionario = new Funcionario(idFuncionario);
                    funcionario.remover().then(()=>{
                        resposta.json({
                            status:true,
                            mensagem:"Funcionario excluido com sucesso!!"
                        });
                        
                    }).catch((erro)=>{//funcoes de callback
                        resposta.json({
                            status:false,
                            mensagem:"Não foi possivel excluir o funcionario: " + erro.message
                        });
                    });
                               
            }
            else {//faltam dados para o funcionario
                resposta.json({
                    status:false,
                    mensagem: "Informe o idFuncionario do funcionario. Verifique a documentação da API."
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
            const funcionario = new Funcionario();
            funcionario.consultar("").then((listaFuncionarios)=>{
                resposta.json(listaFuncionarios);
            }).catch((erro)=>{
                resposta.json({
                    status:"false",
                    mensagem:"Falha ao obter funcionarios: " + erro.message
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

