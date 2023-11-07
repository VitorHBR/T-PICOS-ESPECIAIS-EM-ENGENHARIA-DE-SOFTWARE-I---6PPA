import { Alert, Button, Table, Spinner, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { IconeEditar, IconeExcluir } from '../icones/icones.jsx';



export default function TabelaCadastroFuncionarios(props) {

    const url = "http://localhost:4000/funcionarios";
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [status, setStatus] = useState("ocioso");

    // quando executar a função obterFuncionarios?
    //willMount
    useEffect(() => {
        setStatus("buscando");
        try {
            fetch(url, { method: "GET" }).then((resposta) => { //then == então     
                return resposta.json();
            }).then((dados) => {
                setListaFuncionarios(dados);
                setStatus("ocioso");
            });
        } catch (erro) {
            setStatus("erro");
        }

    }, []) // quando o componente for carregado pela primeira vez

    function deletaFuncionario(idFuncionario) {
        if (window.confirm("Deseja realmente excluir o funcionario?")) {
            try {
                fetch(url, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idFuncionario: idFuncionario })
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    console.log(dados);
                    setListaFuncionarios(listaFuncionarios.filter(funcionario => funcionario.idFuncionario !== idFuncionario));
                });
            }
            catch (erro) {
                setStatus("erro");
            }
        }
    }


    if (status === 'erro') {
        return (
            <Alert variant='danger'>Erro ao recuperar os dados dos funcionarios do backend!</Alert>
        );
    }
    else if (status === 'buscando') {
        return <Button><Spinner animation="border" />Carregando...</Button>
    }
    return (
        <Container>
            <br />
            <h1 className="text-center">Funcionários Cadastrados</h1>
            <br />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaFuncionarios.map((funcionario) => {
                            return (
                                <tr key={funcionario.idFuncionario}>
                                    <td>{funcionario.idFuncionario}</td>
                                    <td>{funcionario.nome_funcionario}</td>
                                    <td>{funcionario.endereco}</td>
                                    <td>{funcionario.telefone}</td>
                                    <td>{funcionario.email}</td>
                                    <td>
                                    <Button onClick={() => deletaFuncionario(funcionario.idFuncionario)} variant="danger"><IconeExcluir /></Button>{' '}
                                        <Button onClick={() => { props.editarFuncionario(funcionario) }} variant="secondary"><IconeEditar /></Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <Button onClick={() => {
                props.mostrarTabela(false);
                props.cadastrarFuncionario(); 
            }}>Cadastrar Funcionário</Button>
        </Container>
    );
}


