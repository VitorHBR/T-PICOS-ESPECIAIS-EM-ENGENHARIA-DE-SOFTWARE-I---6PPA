import { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Contexto } from "../contexto/ContextoGlobal";


export default function Menu(props) {
  const { usuario, setUsuario } = useContext(Contexto);

  return (
    <Navbar bg="light" expand="lg" variant="light" className="shadow">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="ms-auto">
          <Nav>
            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
            <LinkContainer to="/">
                <NavDropdown.Item>Home</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/clientes">
                <NavDropdown.Item>Clientes</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/funcionarios">
                <NavDropdown.Item>Funcionários</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/produtos">
                <NavDropdown.Item>Produtos</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/vendas">
                <NavDropdown.Item>Vendas</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/receitas">
                <NavDropdown.Item>Receitas</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  setUsuario({ nome: "", logado: false });
                }}
              >
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
