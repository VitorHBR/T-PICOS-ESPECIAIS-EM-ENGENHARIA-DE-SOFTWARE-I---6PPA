
import funcionarioModel from "../Modelo/Funcionario.js";
export default class LoginController {

    constructor() {

    }

    loginView(req, res) {
        
        res.render('login/index', { layout: 'login/index' });
    }

    logoutUsuario(req, res) {
        res.clearCookie('usuarioLogado');
        res.redirect('/login');
        res.end();
    }

    async autenticarUsuario(req, res) {
        console.log(req.body);
        res.type('aplication/json');
        if(req.body.inputEmail != "" && req.body.inputPassword != "") {
            var usuario = new funcionarioModel();
            var usuario = await usuario.autenticarFuncionario(req.body.inputEmail, req.body.inputPassword);
            console.log(usuario[0]);
            if(usuario[0] != undefined){
                //console.log(usuario[0].idFuncionario);               
                res.json({
                    status:true,
                    mensagem:"Usuario logado",
                    id: usuario[0].idFuncionario,
                    nome: usuario[0].nome_funcionario

                });
            }
            else{
                
                res.json({
                    status:false,
                    mensagem:"Usuário/senha não foram inseridos corretamente!" 
                });
            }
        }
        else {
            res.json({
                status:false,
                mensagem:"Usuário/senha não foram inseridos corretamente!"
            });
        }
    }
}

