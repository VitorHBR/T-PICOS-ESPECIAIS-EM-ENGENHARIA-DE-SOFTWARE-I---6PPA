import {useState, createContext} from "react";


export const Contexto = createContext([]);

//Criar componente cujo estado pode ser compartilhado com outros componentes
//usando Context de React
export default function ContextoGlobal(props){
    const [usuario, setUsuario]= useState({
        nome:"",
        logado:false
    });
    return(
        <Contexto.Provider value={{usuario, setUsuario}}>
            {props.children}
        </Contexto.Provider>

    );
}