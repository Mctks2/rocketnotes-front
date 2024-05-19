import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {/* Se caso o usuário estiver logado, mostrar as rotas de app, se não mostrar as rotas de autenticação */}
      {user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}