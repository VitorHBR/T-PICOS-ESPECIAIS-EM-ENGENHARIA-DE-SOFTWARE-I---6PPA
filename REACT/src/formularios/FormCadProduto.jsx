import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function FormCadProduto(props) {
    const url = "http://localhost:4000/produtos";
    const [validado, setValidado] = useState(false);
    const [produto, setProduto] = useState(props.produto);
    const [receitas, setReceitas] = useState([]); // Estado para armazenar as opções de receitas
    const [categorias, setCategorias] = useState([]); // Estado para armazenar as opções de categorias

    /*
    useEffect(() => {
        // Lógica para buscar as opções de receitas do backend
        fetch("http://localhost:4000/receitas")
            .then(response => response.json())
            .then(data => setReceitas(data))
            .catch(error => console.error('Erro ao buscar receitas', error));

        // Lógica para buscar as opções de categorias do backend
        fetch("http://localhost:4000/categorias")
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Erro ao buscar categorias', error));
    }, []);

    */
    function gravaProduto(produto) {

        if (!props.modoEdicao) {
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produto)
            }
            ).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert("Produto cadastrado com sucesso!")
                //processar a resposta para verificar se o produto realmente foi adicionado
                console.log(dados);
            });
        }
        else {
            fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produto)
            }
            ).then((resposta) => {
                return resposta.json()
                    ;
            }).then((dados) => {
                alert("Produto atualizado com sucesso!")
                console.log(dados)
                props.mostrarTabela(true);
                //processar a resposta para verificar se o produto realmente foi atualizado.
            });
        }
    }


    function manipularMudanca(e) {
        const alvo = e.target.name;
        if (e.target.type === "checkbox") {
            setProduto({ ...produto, [alvo]: e.target.checked });

        }
        else {
            setProduto({ ...produto, [alvo]: e.target.value });
            console.log("Digitou" + e.target.value);
        }
    }

    const manipulaEnvio = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            gravaProduto(produto); // envia os dados para o backend.
            setProduto({
                codigo_Produto: "",
                nome: "",
                descricao: "",
                preco: "",
                quantidade: "",
                receita: "",
                categoria: "",

    
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
                    id="nome"
                    name="nome"
                    value={produto.nome}
                    onChange={manipularMudanca}

                />
                <Form.Control.Feedback type="invalid">Por favor, informe o nome.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="6" >
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    required
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={produto.descricao}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o endereço.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="3" >
                <Form.Label>Preço</Form.Label>
                <Form.Control
                    type="text"
                    required
                    id="preco"
                    name="preco"
                    value={produto.preco}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o seu preco.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                    type="quantidade"
                    required
                    id="quantidade"
                    name="quantidade"
                    value={produto.quantidade}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe a quantidade.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Receita</Form.Label>
                <Form.Control
                    as="select"
                    required
                    id="receita_idReceita"
                    name="receita_idReceita"
                    value={produto.receita_idReceita}
                    onChange={manipularMudanca}
                >
                    <option value="">Selecione uma receita</option>
                    {receitas.map(receita => (
                        <option key={receita.id} value={receita.id}>{receita.nome}</option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Por favor, informe a receita.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                    as="select"
                    required
                    id="Categoria_idCategoria"
                    name="Categoria_idCategoria"
                    value={produto.Categoria_idCategoria}
                    onChange={manipularMudanca}
                >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Por favor, informe a categoria.
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