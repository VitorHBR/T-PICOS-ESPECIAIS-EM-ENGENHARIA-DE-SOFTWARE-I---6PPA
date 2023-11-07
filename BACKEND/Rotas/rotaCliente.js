//As requisições que vierem da Internet (requisições HTTP) 
//precisarão ser traduzidas em requisições internas da nossa 
//aplicação para que ela possa dar a resporta adequada.

import { Router } from 'express';
import ClienteCTRL from '../Controle/clienteCTRL.js';
// Router permite a criação de micro aplicaçãoes http

const rotaCliente = new Router();
const controladorCliente = new ClienteCTRL();
//http://domnio:porta/cliente
//requisição e resposta são parametros passados automaticamente para os metodos da camada de controle

//De forma explícita conseguimos enxergar a interface da API
rotaCliente.get('/', controladorCliente.consultar)
.post('/', controladorCliente.gravar)
.put('/', controladorCliente.atualizar)
.delete('/', controladorCliente.excluir);

export default rotaCliente;
