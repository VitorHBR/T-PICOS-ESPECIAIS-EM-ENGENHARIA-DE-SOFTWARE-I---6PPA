import { Router } from 'express';
import VendaCTRL from '../Controle/vendaCTRL.js';
import Autenticacao  from '../middleware/autenticacao.js';

const rotaVenda = new Router();
const controladorVenda = new VendaCTRL();

rotaVenda.post('/finalizarVenda', controladorVenda.finalizarVenda);

export default rotaVenda;
