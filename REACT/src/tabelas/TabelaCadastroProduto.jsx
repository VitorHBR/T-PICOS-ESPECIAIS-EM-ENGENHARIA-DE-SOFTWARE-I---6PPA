import { Alert, Button, Table, Spinner, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { IconeEditar, IconeExcluir } from '../icones/icones.jsx';



export default function TabelaCadastroProdutos(props) {

    const url = "http://localhost:4000/produtos";
    const [listaProdutos, setListaProdutos] = useState([]);
    const [status, setStatus] = useState("ocioso");

    // quando executar a função obterProdutos?
    //willMount
    useEffect(() => {
        setStatus("buscando");
        try {
            fetch(url, { method: "GET" }).then((resposta) => { //then == então     
                return resposta.json();
            }).then((dados) => {
                setListaProdutos(dados);
                setStatus("ocioso");
            });
        } catch (erro) {
            setStatus("erro");
        }

    }, []) // quando o componente for carregado pela primeira vez

    function deletaProduto(codigo_Produto) {
        if (window.confirm("Deseja realmente excluir o produto?")) {
            try {
                fetch(url, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ codigo_Produto: codigo_Produto })
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    console.log(dados);
                    setListaProdutos(listaProdutos.filter(produto => produto.codigo_Produto !== codigo_Produto));
                });
            }
            catch (erro) {
                setStatus("erro");
            }
        }
    }


    if (status === 'erro') {
        return (
            <Alert variant='danger'>Erro ao recuperar os dados dos produtos do backend!</Alert>
        );
    }
    else if (status === 'buscando') {
        return <Button><Spinner animation="border" />Carregando...</Button>
    }
    return (
        <Container>
            <br />
            <h1 className="text-center">Produtos Cadastrados</h1>
            <br />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Receita</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaProdutos.map((produto) => {
                            return (
                                <tr key={produto.codigo_Produto}>
                                    <td>{produto.codigo_Produto}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.preco}</td>
                                    <td>{produto.quantidade}</td>
                                    <td>{produto.receita_idReceita}</td>
                                    <td>{produto.Categoria_idCategoria}</td>
                                    <td>
                                    <Button onClick={() => deletaProduto(produto.codigo_Produto)} variant="danger"><IconeExcluir /></Button>{' '}
                                        <Button onClick={() => { props.editarProduto(produto) }} variant="secondary"><IconeEditar /></Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <Button onClick={() => {
                props.mostrarTabela(false);
                props.cadastrarProduto(); 
            }}>Cadastrar Produto</Button>
        </Container>
    );
}


