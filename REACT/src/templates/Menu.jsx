import { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
//import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { Contexto } from "../contexto/ContextoGlobal";


export default function Menu(props) {
    const {usuario, setUsuario} = useContext(Contexto);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/"><Navbar.Brand>Menu</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <LinkContainer to="/clientes"><NavDropdown.Item>Clientes</NavDropdown.Item></LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to="/funcionarios"><NavDropdown.Item>Funcionários</NavDropdown.Item></LinkContainer>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>{
                                setUsuario ({nome:"", logado:false});
                            }}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}