import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function FormCadCliente(props) {
    const url = "http://localhost:4000/clientes";
    const [validado, setValidado] = useState(false);
    const [cliente, setCliente] = useState(props.cliente);

    function gravaCliente(cliente) {

        if (!props.modoEdicao) {
          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
          }
          ).then((resposta) => {
            return resposta.json();
          }).then((dados) => {
            alert("Cliente cadastrado com sucesso!")
            //processar a resposta para verificar se o cliente realmente foi adicionado
            console.log(dados);
          });
        }
        else {
          fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
          }
          ).then((resposta) => {
            return resposta.json()
              ;
          }).then((dados) => {
            alert("Cliente atualizado com sucesso!")
            console.log(dados)
            props.mostrarTabela(true);
            
          });
        }
      }
    

    function manipularMudanca(e) {
        const alvo = e.target.name;
        if (e.target.type === "checkbox") {
            setCliente({ ...cliente, [alvo]: e.target.checked });

        }
        else {
            setCliente({ ...cliente, [alvo]: e.target.value });
            console.log("Digitou" + e.target.value);
        }
    }

    const manipulaEnvio = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            gravaCliente(cliente); // envia os dados para o backend.
            setCliente({
                idCliente: "",
                cpf_Cliente: "",
                nome: "",
                endereco: "",
                telefone: "",
                email: "",
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
                    id="nome"
                    name="nome"
                    value={cliente.nome}
                    onChange={manipularMudanca}

                />
                <Form.Control.Feedback type="invalid">Por favor, informe o nome.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="4" >
                <Form.Label>CPF</Form.Label>
                <Form.Control
                    required
                    type="text"
                    id="cpf_Cliente"
                    name="cpf_Cliente"
                    value={cliente.cpf_Cliente}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o CPF.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="6" >
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                    required
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={cliente.endereco}
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
                    value={cliente.telefone}
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
                    value={cliente.email}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o e-mail.
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