import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../Api/axios';
import { useSnackbar } from 'notistack';
import { Circles } from 'react-loader-spinner';

function GoogleRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  let { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get('user/me', {
          withCredentials: true,
        });

        if (response.data.user) {
          localStorage.setItem(
            'auth-Info',
            JSON.stringify({ user: response.data.user })
          );
          navigate(from, { replace: true });
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        let backendMsg =
          error.response?.data?.message || 'Something went wrong!';
        enqueueSnackbar(backendMsg, { variant: 'error' });
        navigate('/login');
      }
    }

    fetchUser();
  }, [navigate]);

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
}

export default GoogleRedirect;
