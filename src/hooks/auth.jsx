import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

// children = tudo que estiver dentro do AuthProvider; se torna as rotas (Routes) main.jsx
// AuthProvider = recebe as rotas (Routes) do main.jsx
function AuthProvider({ children }) {
  const [data, setData] = useState({});

  // signIn - autenticação
  async function signIn({ email, password }) {

    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token} = response.data;

      // Salvar os dados no localStorage
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);

      // Salvar os dados no contexto
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({ user, token });

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar");
      }
    }
  }

  // signOut - deslogar
  function signOut() {
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    setData({});
  }

  // updateProfile - atualizar perfil
  async function updateProfile({ user, avatarFile }) {
    try {
      // Se o arquivo de imagem foi selecionado, faz o upload do arquivo
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      
      setData({ user, token: data.token });
      alert("Perfil atualizado!");

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil");
      }
    }
  }

  // Verifica se o usuário esta logado
  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ token, 
        user: JSON.parse(user) 
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signOut,
      updateProfile, 
      user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth - recupera os dados do contexto (AuthContext) e disponibiliza para as rotas
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
