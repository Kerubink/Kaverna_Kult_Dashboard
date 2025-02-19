import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routers/AppRouter'; // Criar um arquivo separado para as rotas

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
