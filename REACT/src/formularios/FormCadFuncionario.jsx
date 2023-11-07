import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function FormCadFuncionario(props) {
    const url = "http://localhost:4000/funcionarios";
    const [validado, setValidado] = useState(false);
    const [funcionario, setFuncionario] = useState(props.funcionario);

    function gravaFuncionario(funcionario) {

        if (!props.modoEdicao) {
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(funcionario)
            }
            ).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert("Funcionario cadastrado com sucesso!")
                //processar a resposta para verificar se o funcionario realmente foi adicionado
                console.log(dados);
            });
        }
        else {
            fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(funcionario)
            }
            ).then((resposta) => {
                return resposta.json()
                    ;
            }).then((dados) => {
                alert("Funcionario atualizado com sucesso!")
                console.log(dados)
                props.mostrarTabela(true);
                //processar a resposta para verificar se o funcionario realmente foi atualizado.
            });
        }
    }


    function manipularMudanca(e) {
        const alvo = e.target.name;
        if (e.target.type === "checkbox") {
            setFuncionario({ ...funcionario, [alvo]: e.target.checked });

        }
        else {
            setFuncionario({ ...funcionario, [alvo]: e.target.value });
            console.log("Digitou" + e.target.value);
        }
    }

    const manipulaEnvio = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            gravaFuncionario(funcionario); // envia os dados para o backend.
            setFuncionario({
                idFuncionario: "",
                nome_funcionario: "",
                endereco: "",
                telefone: "",
                email: "",
                senha: "",
            });
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };


    return (

        <Form noValidate validated={validado} onSubmit={manipulaEnvio}>

            <Form.Group md="4" >
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    required
                    type="text"
                    id="nome_funcionario"
                    name="nome_funcionario"
                    value={funcionario.nome_funcionario}
                    onChange={manipularMudanca}

                />
                <Form.Control.Feedback type="invalid">Por favor, informe o nome_funcionario.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="6" >
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                    required
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={funcionario.endereco}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o endereço.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="3" >
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                    type="text"
                    required
                    id="telefone"
                    name="telefone"
                    value={funcionario.telefone}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o seu telefone.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                    type="email"
                    required
                    id="email"
                    name="email"
                    value={funcionario.email}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o e-mail.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                    type="password" // Corrigido para "password"
                    required
                    id="senha"
                    name="senha"
                    value={funcionario.senha}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe uma senha.
                </Form.Control.Feedback>
            </Form.Group>

            <Button className="me-2" variant="success" type="submit">Gravar</Button>
            <Button className="me-2" variant="warning" type="button" onClick={
                () => {
                    props.mostrarTabela(true);
                }
            }>Voltar</Button>
        </Form>
    );
}