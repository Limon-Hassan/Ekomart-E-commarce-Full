import { Link, useNavigate } from 'react-router-dom';
import Container from '../Container';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import api from '../Api/axios';

const Login = () => {
  let [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  let [showPassword, setShowPassword] = useState(false);
  let [loading, setLoading] = useState(false);
  let { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();

  let handleInputs = e => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  let handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await api.post('user/login', loginFormData, {
        withCredentials: true,
      });
      if (response.data.msg === 'User Login Sucessfull !') {
        let { token, userId } = response.data;
        let safeUser = { token, userId };
        localStorage.setItem('auth-Info', JSON.stringify(safeUser));
        setTimeout(() => {
          navigate('/');
          setLoading(false);
        }, [2000]);
      } else {
        enqueueSnackbar(response.data.msg, { variant: 'warning' });
      }
    } catch (error) {
      let backendMsg = error.response?.data?.msg || 'Something went wrong!';
      enqueueSnackbar(backendMsg, { variant: 'error' });
      setLoading(false);
    }
  };

  

  return (
    <>
      <section className="bg-[#F3F4F6] py-[60px]">
        <Container>
          <div>
            <div className="mobile:w-full computer:max-w-[800px] rounded-[20px] bg-white text-center mx-auto mobile:py-[30px] mobile:px-[20px] computer:py-[100px] computer:px-[150px]">
              <img className="max-w-[57px] mx-auto" src="fav.png" alt="logo" />
              <h2 className="text-[26px] font-display font-bold leading-[56px] mb-[20px] text-[#2C3C28]">
                Login Into Your Account
              </h2>
              <div className="input-wapper mobile:w-auto computer:w-[500px] h-[50px] text-left mb-[60px]">
                <label className=" font-medium text-[#2C3C28]" for="name">
                  Email*
                </label>
                <input
                  onChange={handleInputs}
                  className="border mt-[10px] border-[#ebebeb] rounded-[5px] w-full h-full text-[16px] font-display font-normal leading-7 bg-transparent px-[15px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500"
                  type="email"
                  id="email"
                  value={loginFormData.email}
                  name="email"
                />
              </div>
              <div className="input-wapper relative mobile:w-auto computer:w-[500px] h-[50px] text-left mb-[60px]">
                <label className=" font-medium text-[#2C3C28]" for="password">
                  Password*
                </label>
                <input
                  onChange={handleInputs}
                  className="border mt-[10px] border-[#ebebeb] rounded-[5px] w-full h-full text-[16px] font-display font-normal leading-7 bg-transparent px-[15px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={loginFormData.password}
                  name="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[45px] right-[10px] flex items-center text-lg text-black cursor-pointer"
                >
                  {showPassword ? (
                    <span>
                      <i class="fa-light fa-eye"></i>
                    </span>
                  ) : (
                    <span>
                      <i class="fa-light fa-eye-slash"></i>
                    </span>
                  )}
                </button>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="text-[16px] mobile:w-full computer:w-[500px] font-bold font-display text-[#fff] bg-[#629D23] px-[25px] py-[14px] rounded-[6px] mb-[30px] cursor-pointer"
              >
                {loading ? 'Logged In...' : 'Login Account'}
              </button>
              <button
                onClick={() => {
                  window.location.href =
                    'https://evato-e-commerce.onrender.com/api/v2/user/google';
                }}
                className="text-[16px] mobile:w-full computer:w-[500px] font-bold font-display text-[#fff] bg-[#629D23] px-[25px] py-[14px] rounded-[6px] mb-[30px] cursor-pointer"
              >
                Login with
                <span className="ml-[12px]">
                  <i class="fa-brands fa-google"></i> Google
                </span>
              </button>
              <p className="text-[16px] font-display font-normal text-[#6E777D]">
                Don't Have Any Account ?
                <Link
                  to="/register"
                  className="text-[16px] font-display font-bold text-black ml-[12px] cursor-pointer"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Login;
