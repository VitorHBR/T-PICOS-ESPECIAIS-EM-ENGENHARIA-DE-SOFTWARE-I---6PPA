import { useState } from "react";
import FormCadFuncionario from "../formularios/FormCadFuncionario";
import TabelaCadastroFuncionarios from "../tabelas/TabelaCadastroFuncionario";
import Pagina from "../templates/Pagina";

export default function TelaCadastroFuncionarios() {
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState(
        {
            idFuncionario: "",
            nome_funcionario: "",
            endereco: "",
            telefone: "",
            email: "",
            senha: "",

        }
    );

    function cadastrarFuncionario() {
        setAtualizando(false);
        setFuncionarioEmEdicao({
            idFuncionario: "",
            nome_funcionario: "",
            endereco: "",
            telefone: "",
            email: "",
            senha: "",
        });
        setMostrarTabela(false);
      }

    function prepararFuncionarioParaEdicao(funcionario) {
        setAtualizando(true);
        setFuncionarioEmEdicao(funcionario);
        setMostrarTabela(false);
    }


    if (mostrarTabela) {
        return (
            <Pagina>
                <TabelaCadastroFuncionarios mostrarTabela={setMostrarTabela} editarFuncionario={prepararFuncionarioParaEdicao} cadastrarFuncionario={cadastrarFuncionario} />
            </Pagina>
        )
    }
    else {
        return (
            <Pagina>
                <FormCadFuncionario mostrarTabela={setMostrarTabela} modoEdicao={atualizando} funcionario={funcionarioEmEdicao} />
            </Pagina>
        );
    }
}
    