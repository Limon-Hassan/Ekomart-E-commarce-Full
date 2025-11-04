import React, { useEffect, useState } from 'react';
import Container from '../Container';
import CheckBox from './CheckBox';
import PaymentStripe from './PaymentStripe';
import api from '../Api/axios';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let { enqueueSnackbar } = useSnackbar();
  let [Selectpayment, setSelectpayment] = useState(null);
  let [SelectpaymentStipe, setSelectpaymentStipe] = useState(false);
  let [cart, setCart] = useState([]);
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [address, setAddress] = useState('');
  let [city, setCity] = useState('');
  let [phone, setPhone] = useState('');
  let [summery, setSummeryData] = useState({});
  let [orderID, setOrderID] = useState(null);

  const handlePaymentChange = paymentMethod => {
    setSelectpayment(paymentMethod);
  };

  useEffect(() => {
    async function fetchCart() {
      try {
        let id = JSON.parse(localStorage.getItem('auth-Info')).user.id;
        let response = await api.get(`Cart/readCart/${id}`);
        setCart(response.data);
      } catch (error) {
        console.log(error);
        let backendMsg = error.response?.data?.message || ' Please login.!';
        if (backendMsg === 'No token found. Please login.') {
          navigate('/login', { state: { from: location.pathname } });
        }
      }
    }
    fetchCart();
  }, []);

  useEffect(() => {
    async function fetSummery() {
      try {
        let id = JSON.parse(localStorage.getItem('auth-Info')).user.id;
        let response = await api.get(`Cart/CartSummery/${id}`);
        setSummeryData(response.data);
      } catch (error) {
        console.log(error);
        let backendMsg = error.response?.data?.message || ' Please login.!';
        if (backendMsg === 'No token found. Please login.') {
          navigate('/login', { state: { from: location.pathname } });
        }
      }
    }
    fetSummery();
  }, []);

  let handleOrder = async () => {
    try {
      if (!name || !email || !address || !city || !phone) {
        enqueueSnackbar('Please fill all the fields', { variant: 'error' });
        return;
      } else if (phone.length !== 11) {
        enqueueSnackbar('Please enter a valid phone number', {
          variant: 'error',
        });
        return;
      } else if (!Selectpayment) {
        enqueueSnackbar('Please select a payment method', { variant: 'error' });
        return;
      }

      let id = JSON.parse(localStorage.getItem('auth-Info')).user.id;

      let payload = {
        name,
        email,
        address,
        city,
        phone,
        paymentMethod: Selectpayment,
      };

      let response = await api.post(`checkout/MakeCheckout/${id}`, payload);
      if (response) {
        let orderID = response.data.order.uniqueOrderID;
        setOrderID(orderID);
        localStorage.setItem('orderID', orderID);
        if (Selectpayment === 'Payment by Stripe') {
          setSelectpaymentStipe(true);
        } else if (Selectpayment === 'cash on delivery') {
          setCart([]);
          setSummeryData({});
          setName('');
          setEmail('');
          setAddress('');
          setCity('');
          setPhone('');
          localStorage.removeItem('cart');
          window.dispatchEvent(new Event('storage'));
          enqueueSnackbar('Order placed successfully!', { variant: 'success' });
          setTimeout(() => {
            window.location.href = `/success/${orderID}`;
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
      let backendMsg = error.response?.data?.msg || 'Please login.';
      if (backendMsg === 'No token found. Please login.') {
        navigate('/login', { state: { from: location.pathname } });
      }
    }
  };
  return (
    <>
      <section className="mobile:py-[50px] computer:py-[100px] bg-[#F3F4F6]">
        <Container>
          <div className="flex flex-wrap items-center gap-[50px] mb-[50px]">
            <div className=" mobile:w-full computer:w-[70%]">
              <h4 className="text-[30px] font-display font-bold leading-[54px] text-[#2C3C28] my-[30px]">
                Billing Details
              </h4>
              <div className="mb-[30px]">
                <label
                  className="text-[16px] font-medium text-[#6E777D] "
                  htmlFor="email"
                >
                  Email Address*
                </label>
                <input
                  className="text-[16px] font-display font-medium text-[#6E777D] bg-transparent border-2 border-[#e8e8e8] h-[50px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500 mt-[10px] px-[15px] w-full rounded-[6px]"
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="email"
                />
              </div>
              <div className="mb-[30px]">
                <label
                  className="text-[16px] font-medium text-[#6E777D] "
                  htmlFor="name"
                >
                  Name*
                </label>
                <input
                  className="text-[16px] font-display font-medium text-[#6E777D] bg-transparent border-2 border-[#e8e8e8] h-[50px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500 mt-[10px] px-[15px] w-full rounded-[6px]"
                  type="name"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  id="name"
                />
              </div>
              <div className="mb-[30px]">
                <label
                  className="text-[16px] font-medium text-[#6E777D] "
                  htmlFor="text"
                >
                  Town / City*
                </label>
                <input
                  className="text-[16px] font-display font-medium text-[#6E777D] bg-transparent border-2 border-[#e8e8e8] h-[50px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500 mt-[10px] px-[15px] w-full rounded-[6px]"
                  type="text"
                  name="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  id="text"
                />
              </div>
              <div className="mb-[30px]">
                <label
                  className="text-[16px] font-medium text-[#6E777D] "
                  htmlFor="phone"
                >
                  Phone*
                </label>
                <input
                  className="text-[16px] font-display font-medium text-[#6E777D] bg-transparent border-2 border-[#e8e8e8] h-[50px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500 mt-[10px] px-[15px] w-full rounded-[6px]"
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  id="phone"
                />
              </div>
              <div className="mb-[30px]">
                <label
                  className="text-[16px] font-medium text-[#6E777D] "
                  htmlFor="text"
                >
                  Street Address*
                </label>
                <input
                  className="text-[16px] font-display font-medium text-[#6E777D] bg-transparent border-2 border-[#e8e8e8] h-[50px] outline-none focus:border-[#629D23] transition-all ease-in-out duration-500 mt-[10px] px-[15px] w-full rounded-[6px]"
                  type="text"
                  name="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  id="text"
                />
              </div>
            </div>
            <div className="mobile:w-full computer:w-auto">
              <div className="flex items-center ">
                <h3 className="text-[30px] font-display font-bold text-[#2C3C28]">
                  Your Order
                </h3>
              </div>

              <div class=" mt-[20px] max-w-md ">
                <div class="rounded-[6px] bg-white border-2 border-[#629D23]">
                  <div class="px-4 py-6 sm:px-8 sm:py-10">
                    <div class="flow-root overflow-hidden">
                      <ul class=" overflow-y-scroll h-[270px] mb-[20px] w-full ">
                        {cart.map((item, index) => (
                          <li
                            key={index}
                            class="flex flex-wrap w-full gap-[20px] py-[20px] text-left border-b border-[#e8e8e8]"
                          >
                            <div class="shrink-0 relative">
                              <span class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                                {item.quantity}
                              </span>
                              <img
                                class="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={item.product?.photo[0]}
                                alt=""
                              />
                            </div>

                            <div class="relative flex flex-1 flex-col justify-between">
                              <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                <div class="pr-8 sm:pr-5">
                                  <p class="text-base font-semibold text-gray-900">
                                    {item.product?.name}
                                  </p>
                                  <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                    36EU - 4US
                                  </p>
                                </div>

                                <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                  <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                    ${item.product?.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div class="mt-6 space-y-3 border-t border-[#e8e8e8] border-b py-8">
                      <div class="flex items-center justify-between">
                        <p class="text-gray-400">Subtotal</p>
                        <p class="text-lg font-semibold text-gray-900">
                          ${summery.subTotal}
                        </p>
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="text-gray-400">Shipping</p>
                        <p class="text-lg font-semibold text-gray-900">
                          ${summery.shippingCost}
                        </p>
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="text-gray-400">Shipping</p>
                        <p class="text-lg font-semibold text-gray-900">
                          ${summery.discount}
                        </p>
                      </div>
                    </div>
                    <div class="mt-6 flex items-center justify-between">
                      <p class="text-sm font-medium text-gray-900">Total</p>
                      <p class="text-2xl font-semibold text-gray-900">
                        <span class="text-xs font-normal text-gray-400">$</span>
                        {summery.totalPrice}
                      </p>
                    </div>
                    <div className="my-[20px]">
                      <CheckBox
                        label="Cash on Delivery"
                        checked={Selectpayment === 'cash on delivery'}
                        className="rounded-full mb-2.5"
                        onChange={() => handlePaymentChange('cash on delivery')}
                      />
                      <CheckBox
                        label="Payment by Stripe"
                        checked={Selectpayment === 'Payment by Stripe'}
                        className="rounded-full"
                        onChange={() =>
                          handlePaymentChange('Payment by Stripe')
                        }
                      />
                    </div>
                    <div class="mt-6 text-center">
                      <button
                        onClick={handleOrder}
                        type="button"
                        class="group inline-flex w-full items-center justify-center rounded-md bg-[#629D23] cursor-pointer px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                      >
                        Place Order
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {SelectpaymentStipe === true ? (
            <PaymentStripe
              orderId={orderID}
              amount={summery.totalPrice * 100}
              onSuccess={() => {
                setCart([]);
                setSummeryData({});
                setName('');
                setEmail('');
                setAddress('');
                setCity('');
                setPhone('');
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('storage'));
                setTimeout(() => {
                  window.location.href = `/success/${orderID}`;
                }, 3000);
              }}
            ></PaymentStripe>
          ) : null}
        </Container>
      </section>
    </>
  );
};

export default Checkout;
