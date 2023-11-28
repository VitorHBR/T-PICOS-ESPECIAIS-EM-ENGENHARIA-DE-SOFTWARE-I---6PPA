

import { Router } from 'express';
import LoginCTRL from '../Controle/loginController.js';
// Router permite a criação de micro aplicaçãoes http

const rotaLogin = new Router();
const controladorLogin = new LoginCTRL();
//http://domnio:porta/cliente
//requisição e resposta são parametros passados automaticamente para os metodos da camada de controle

//De forma explícita conseguimos enxergar a interface da API
rotaLogin.get('/', controladorLogin.loginView)
.post('/', controladorLogin.autenticarUsuario)


export default rotaLogin;