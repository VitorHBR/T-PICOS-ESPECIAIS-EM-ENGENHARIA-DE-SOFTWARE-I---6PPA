
import { Router } from 'express';
import ProdutoCTRL from '../Controle/produtoCTRL.js';
import Autenticacao  from '../middleware/autenticacao.js';


const rotaProduto = new Router();
const controladorProduto = new ProdutoCTRL();


rotaProduto.get('/', controladorProduto.consultar)
.post('/', controladorProduto.gravar)
.put('/', controladorProduto.atualizar)
.delete('/', controladorProduto.excluir);

export default rotaProduto;
