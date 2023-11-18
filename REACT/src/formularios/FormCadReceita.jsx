import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function FormCadReceita(props) {
    const url = "http://localhost:4000/receitas";
    const [validado, setValidado] = useState(false);
    const [receita, setReceita] = useState(props.receita);

    function gravaReceita(receita) {

        if (!props.modoEdicao) {
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(receita)
            }
            ).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert("Receita cadastrada com sucesso!")
                //processar a resposta para verificar se o receita realmente foi adicionado
                console.log(dados);
            });
        }
        else {
            fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(receita)
            }
            ).then((resposta) => {
                return resposta.json()
                    ;
            }).then((dados) => {
                alert("Receita atualizado com sucesso!")
                console.log(dados)
                props.mostrarTabela(true);
                //processar a resposta para verificar se o receita realmente foi atualizado.
            });
        }
    }


    function manipularMudanca(e) {
        const alvo = e.target.name;
        if (e.target.type === "checkbox") {
            setReceita({ ...receita, [alvo]: e.target.checked });

        }
        else {
            setReceita({ ...receita, [alvo]: e.target.value });
            console.log("Digitou" + e.target.value);
        }
    }

    const manipulaEnvio = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            gravaReceita(receita); // envia os dados para o backend.
            setReceita({
                idReceita: "",
                receitanome: "",
                receitadescricao: "",
                modoPreparo: "",
               
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
                    id="receitanome"
                    name="receitanome"
                    value={receita.receitanome}
                    onChange={manipularMudanca}

                />
                <Form.Control.Feedback type="invalid">Por favor, informe o nome_receita.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="6" >
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    required
                    type="text"
                    id="receitadescricao"
                    name="receitadescricao"
                    value={receita.receitadescricao}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe a Descrição.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="3" >
                <Form.Label>Preparo</Form.Label>
                <Form.Control
                    type="text"
                    required
                    id="modoPreparo"
                    name="modoPreparo"
                    value={receita.modoPreparo}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o modo de preparo.
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