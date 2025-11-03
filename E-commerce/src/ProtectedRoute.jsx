import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from './Api/axios';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await api.get('user/me');
        if (res.data?.user) {
          setAuth(true);
        } else {
          localStorage.removeItem('auth-Info');
          setAuth(false);
        }
      } catch (err) {
        localStorage.removeItem('auth-Info');
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
