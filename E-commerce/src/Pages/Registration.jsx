import { Link, useNavigate } from 'react-router-dom';
import Container from '../Container';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../Api/axios';

const Registration = () => {
  let [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  let [showPassword, setShowPassword] = useState(false);
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let handleInputs = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  let handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!formData.name || !formData.email || !formData.password) {
      enqueueSnackbar('please fill all the fields', { variant: 'error' });
      setLoading(false);
      return;
    }
    try {
      let response = await api.post('user/registation', formData);
      if (response.data.msg === 'User Registation succesfull !') {
        let { name, email, Roll } = response.data.data;
        let safeUser = { name, email, Roll };
        localStorage.setItem('auth-user', JSON.stringify(safeUser));
        dispatch({
          type: 'SET_USER',
          payload: { user: safeUser, token: null },
        });
        setTimeout(() => {
          navigate('/Send_OTP');
          setLoading(false);
        }, [2000]);
      } else {
        enqueueSnackbar(response.data.msg, { variant: 'warning' });
      }
    } catch (error) {
      let backendMsg = error.response?.data?.msg || 'Something went wrong!';
      enqueueSnackbar(backendMsg, { variant: 'error' });
      setError(backendMsg);
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
                Register Into Your Account
              </h2>
              <div className="input-wapper mobile:w-auto computer:w-[500px] h-[50px] text-left mb-[60px]">
                <label className=" font-medium text-[#2C3C28]" for="name">
                  Username*
                </label>
                <input
                  onChange={handleInputs}
                  className="border mt-[10px] border-[#ebebeb] rounded-[5px] w-full h-full text-[16px] font-display font-normal leading-7 bg-transparent px-[15px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500"
                  type="text"
                  id="name"
                  value={formData.name}
                  name="name"
                />
              </div>
              <div className="input-wapper mobile:w-auto computer:w-[500px] h-[50px] text-left mb-[60px]">
                <label className=" font-medium text-[#2C3C28]" for="name">
                  Email*
                </label>
                <input
                  onChange={handleInputs}
                  className="border mt-[10px] border-[#ebebeb] rounded-[5px] w-full h-full text-[16px] font-display font-normal leading-7 bg-transparent px-[15px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500"
                  type="text"
                  id="email"
                  value={formData.email}
                  name="email"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
              </div>
              <div className="input-wapper relative mobile:w-auto computer:w-[500px] h-[50px] text-left mb-[60px]">
                <label className=" font-medium text-[#2C3C28]" for="password">
                  Password*
                </label>
                <input
                  onChange={handleInputs}
                  className="  border mt-[10px]  border-[#ebebeb] rounded-[5px] w-full h-full text-[16px] font-display font-normal leading-7 bg-transparent pl-[15px] pr-[55px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
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
                {loading ? 'Creating Account...' : 'Register Account'}
              </button>
              <button
                onClick={() => {
                  window.location.href =
                    'https://evato-e-commerce.onrender.com/api/v2/user/google';
                }}
                className="text-[16px] mobile:w-full computer:w-[500px] font-bold font-display text-[#fff] bg-[#629D23] px-[25px] py-[14px] rounded-[6px] mb-[30px] cursor-pointer"
              >
                Register with
                <span className="ml-[12px]">
                  <i class="fa-brands fa-google"></i> Google
                </span>
              </button>

              <p className="text-[16px] font-display font-normal text-[#6E777D]">
                Already Have an Account ?
                <a
                  href="/login"
                  className="text-[16px] font-display font-bold text-black ml-[12px] cursor-pointer"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Registration;
