import { useState } from "react";
import FormCadReceita from "../formularios/FormCadReceita";
import TabelaCadastroReceita from "../tabelas/TabelaCadastroReceita";
import Pagina from "../templates/Pagina";

export default function TelaReceitas() {
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [ReceitaEmEdicao, setReceitaEmEdicao] = useState(
        {
            idReceita: "",
            receitanome: "",
            receitadescricao: "",
            modopreparo: "",

        }
    );

    function cadastrarReceita() {
        setAtualizando(false);
        setReceitaEmEdicao({
            idReceita: "",
            receitanome: "",
            receitadescricao: "",
            modopreparo: "",
            
        });
        setMostrarTabela(false);
      }

    function prepararReceitaParaEdicao(receita) {
        setAtualizando(true);
        setReceitaEmEdicao(receita);
        setMostrarTabela(false);
    }


    if (mostrarTabela) {
        return (
            <Pagina>
                <TabelaCadastroReceita mostrarTabela={setMostrarTabela} editarReceita={prepararReceitaParaEdicao} cadastrarReceita={cadastrarReceita} />
            </Pagina>
        )
    }
    else {
        return (
            <Pagina>
                <FormCadReceita mostrarTabela={setMostrarTabela} modoEdicao={atualizando} receita={ReceitaEmEdicao} />
            </Pagina>
        );
    }
}