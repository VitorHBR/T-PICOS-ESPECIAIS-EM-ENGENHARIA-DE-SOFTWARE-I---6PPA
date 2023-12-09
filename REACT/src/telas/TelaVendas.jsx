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
  const [selectedClienteCPF, setSelectedClienteCPF] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);

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

  useEffect(() => {
    atualizarTabela();
  }, [tabela]);

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
      setError('Produto não encontrado');
  
      // Exibir o erro por 2 segundos
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const adicionarProduto = () => {
    const codigo_Produto = codigoProdutoRef.current.value;
    const nomeProduto = nomeProdutoRef.current.value;
    const quantidade = parseFloat(quantidadeRef.current.value);
    const valor = parseFloat(valorRef.current.value);

    if (!codigo_Produto || !nomeProduto || isNaN(quantidade) || isNaN(valor) || quantidade <= 0) {
      console.error('Por favor, preencha todos os campos corretamente.');
      setError('Por favor, preencha todos os campos corretamente e certifique-se de que a quantidade é maior que zero.');
  
      // Exibir o erro por 2 segundos
      setTimeout(() => {
        setError(null);
      }, 3000);
  
      return;
    }

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
    const selectedClienteId = event.target.value;
    setSelectedClienteId(selectedClienteId);

    const selectedClienteCPF = event.target.options[event.target.selectedIndex].getAttribute("data-cpf");

    if (selectedClienteCPF) {
      setSelectedClienteCPF(selectedClienteCPF.toString());
    } else {
      setSelectedClienteCPF('');
    }
  };

  const handlePagamentoChange = (event) => {
    setSelectedPagamento(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedClienteId || !selectedPagamento || tabela.length === 0) {
      setError('Preencha todos os campos antes de finalizar a venda.');
      return;
    }

    await finalizarVenda();
  };

  const finalizarVenda = async () => {
    if (selectedClienteId === '') {
      setError('Selecione um cliente antes de finalizar a venda!');
      return;
    }
  
    if (tabela.length === 0) {
      setError('Adicione pelo menos um produto à venda antes de finalizar.');
      return;
    }
  
    const vendaData = {
      date: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      total: totalVenda,
      formapagamento: selectedPagamento,
      cliente: selectedClienteId,
      cliente_cpf_Cliente: selectedClienteCPF,
      produtos: tabela.map((produto) => ({
        produto: produto.codigo_Produto,
        nomeProduto: produto.nomeProduto,
        quantidade: produto.quantidade,
        valor: produto.valor,
      })),
      funcionario: '1',
    };
  
    try {
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
  
      setTabela([]);
      setTotalVenda(0.0);
      limparCampos();
      setError(null);
      setSelectedClienteId('');
      setSelectedPagamento('');
  
      // Ativar o alerta de sucesso
      setSuccessAlert(true);
  
      // Desativar o alerta após alguns segundos (opcional)
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000); // 3000 milissegundos = 3 segundos
  
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
                      <option key={cliente.id} value={cliente.id} data-cpf={cliente.cpf_Cliente}>
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

            <Button variant="success" type="submit" className="mt-3">
              Finalizar Venda
            </Button>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {successAlert && <Alert variant="success" className="mt-3">Venda finalizada com sucesso!</Alert>}
        </div>
      </Container>
    </Pagina>
  );
};

export default TelaVendas;
