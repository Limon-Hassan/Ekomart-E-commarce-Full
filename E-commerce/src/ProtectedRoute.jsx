import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../api/axios';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        await api.get('auth/me');
        setAuth(true);
      } catch (err) {
        setAuth(false);
      }
    }
    checkAuth();
  }, []);

  if (auth === null) return <p>Loading...</p>;

  if (!auth) return <Navigate to="/login" replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
