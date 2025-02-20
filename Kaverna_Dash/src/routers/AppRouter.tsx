import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Login from "@/pages/login/loginPage";
import AdminDashboard from "@/pages/adminDashboard/adminDashboard";
import ArtistDashboard from "@/pages/artistDashboard/artistDashboard";
import Home from "@/pages/adminDashboard/pages/home/home";
import Pedidos from "@/pages/adminDashboard/pages/pedidos";

const AppRoutes = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rotas de Admin */}
        {user && role === "admin" ? (
          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route index element={<Navigate to="home" replace />} />{/* Redireciona /admin para /admin/home */}
            <Route path="home" element={<Home />} />
            <Route path="pedidos" element={<Pedidos />} />
          </Route>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/login" />} />
        )}

        {/* Rotas de Artista */}
        {user && role === "artist" ? (
          <Route path="/artist/*" element={<ArtistDashboard />} />
        ) : (
          <Route path="/artist/*" element={<Navigate to="/login" />} />
        )}

        {/* Redirecionamento padrão */}
        <Route
          path="*"
          element={
            user ? (
              role === "admin" ? (
                <Navigate to="/admin/home" />
              ) : (
                <Navigate to="/artist" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
