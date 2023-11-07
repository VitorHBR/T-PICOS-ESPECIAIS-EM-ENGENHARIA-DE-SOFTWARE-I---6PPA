import { useState } from "react";
import FormCadCliente from "../formularios/FormCadCliente";
import TabelaCadastroClientes from "../tabelas/TabelaCadastroCliente";
import Pagina from "../templates/Pagina";

export default function TelaCadastroClientes() {
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [clienteEmEdicao, setClienteEmEdicao] = useState(
        {
            idCliente: "",
            cpf_Cliente: "",
            nome: "",
            endereco: "",
            telefone: "",
            email: ""

        }
    );

    function cadastrarCliente() {
        setAtualizando(false);
        setClienteEmEdicao({
            idCliente: "",
            cpf_Cliente: "",
            nome: "",
            endereco: "",
            telefone: "",
            email: ""
        });
        setMostrarTabela(false);
      }

    function prepararClienteParaEdicao(cliente) {
        setAtualizando(true);
        setClienteEmEdicao(cliente);
        setMostrarTabela(false);
    }


    if (mostrarTabela) {
        return (
            <Pagina>
                <TabelaCadastroClientes mostrarTabela={setMostrarTabela} editarCliente={prepararClienteParaEdicao} cadastrarCliente={cadastrarCliente} />
            </Pagina>
        )
    }
    else {
        return (
            <Pagina>
                <FormCadCliente mostrarTabela={setMostrarTabela} modoEdicao={atualizando} cliente={clienteEmEdicao} />
            </Pagina>
        );
    }
}
    