import { useState, createContext, useEffect } from "react";

export const Contexto = createContext([]);

export default function ContextoGlobal(props) {
  const [usuario, setUsuario] = useState(() => {
    // Verifica se há um usuário armazenado no localStorage
    const usuarioArmazenado = localStorage.getItem("usuario");
    return usuarioArmazenado ? JSON.parse(usuarioArmazenado) : { nome: "", logado: false };
  });

  // Atualiza o localStorage sempre que o usuário for alterado
  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }, [usuario]);

  return (
    <Contexto.Provider value={{ usuario, setUsuario }}>
      {props.children}
    </Contexto.Provider>
  );
}
