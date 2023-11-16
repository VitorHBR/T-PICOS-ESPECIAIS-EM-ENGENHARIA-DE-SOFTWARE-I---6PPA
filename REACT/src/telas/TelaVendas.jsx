import React, { useEffect, useState } from 'react';
import Pagina from "../templates/Pagina";
import ReactDOM from 'react-dom';

export default function TelaVendas(props) {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [totalVenda, setTotalVenda] = useState(0.0);
  const [error, setError] = useState(null);
  const [tabela, setTabela] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await fetch('http://localhost:4000/produtos');
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    

    carregarProdutos();
  }, []);

  function calcularValor() {
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const selectedProdutoCodigo = document.getElementById('codigo_Produto').value;

    const selectedProduto = produtos.find(produto => produto.codigo_Produto.toString() === selectedProdutoCodigo.toString());

    if (selectedProduto) {
      const valor = quantidade * parseFloat(selectedProduto.preco);
      document.getElementById("nomeProduto").value = selectedProduto.nome;
      document.getElementById('valor').value = valor.toFixed(2);
    } else {
      console.log('Produto não encontrado');
    }
  }

  function adicionarProduto() {
    const codigo_Produto = document.getElementById('codigo_Produto').value;
    const nomeProduto = document.getElementById('nomeProduto').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);
  
    if (!isNaN(quantidade) && !isNaN(valor)) {
      const produtoExistente = tabela.find(item => item.codigo_Produto === codigo_Produto);
  
      if (produtoExistente) {
        // Atualiza a quantidade e valor se o produto já existe
        const novaTabela = tabela.map(item =>
          item.codigo_Produto === codigo_Produto
            ? { ...item, quantidade: item.quantidade + quantidade, valor: item.valor + valor }
            : item
        );
  
        setTabela(novaTabela);
      } else {
        const novoProduto = {
          codigo_Produto: codigo_Produto,
          nomeProduto: nomeProduto,
          quantidade: quantidade,
          valor: valor
        };
  
        setTabela(prevTabela => [...prevTabela, novoProduto]);
      }
  
      document.getElementById('codigo_Produto').value = '';
      document.getElementById('nomeProduto').value = '';
      document.getElementById('quantidade').value = '';
      document.getElementById('valor').value = '';
    } else {
      console.log('Por favor, preencha a quantidade e o valor corretamente.');
    }
  }
  
  
  
  // Adicione este efeito colateral para chamar atualizarTabela sempre que tabela for atualizada
  useEffect(() => {
    atualizarTabela();
  }, [tabela]);

  function removerProduto(codigo_Produto) {
    const novaTabela = tabela.filter(produto => produto.codigo_Produto !== codigo_Produto);
    setTabela([...novaTabela]); // Atualiza a tabela
    atualizarTabela();

    const totalGeral = novaTabela.reduce((total, produto) => total + produto.valor, 0);
    setTotalVenda(totalGeral);
  }

  
  function atualizarTabela() {
    const totalGeral = tabela.reduce((total, produto) => total + produto.valor, 0); setTotalVenda(totalGeral);
    
  
    ReactDOM.render(
      <table className="table table-striped table-hover">
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
                <button type="button" className="btn btn-danger" onClick={() => removerProduto(produto.codigo_Produto)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>,
      document.getElementById('lista-produtos')
    );
  }

  return (
    <Pagina>
      <div className="container">
        <h1 className="mt-4">Controle de Vendas</h1>

        <div className="mt-4">
          <form action="/venda/finalizarvenda" method="post">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="codigo_Produto">Código do Produto:</label>
                  <input type="text" className="form-control" id="codigo_Produto" />
                </div>
                <div className="form-group">
                  <label htmlFor="nome">Nome:</label>
                  <input type="text" className="form-control" id="nomeProduto" readOnly />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="quantidade">Quantidade:</label>
                  <input type="number" className="form-control" id="quantidade"
                    onChange={calcularValor}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="valor">Valor:</label>
                  <input type="text" className="form-control" id="valor" readOnly />
                </div>
              </div>
            </div>

            <button type="button" className="btn btn-primary mt-3" onClick={adicionarProduto}>
              Adicionar
            </button>

            <div className="table-responsive" style={{ marginTop: '15px' }}>
              <table className="table table-striped table-hover">
                <tbody id="lista-produtos"></tbody>
              </table>
            </div>

            <div>Total: {totalVenda.toFixed(2)}</div>

            <button type="submit" className="btn btn-success mt-3" >
              Finalizar Venda
            </button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </Pagina>
  );
}
