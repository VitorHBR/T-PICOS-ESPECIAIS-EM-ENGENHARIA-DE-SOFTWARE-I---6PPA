
import { Router } from 'express';
import FuncionarioCTRL from '../Controle/funcionarioCTRL.js';
import Autenticacao  from '../middleware/autenticacao.js';


const rotaFuncionario = new Router();
const controladorFuncionario = new FuncionarioCTRL();


rotaFuncionario.get('/', controladorFuncionario.consultar)
.post('/', controladorFuncionario.gravar)
.put('/', controladorFuncionario.atualizar)
.delete('/', controladorFuncionario.excluir);

export default rotaFuncionario;
