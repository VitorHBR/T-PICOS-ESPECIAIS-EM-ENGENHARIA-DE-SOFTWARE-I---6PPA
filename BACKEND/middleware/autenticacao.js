export default  class Autenticacao {

    constructor() {

    }

    usuarioEstaLogado(req, res, next) {
        console.log("cheguei middleware");
        if(req.headers.cookie != undefined && req.headers.cookie.includes('usuarioLogado')) {
            next();
        }
        else{
            res.redirect('/login');
        }
    }
}

