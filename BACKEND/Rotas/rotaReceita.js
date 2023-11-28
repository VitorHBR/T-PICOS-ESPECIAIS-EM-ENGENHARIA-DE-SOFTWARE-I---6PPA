import { Router } from 'express';
import ReceitaCTRL from '../Controle/receitaCTRL.js';
import Autenticacao  from '../middleware/autenticacao.js';


const rotaReceita = new Router();
const controladorReceita = new ReceitaCTRL();


rotaReceita.get('/', controladorReceita.consultar)
.post('/', controladorReceita.gravar)
.put('/', controladorReceita.atualizar)
.delete('/', controladorReceita.excluir);

export default rotaReceita;