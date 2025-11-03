import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from './Api/axios';
import { Circles } from 'react-loader-spinner';

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

  if (auth === null)
    return (
      <div className="flex items-center justify-center w-full h-screen mx-auto">
        <Circles
          className="flex items-center justify-center mx-auto"
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );

  if (!auth) return <Navigate to="/login" replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
