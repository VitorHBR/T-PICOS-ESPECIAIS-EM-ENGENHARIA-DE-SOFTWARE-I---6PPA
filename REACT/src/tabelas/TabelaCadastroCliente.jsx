import { Alert, Button, Table, Spinner, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { IconeEditar, IconeExcluir } from '../icones/icones.jsx';



export default function TabelaCadastroCliente(props) {

    const url = "http://localhost:4000/clientes";
    const [listaClientes, setListaClientes] = useState([]);
    const [status, setStatus] = useState("ocioso");

    // quando executar a função obterClientes?
    //willMount
    useEffect(() => {
        setStatus("buscando");
        try {
            fetch(url, { method: "GET" }).then((resposta) => { //then == então     
                return resposta.json();
            }).then((dados) => {
                setListaClientes(dados);
                setStatus("ocioso");
            });
        } catch (erro) {
            setStatus("erro");
        }

    }, []) // quando o componente for carregado pela primeira vez

    function deletaCliente(idCliente) {
        if (window.confirm("Deseja realmente excluir o cliente?")) {
            try {
                fetch(url, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idCliente: idCliente })
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    console.log(dados);
                    setListaClientes(listaClientes.filter(cliente => cliente.idCliente !== idCliente));
                });
            }
            catch (erro) {
                setStatus("erro");
            }
        }
    }


    if (status === 'erro') {
        return (
            <Alert variant='danger'>Erro ao recuperar os dados dos clientes do backend!</Alert>
        );
    }
    else if (status === 'buscando') {
        return <Button><Spinner animation="border" />Carregando...</Button>
    }
    return (
        <Container>
            <br />
            <h1 className="text-center">Clientes Cadastrados</h1>
            <br />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaClientes.map((cliente) => {
                            return (
                                <tr key={cliente.idCliente}>
                                    <td>{cliente.cpf_Cliente}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.endereco}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                    <Button onClick={() => deletaCliente(cliente.idCliente)} variant="danger"><IconeExcluir /></Button>{' '}
                                        <Button onClick={() => { props.editarCliente(cliente) }} variant="secondary"><IconeEditar /></Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <Button onClick={() => {
                props.mostrarTabela(false); //setMostrarTabela  -> altera o estado mostrarTebela da TelaCadastroClientes
                props.cadastrarCliente(); 
            }}>Cadastrar Cliente</Button>
        </Container>
    );
}


