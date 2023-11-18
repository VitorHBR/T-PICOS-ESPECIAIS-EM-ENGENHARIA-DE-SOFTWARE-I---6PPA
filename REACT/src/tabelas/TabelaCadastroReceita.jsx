import { Alert, Button, Table, Spinner, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { IconeEditar, IconeExcluir } from '../icones/icones.jsx';



export default function TabelaCadastroReceita(props) {

    const url = "http://localhost:4000/receitas";
    const [listaReceitas, setlistaReceitas] = useState([]);
    const [status, setStatus] = useState("ocioso");

    // quando executar a função obterReceitas?
    //willMount
    useEffect(() => {
        setStatus("buscando");
        try {
            fetch(url, { method: "GET" }).then((resposta) => { //then == então     
                return resposta.json();
            }).then((dados) => {
                setlistaReceitas(dados);
                setStatus("ocioso");
            });
        } catch (erro) {
            setStatus("erro");
        }

    }, []) // quando o componente for carregado pela primeira vez

    function deletaReceita(idReceita) {
        if (window.confirm("Deseja realmente excluir a Receita?")) {
            try {
                fetch(url, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idReceita: idReceita })
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    console.log(dados);
                    setlistaReceitas(listaReceitas.filter(receita => receita.idReceita !== idReceita));
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
            <h1 className="text-center">Receitas Cadastradas</h1>
            <br />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descricão</th>
                        <th>Preparo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaReceitas.map((receita) => {
                            return (
                                <tr key={receita.idReceita}>
                                    <td>{receita.idReceita}</td>
                                    <td>{receita.receitanome}</td>
                                    <td>{receita.receitadescricao}</td>
                                    <td>{receita.modoPreparo}</td>
                                    
                                    <td>
                                    <Button onClick={() => deletaReceita(receita.idReceita)} variant="danger"><IconeExcluir /></Button>{' '}
                                        <Button onClick={() => { props.editarReceita(receita) }} variant="secondary"><IconeEditar /></Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <Button onClick={() => {
                props.mostrarTabela(false);
                props.cadastrarReceita(); 
            }}>Cadastrar Receita</Button>
        </Container>
    );
}


