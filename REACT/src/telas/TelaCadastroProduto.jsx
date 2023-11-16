import { useState } from "react";
import FormCadProduto from "../formularios/FormCadProduto";
import TabelaCadastroProdutos from "../tabelas/TabelaCadastroProduto";
import Pagina from "../templates/Pagina";

export default function TelaCadastroProdutos() {
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [produtoEmEdicao, setProdutoEmEdicao] = useState(
        {
            codigo_Produto: "",
            nome: "",
            descricao: "",
            preco: "",
            quantidade: "",
            receita_idReceita: "",
            Categoria_idCategoria: "",

        }
    );

    function cadastrarProduto() {
        setAtualizando(false);
        setProdutoEmEdicao({
            codigo_Produto: "",
            nome: "",
            descricao: "",
            preco: "",
            quantidade: "",
            receita_idReceita: "",
            Categoria_idCategoria: "",

        });
        setMostrarTabela(false);
      }

    function prepararProdutoParaEdicao(produto) {
        setAtualizando(true);
        setProdutoEmEdicao(produto);
        setMostrarTabela(false);
    }


    if (mostrarTabela) {
        return (
            <Pagina>
                <TabelaCadastroProdutos mostrarTabela={setMostrarTabela} editarProduto={prepararProdutoParaEdicao} cadastrarProduto={cadastrarProduto} />
            </Pagina>
        )
    }
    else {
        return (
            <Pagina>
                <FormCadProduto mostrarTabela={setMostrarTabela} modoEdicao={atualizando} produto={produtoEmEdicao} />
            </Pagina>
        );
    }
}
    