import Cliente from "../Modelo/Cliente.js";

// a nossa camada de controle tem a responsabilitade de traduzir requisições http em comando da API
export default class ClienteCTRL{

    gravar(requisicao, resposta){
        resposta.type('aplication/json');
        //resposta.headers('Content-type','application/json');
        //no cabeçalho da requisição a propriedade Content -Type: application/json
        if (requisicao.method = "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const cpf_Cliente = dados.cpf_Cliente;
            const nome = dados.nome; // se não for identificado atribui undefined
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            const email = dados.email;
            if (cpf_Cliente && nome && endereco  && telefone && email){

                const cliente = new Cliente(null, cpf_Cliente, nome, endereco, telefone, email)
                cliente.gravar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Cliente adicionado com sucesso!!"
                    });
                    
                }).catch((erro)=>{//funcoes de callback
                    resposta.json({
                        status:false,
                        mensagem:"Não foi possivel gravar o cliente: " + erro.message
                    });
                });          
            }
            else {//faltam dados para o cliente
                resposta.json({
                    status:false,
                    mensagem: "Informe todos os dados do cliente. Verifique a documentação da API."
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
            const idCliente = dados.idCliente;
            const cpf_Cliente = dados.cpf_Cliente;
            const nome = dados.nome; // se não for identificado atribui undefined
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            const email = dados.email
            if (idCliente && cpf_Cliente && nome && endereco && telefone && email){

                const cliente = new Cliente(idCliente, cpf_Cliente, nome, endereco, telefone, email)
                cliente.atualizar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Cliente atualizado com sucesso!!"
                    });
                    
                }).catch((erro)=>{//funcoes de callback
                    resposta.json({
                        status:false,
                        mensagem:"Não foi possivel atualizar o cliente: " + erro.message
                    });
                });          
            }
            else {//faltam dados para o cliente
                resposta.json({
                    status:false,
                    mensagem: "Informe todos os dados do cliente. Verifique a documentação da API."
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
    //Ficou decidido que o um cliente será excluido se 
    //o se CPF dele for informado por meio de um objeto json
    excluir(requisicao, resposta){
        resposta.type('aplication/json');
        //resposta.headers('Content-type','application/json');
        //no cabeçalho da requisição a propriedade Content -Type: application/json
        if (requisicao.method = "DELETE" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const idCliente = dados.idCliente;
            
            if (idCliente){
                    const cliente = new Cliente(idCliente);
                    cliente.remover().then(()=>{
                        resposta.json({
                            status:true,
                            mensagem:"Cliente excluido com sucesso!!"
                        });
                        
                    }).catch((erro)=>{//funcoes de callback
                        resposta.json({
                            status:false,
                            mensagem:"Não foi possivel excluir o cliente: " + erro.message
                        });
                    });
                               
            }
            else {//faltam dados para o cliente
                resposta.json({
                    status:false,
                    mensagem: "Informe o idCliente do cliente. Verifique a documentação da API."
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
            const cliente = new Cliente();
            cliente.consultar("").then((listaClientes)=>{
                resposta.json(listaClientes);
            }).catch((erro)=>{
                resposta.json({
                    status:"false",
                    mensagem:"Falha ao obter clientes: " + erro.message
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

