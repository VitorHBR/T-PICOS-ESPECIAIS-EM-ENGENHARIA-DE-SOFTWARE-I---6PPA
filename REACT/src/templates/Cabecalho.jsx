import { Alert } from "react-bootstrap";
import { Contexto } from "../contexto/ContextoGlobal";
import { useContext } from "react";
import { IconeUsuario } from "../icones/icones";

export default function Cabecalho(props){
    const {usuario} = useContext(Contexto);
    return (
        <Alert className="text-center" variant="dark"><strong>{props.texto} - Usuário: <IconeUsuario/> {usuario.nome}</strong></Alert>
    );
}
