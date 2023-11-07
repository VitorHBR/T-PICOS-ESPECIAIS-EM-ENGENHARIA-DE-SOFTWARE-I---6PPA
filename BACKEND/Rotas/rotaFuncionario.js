
import { Router } from 'express';
import FuncionarioCTRL from '../Controle/funcionarioCTRL.js';


const rotaFuncionario = new Router();
const controladorFuncionario = new FuncionarioCTRL();


rotaFuncionario.get('/', controladorFuncionario.consultar)
.post('/', controladorFuncionario.gravar)
.put('/', controladorFuncionario.atualizar)
.delete('/', controladorFuncionario.excluir);

export default rotaFuncionario;
