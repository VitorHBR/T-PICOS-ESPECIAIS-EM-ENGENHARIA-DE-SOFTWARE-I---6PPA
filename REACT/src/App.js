import TelaCadastroCliente from './telas/TelaCadastroCliente';
import TelaCadastroFuncionario  from './telas/TelaCadastroFuncionario'
import TelaCadastroProduto from './telas/TelaCadastroProduto';
import TelaVendas from './telas/TelaVendas';
import TelaReceitas from './telas/TelaReceitas';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaMenu from './telas/TelaMenu';
import Tela404 from './telas/Tela404';
import { TelaLogin } from './telas/TelaLogin';
import { Contexto } from './contexto/ContextoGlobal';
import { useContext } from 'react';




function App() {

  const {usuario} = useContext(Contexto);

  if (usuario.logado) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/clientes' element={<TelaCadastroCliente />} />
            <Route path='/funcionarios' element={<TelaCadastroFuncionario />} />
            <Route path='/produtos' element={<TelaCadastroProduto />} />
            <Route path='/vendas' element={<TelaVendas />} />
            <Route path='/receitas' element={<TelaReceitas />} />
            <Route path='/' element={<TelaMenu />} />
            <Route path='*' element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  else{
    return (<TelaLogin/>);
  }
}

export default App;
