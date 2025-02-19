import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminDashboard from '@/pages/adminDashboard/adminDashboard';
import ArtistDashboard from '@/pages/artistDashboard/artistDashboard';
import Login from '@/pages/login/loginPage';

const AppRoutes = () => {
  const { user, role, loading } = useAuth();

  // Se ainda estiver carregando, não renderiza nada
  if (loading) return <div>Carregando...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={user && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/artist/*"
          element={user && role === 'artist' ? <ArtistDashboard /> : <Navigate to="/login" />}
        />
        <Route 
          path="*" 
          element={user ? (role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/artist" />) : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
