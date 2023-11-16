import Produto from "../Modelo/Produto.js";

// a nossa camada de controle tem a responsabilitade de traduzir requisições http em comando da API
export default class ProdutoCTRL{

    gravar(requisicao, resposta){
        resposta.type('aplication/json');
        //resposta.headers('Content-type','application/json');
        //no cabeçalho da requisição a propriedade Content -Type: application/json
        if (requisicao.method = "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome; 
            const descricao = dados.descricao;
            const preco = dados.preco;
            const quantidade = dados.quantidade;
            const receita_idReceita = dados.receita_idReceita;
            const Categoria_idCategoria = dados.Categoria_idCategoria;

            if (nome && descricao  && preco && quantidade && receita_idReceita && Categoria_idCategoria){

                const produto = new Produto(null, nome, descricao, preco, quantidade, receita_idReceita, Categoria_idCategoria)
                produto.gravar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Produto adicionado com sucesso!!"
                    });
                    
                }).catch((erro)=>{//funcoes de callback
                    resposta.json({
                        status:false,
                        mensagem:"Não foi possivel gravar o produto: " + erro.message
                    });
                });          
            }
            else {//faltam dados para o produto
                resposta.json({
                    status:false,
                    mensagem: "Informe todos os dados do produto. Verifique a documentação da API."
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
            const codigo_Produto = dados.codigo_Produto;
            const nome = dados.nome; 
            const descricao = dados.descricao;
            const preco = dados.preco;
            const quantidade = dados.quantidade;
            const receita_idReceita = dados.receita_idReceita;
            const Categoria_idCategoria = dados.Categoria_idCategoria;
            if (codigo_Produto && nome && descricao && preco && quantidade && receita_idReceita, Categoria_idCategoria){

                const produto = new Produto(codigo_Produto, nome, descricao, preco, quantidade, receita_idReceita, Categoria_idCategoria)
                produto.atualizar().then(()=>{
                    resposta.json({
                        status:true,
                        mensagem:"Produto atualizado com sucesso!!"
                    });
                    
                }).catch((erro)=>{
                    resposta.json({
                        status:false,
                        mensagem:"Não foi possivel atualizar o produto: " + erro.message
                    });
                });          
            }
            else {//faltam dados para o produto
                resposta.json({
                    status:false,
                    mensagem: "Informe todos os dados do produto. Verifique a documentação da API."
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
            const codigo_Produto = dados.codigo_Produto;
            
            if (codigo_Produto){
                    const produto = new Produto(codigo_Produto);
                    produto.remover().then(()=>{
                        resposta.json({
                            status:true,
                            mensagem:"Produto excluido com sucesso!!"
                        });
                        
                    }).catch((erro)=>{//funcoes de callback
                        resposta.json({
                            status:false,
                            mensagem:"Não foi possivel excluir o produto: " + erro.message
                        });
                    });
                               
            }
            else {//faltam dados para o produto
                resposta.json({
                    status:false,
                    mensagem: "Informe o codigo_Produto do produto. Verifique a documentação da API."
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
            const produto = new Produto();
            produto.consultar("").then((listaProdutos)=>{
                resposta.json(listaProdutos);
            }).catch((erro)=>{
                resposta.json({
                    status:"false",
                    mensagem:"Falha ao obter produtos: " + erro.message
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

