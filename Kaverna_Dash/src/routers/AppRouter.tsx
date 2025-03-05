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
import Pedidos from "@/pages/adminDashboard/pages/pedidos/pedidos";
import AllOrders from "@/pages/adminDashboard/pages/pedidos/pedidosPages/allOrders";
import DevolucaoPedidos from "@/pages/adminDashboard/pages/pedidos/pedidosPages/devolucaoPedidos";
import PedidosCancelados from "@/pages/adminDashboard/pages/pedidos/pedidosPages/canceladosPedidos";
import ListaArtistas from "@/pages/adminDashboard/pages/artistas/artistasPages/listaArtistas";
import SolicitacoesArtistas from "@/pages/adminDashboard/pages/artistas/artistasPages/graficas";
import Artistas from "@/pages/adminDashboard/pages/artistas/artistas";
import Produtos from "@/pages/adminDashboard/pages/produtos/produtos";
import ListaProdutos from "@/pages/adminDashboard/pages/produtos/produtosPages/listaProdutos";
import ColecoesProdutos from "@/pages/adminDashboard/pages/produtos/produtosPages/colecoesProdutos";
import CriarProduto from "@/pages/adminDashboard/pages/produtos/produtosPages/criarProduto";
import { LoginForm } from "@/pages/login/components/login-form";
import { RegistrationForm } from "@/pages/login/components/registration-form";
import AdminGraphicsPage from "@/pages/adminDashboard/pages/artistas/artistasPages/graficas";
import GraphicDashboard from "@/pages/graphicDashboard/graphicDashboard";
import AdminGraphicsDetails from "@/pages/adminDashboard/pages/artistas/artistasPages/ AdminGraphicsDetails";

const AppRoutes = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login/*" element={<Login />}>
          <Route index element={<Navigate to="signin" replace />} />
          <Route path="signin" element={<LoginForm />} />
          <Route path="signup" element={<RegistrationForm />} />
        </Route>

        {/* Rotas de Admin */}
        {user && role === "admin" ? (
          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route index element={<Navigate to="home" replace />} />
            {/* Redireciona /admin para /admin/home */}
            <Route path="home" element={<Home />} />
            <Route path="pedidos" element={<Pedidos />}>
              <Route
                index
                element={<Navigate to="todos_os_pedidos" replace />}
              />
              <Route path="todos_os_pedidos" element={<AllOrders />} />
              <Route path="pedidos_devolucao" element={<DevolucaoPedidos />} />
              <Route
                path="pedidos_cancelados"
                element={<PedidosCancelados />}
              />
            </Route>
            <Route path="parceiros" element={<Artistas />}>
              <Route
                index
                element={<Navigate to="artistas" replace />}
              />
              <Route path="artistas" element={<ListaArtistas />} />
              <Route path="graficas" element={<AdminGraphicsPage />} />
              <Route path="graficas/:id" element={<AdminGraphicsDetails />} />
            </Route>
            <Route path="produtos" element={<Produtos />}>
              <Route
                index
                element={<Navigate to="lista_de_produtos" replace />}
              />
              <Route path="lista_de_produtos" element={<ListaProdutos />} />
              <Route path="Criar_Produto" element={<CriarProduto />} />
              <Route path="colecoes" element={<ColecoesProdutos />} />
            </Route>
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

        {/* Rotas de Artista */}
        {user && role === "graphic" ? (
          <Route path="/graphic/*" element={<GraphicDashboard />} />
        ) : (
          <Route path="/graphic/*" element={<Navigate to="/login" />} />
        )}

        {/* Redirecionamento padrão */}
        <Route
          path="*"
          element={
            user ? (
              role === "admin" ? (
                <Navigate to="/admin/home" />
              ) : role === "graphic" ? (
                <Navigate to="/graphic" />
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
