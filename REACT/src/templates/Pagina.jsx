import React from "react";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import { Container } from "react-bootstrap";

export default function Pagina(props) {
  return (
    <Container fluid className="p-0">
      <Cabecalho texto="SISTEMA DE CONTROLE DE PADARIA" />
      <Menu />
      <section className="p-3">
        {props.children}
      </section>
    </Container>
  );
}
