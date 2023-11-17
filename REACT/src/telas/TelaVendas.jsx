import React, { useState, useEffect, useRef } from 'react';
import { Table, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import Pagina from '../templates/Pagina';

const TelaVendas = () => {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [totalVenda, setTotalVenda] = useState(0.0);
  const [error, setError] = useState(null);
  const [tabela, setTabela] = useState([]);
  const [selectedClienteId, setSelectedClienteId] = useState('');
  const [selectedPagamento, setSelectedPagamento] = useState('');

  const codigoProdutoRef = useRef(null);
  const nomeProdutoRef = useRef(null);
  const quantidadeRef = useRef(null);
  const valorRef = useRef(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const produtosResponse = await fetch('http://localhost:4000/produtos');
        const clientesResponse = await fetch('http://localhost:4000/clientes');
        const produtosData = await produtosResponse.json();
        const clientesData = await clientesResponse.json();
        setProdutos(produtosData);
        setClientes(clientesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados');
      }
    };

    carregarDados();
  }, []);

  const calcularValor = () => {
    const quantidade = parseFloat(quantidadeRef.current.value);
    const selectedProdutoCodigo = codigoProdutoRef.current.value;

    const selectedProduto = produtos.find(
      (produto) => produto.codigo_Produto.toString() === selectedProdutoCodigo.toString()
    );

    if (selectedProduto) {
      const valor = quantidade * parseFloat(selectedProduto.preco);
      nomeProdutoRef.current.value = selectedProduto.nome;
      valorRef.current.value = valor.toFixed(2);
    } else {
      console.error('Produto não encontrado');
    }
  };

  const adicionarProduto = () => {
    const codigo_Produto = codigoProdutoRef.current.value;
    const nomeProduto = nomeProdutoRef.current.value;
    const quantidade = parseFloat(quantidadeRef.current.value);
    const valor = parseFloat(valorRef.current.value);

    if (!isNaN(quantidade) && !isNaN(valor)) {
      const produtoExistente = tabela.find((item) => item.codigo_Produto === codigo_Produto);

      if (produtoExistente) {
        const novaTabela = tabela.map((item) =>
          item.codigo_Produto === codigo_Produto
            ? { ...item, quantidade: item.quantidade + quantidade, valor: item.valor + valor }
            : item
        );

        setTabela(novaTabela);
      } else {
        const novoProduto = {
          codigo_Produto,
          nomeProduto,
          quantidade,
          valor,
        };

        setTabela((prevTabela) => [...prevTabela, novoProduto]);
      }

      limparCampos();
    } else {
      console.error('Por favor, preencha a quantidade e o valor corretamente.');
    }
  };

  const limparCampos = () => {
    codigoProdutoRef.current.value = '';
    nomeProdutoRef.current.value = '';
    quantidadeRef.current.value = '';
    valorRef.current.value = '';
  };

  useEffect(() => {
    atualizarTabela();
  }, [tabela]);

  const removerProduto = (codigo_Produto) => {
    const novaTabela = tabela.filter((produto) => produto.codigo_Produto !== codigo_Produto);
    setTabela([...novaTabela]);
    atualizarTabela();
  };

  const atualizarTabela = () => {
    const totalGeral = tabela.reduce((total, produto) => total + produto.valor, 0);
    setTotalVenda(totalGeral);
  };

  const handleClienteChange = (event) => {
    setSelectedClienteId(event.target.value);
  };

  const handlePagamentoChange = (event) => {
    setSelectedPagamento(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await finalizarVenda();
  };

  const finalizarVenda = async () => {
    // Verifica se o cliente foi selecionado
    if (selectedClienteId === '') {
      setError('Selecione um cliente antes de finalizar a venda!');
      return;
    }

    // Cria o objeto com os dados da venda
    const vendaData = {
      date: new Date().toISOString(),
      total: totalVenda,
      formapagamento: selectedPagamento,
      cliente: selectedClienteId,
      produtos: tabela.map((produto) => ({
        produto: produto.codigo_Produto,
        nomeProduto: produto.nomeProduto,
        quantidade: produto.quantidade,
        valor: produto.valor,
      })),
      funcionario: '1', // Você pode obter essa informação de algum lugar, ou ajustar conforme necessário
    };

    try {
      // Envia os dados da venda para o backend
      const response = await fetch('http://localhost:4000/vendas/finalizarVenda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendaData),
      });

      if (!response.ok) {
        throw new Error('Erro ao finalizar a venda');
      }

      console.log('Venda finalizada com sucesso!');

      // Reinicializa as variáveis
      setTabela([]);
      setTotalVenda(0.0);

      // Limpa a tabela de produtos e o total
      limparCampos();
      setError(null); // Limpa mensagens de erro, se houverem
    } catch (error) {
      console.error('Erro ao finalizar a venda:', error.message);
      setError('Erro ao finalizar a venda. Tente novamente.');
    }
  };

  return (
    <Pagina>
      <Container>
        <h1 className="mt-4">Controle de Vendas</h1>

        <div className="mt-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="codigo_Produto">
                  <Form.Label>Código do Produto:</Form.Label>
                  <Form.Control type="text" ref={codigoProdutoRef} />
                </Form.Group>
                <Form.Group controlId="nomeProduto">
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control type="text" readOnly ref={nomeProdutoRef} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="quantidade">
                  <Form.Label>Quantidade:</Form.Label>
                  <Form.Control type="number" onChange={calcularValor} ref={quantidadeRef} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="valor">
                  <Form.Label>Valor:</Form.Label>
                  <Form.Control type="text" readOnly ref={valorRef} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" className="mt-3" onClick={adicionarProduto}>
              Adicionar
            </Button>

            <div className="table-responsive" style={{ marginTop: '15px' }}>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tabela.map((produto, index) => (
                    <tr key={index}>
                      <td>{produto.codigo_Produto}</td>
                      <td>{produto.nomeProduto}</td>
                      <td>{produto.quantidade}</td>
                      <td>{produto.valor.toFixed(2)}</td>
                      <td>
                        <Button variant="danger" onClick={() => removerProduto(produto.codigo_Produto)}>
                          Remover
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <Row>
              <Col md={6}>
                <Form.Group controlId="cliente">
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Control as="select" onChange={handleClienteChange} value={selectedClienteId}>
                    <option value="" disabled>
                      Selecione um cliente
                    </option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="pagamento">
                  <Form.Label>Meio de Pagamento:</Form.Label>
                  <Form.Control as="select" onChange={handlePagamentoChange} value={selectedPagamento}>
                    <option value="" disabled>
                      Selecione o meio de pagamento
                    </option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="PIX">PIX</option>
                    <option value="Cartao de Credito">Cartão de Crédito</option>
                    <option value="Cartao de Debito">Cartão de Débito</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-right font-weight-bold mt-4">
              Total: {totalVenda.toFixed(2)}
            </div>

            <Button variant="success" type="submit" className="mt-3" onClick={finalizarVenda}>
              Finalizar Venda
            </Button>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </div>
      </Container>
    </Pagina>
  );
};

export default TelaVendas;
