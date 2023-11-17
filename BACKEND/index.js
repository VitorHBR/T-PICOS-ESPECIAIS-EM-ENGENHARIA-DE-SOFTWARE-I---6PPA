import express from 'express';
import rotaCliente from "./Rotas/rotaCliente.js";
import rotaFuncionario from "./Rotas/rotaFuncionario.js"
import rotaProduto from "./Rotas/rotaProduto.js"
import rotaVenda   from "./Rotas/rotaVenda.js"
import cors from 'cors';


const porta=4000;
const hostanme='localhost';

const app = express();// é uma aplicação completa que conversa HTTP
app.use(cors({
                origin:"*"
}));
//É preciso dizer ao express que ele deve tratar adquadamente requisições com conteudo json
app.use(express.json());
app.use('/clientes', rotaCliente);
app.use('/funcionarios', rotaFuncionario);
app.use('/produtos', rotaProduto);
app.use('/vendas', rotaVenda);




app.listen(porta,hostanme, ()=>{
    console.log('Servidor em execução em http://'+hostanme+":"+porta);
});


