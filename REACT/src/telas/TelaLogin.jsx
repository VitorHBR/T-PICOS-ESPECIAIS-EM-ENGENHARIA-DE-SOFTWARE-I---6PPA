import React, { useContext, useState} from "react"; // Adicione a importação do useContext
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Contexto } from "../contexto/ContextoGlobal";

export function TelaLogin(props) {
    const { usuario, setUsuario } = useContext(Contexto);
    const [nomeUsuario, setNomeUsuario] = useState("");

    function fazLogin(e) {
        setUsuario({
            nome: nomeUsuario,
            logado: true
        });

        e.preventDefault();
        e.stopPropagation();
    }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg="6" className="d-none d-lg-block bg-login-image"></Col>
        <Col lg="6">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">Bem vindo!</h1>
            </div>
            <Form onSubmit={fazLogin} className="user">
              <Form.Group className="mb-3">
                <Form.Control type="email" id="inputEmail" name="inputEmail" placeholder="Digite seu email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="password" id="inputPassword" name="inputPassword" placeholder="Digite sua senha" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" id="customCheck" label="Lembrar-me" />
              </Form.Group>
              <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <hr />
            {/* Adapte a exibição de mensagens de erro conforme necessário */}
            {props.msgErro && <span style={{ color: "red" }}>{props.msgErro}</span>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
