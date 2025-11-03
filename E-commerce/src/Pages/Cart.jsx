import React, { useEffect, useState } from 'react';
import Container from '../Container';
import api from '../Api/axios';
import { useSnackbar } from 'notistack';
import socket from '../socket/socket';

const Cart = () => {
  let { enqueueSnackbar } = useSnackbar();
  let [cartProduct, setCartProduct] = useState([]);
  let [summeryData, setSummeryData] = useState([]);

  async function fetchCart() {
    try {
      let id = JSON.parse(localStorage.getItem('auth-Info')).user.id;
      if (!id) {
        window.location.href = '/login';
        return;
      }
      let response = await api.get(`Cart/readCart/${id}`);
      setCartProduct(response.data);
    } catch (error) {
      console.log(error);
      let backendMsg = error.response?.data?.message || ' Please login.!';
      if (backendMsg === 'No token found. Please login.') {
        window.location.href = '/login';
      }
    }
  }
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    socket.emit('joinUser', {
      userId: JSON.parse(localStorage.getItem('auth-Info')).user.id,
    });

    const handleItemDeleted = deleteCart => {
      setCartProduct(prevCart =>
        prevCart.filter(item => item.CartitemID !== deleteCart._id)
      );
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let updatedCart = cart.filter(item => item.CartitemID !== deleteCart._id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      window.dispatchEvent(new Event('storage'));
      fetSummery();
    };

    const handleCartFetched = CartData => {
      setCartProduct(CartData);
    };
    const handleSummery = Cartsummery => {
      setSummeryData(Cartsummery);
    };
    const handleIncrement = cartItemsArray => {
      setCartProduct(cartItemsArray);
    };
    const handleICartIncrement = cartSummary => {
      setSummeryData(cartSummary);
    };

    const handleDeletedCart = deleteManyCart => {
      setCartProduct([]);
      setSummeryData({});
      localStorage.removeItem('cart');

      window.dispatchEvent(new Event('storage'));
      enqueueSnackbar(response.data.msg, { variant: 'success' });
    };

    socket.on('cartDeleted', handleItemDeleted);
    socket.on('CartData', handleCartFetched);
    socket.on('CartDeleted', handleDeletedCart);
    socket.on('cartSummery', handleSummery);
    socket.on('cartItems', handleIncrement);
    socket.on('cartSummary', handleICartIncrement);

    return () => {
      socket.off('cartDeleted', handleItemDeleted);
      socket.off('CartData', handleCartFetched);
      socket.off('CartDeleted', handleDeletedCart);
      socket.off('cartSummery', handleSummery);
      socket.off('cartItems', handleIncrement);
      socket.off('cartSummary', handleICartIncrement);
    };
  }, []);

  async function fetSummery() {
    try {
      if (!cartProduct.length === 0) return;
      let id = JSON.parse(localStorage.getItem('auth-Info')).user.id;
      let response = await api.get(`Cart/CartSummery/${id}`);
      setSummeryData(response.data);
    } catch (error) {
      if (error.response.data.msg === 'Cart not Found !') {
        setSummeryData({});
      }
      console.log(error);
      let backendMsg = error.response?.data?.message || ' Please login.!';
      if (backendMsg === 'No token found. Please login.') {
        window.location.href = '/login';
      }
    }
  }

  useEffect(() => {
    fetSummery();
  }, []);

  let handleIncrement = async (action, id) => {
    try {
      let response = await api.put(`Cart/Increament/${id}?action=${action}`);

      if (response) {
        console.log(response);
        setCartProduct(response.data.data.cartItem);
        setSummeryData(response.data.data.summary);
      }

      let msg = response.data.msg;
      if (msg) {
        enqueueSnackbar(msg, { variant: 'success' });
        fetchCart();
        fetSummery();
      }
    } catch (error) {
      console.log(error);
      let backendMsg = error.response?.data?.message || ' Please login.!';
      if (backendMsg === 'No token found. Please login.') {
        window.location.href = '/login';
      }
    }
  };

  let clearCart = async (action, id) => {
    let userID = JSON.parse(localStorage.getItem('auth-Info')).user.id;
    try {
      if (action === 'single') {
        let response = await api.delete(
          `Cart/DeleteCart/${id}?action=${action}`
        );
        if (response) {
          fetSummery();
          setCartProduct(prevCart =>
            prevCart.filter(item => item.CartitemID !== id)
          );
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          let updatedCart = cart.filter(item => item.CartitemID !== id);
          localStorage.setItem('cart', JSON.stringify(updatedCart));

          window.dispatchEvent(new Event('storage'));
          enqueueSnackbar(response.data.msg, { variant: 'success' });
        }
      } else {
        let response = await api.delete(
          `Cart/DeleteCart/${id}?action=${action}&userid=${userID}`
        );
        if (response) {
          setCartProduct([]);
          setSummeryData({});
          localStorage.removeItem('cart');

          window.dispatchEvent(new Event('storage'));
          enqueueSnackbar(response.data.msg, { variant: 'success' });
        }
      }
    } catch (error) {
      console.log(error);
      let backendMsg = error.response?.data?.message || ' Please login.!';
      if (backendMsg === 'No token found. Please login.') {
        window.location.href = '/login';
      }
    }
  };

  return (
    <>
      <section className="bg-[#F3F4F6] mobile:py-[50px] computer:py-[100px]">
        <Container>
          <div className="flex flex-wrap gap-[50px]">
            <div className="mobile:w-full computer:w-[70%]">
              <div className="bg-[#FFF] border border-[#e2e2e2] mobile:p-[15px] computer:p-[40px] rounded-[6px] mb-[20px]">
                <h4 className="text-[16px] font-display font-medium text-[#74787C] leading-6">
                  If you want to get Shipping cost free then purchase minimum
                  $5000 and get discounts when you're total quantity would be 5
                </h4>
              </div>

              <div className="bg-[#FFF] border border-[#e2e2e2] py-[20px] px-[10px] rounded-[6px] ">
                <div className="mobile:hidden computer:flex items-center justify-between py-[15px] px-[20px] border-b border-[#e2e2e2]">
                  <h5 className="text-[16px] font-display font-bold text-[#2C3C28]">
                    Products
                  </h5>
                  <h5 className="text-[16px] font-display font-bold text-[#2C3C28]">
                    Price
                  </h5>
                  <h5 className="text-[16px] font-display font-bold text-[#2C3C28]">
                    Quantity
                  </h5>
                </div>
                <div
                  className={`overflow-y-scroll ${
                    cartProduct.length > 5 ? 'h-[480px]' : 'h-auto'
                  }  `}
                >
                  {cartProduct.length === 0 ? (
                    <div className="flex items-center justify-center">
                      <h5 className="text-[26px] my-[100px] font-display font-bold text-[#2C3C28]">
                        No Cart Found 🥲
                      </h5>
                    </div>
                  ) : (
                    cartProduct.map((item, indx) => (
                      <>
                        <div
                          key={indx}
                          className="computer:flex mobile:hidden items-center gap-[118px] py-[30px] px-[15px] border-b border-[#e2e2e2]"
                        >
                          <div className="flex items-center gap-[25px]">
                            <span
                              onClick={() =>
                                clearCart('single', item.CartitemID)
                              }
                              className="bg-red-500 w-[40px] h-[40px] rounded-full flex justify-center items-center text-white cursor-pointer"
                            >
                              <i class="fa-solid fa-xmark"></i>
                            </span>
                            <img
                              className="max-w-[70px] h-auto"
                              src={item.product.photo?.[0] || '01.jpg'}
                              alt="product"
                            />
                            <h4 className="text-[16px] font-display font-bold text-[#2C3C28] truncate w-[250px]">
                              {item.product.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-[400px]">
                            <span className="text-[18px] font-bold text-[#2C3C28] ">
                              ${item.product.price}
                            </span>
                            <div className="flex items-center bg-white p-3 rounded-[4px] gap-3 ">
                              <div className="mr-[12px]">
                                <h5 className="text-[14px] font-display font-bold">
                                  {item.quantity}
                                </h5>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleIncrement(
                                      'Increment',
                                      item.CartitemID
                                    )
                                  }
                                  className="transition-all ease-in-out duration-300  text-[12px] font-display font-bold text-black bg-white border border-[#e2e2e2] cursor-pointer py-1  flex items-center justify-center px-2.5 hover:text-[#FFF] hover:bg-green-500"
                                >
                                  <i class="fa-solid fa-plus-large"></i>
                                </button>
                                <button
                                  onClick={() =>
                                    handleIncrement(
                                      'Decrement',
                                      item.CartitemID
                                    )
                                  }
                                  className="transition-all ease-in-out duration-300  text-[12px] font-display font-bold text-black bg-white border border-[#e2e2e2] cursor-pointer py-1  flex items-center justify-center px-2.5 hover:text-[#FFF] hover:bg-red-500"
                                >
                                  <i class="fa-solid fa-minus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          key={indx}
                          className="mobile:flex gap-[20px] border-b border-[#e2e2e2] py-5 computer:hidden"
                        >
                          <div className="w-[120px] h-[100px] relative">
                            <span class="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                              {item.quantity}
                            </span>
                            <img
                              className="w-full h-full rounded-md"
                              src={item.product.photo?.[0] || '01.jpg'}
                              alt="lengquage"
                            />
                          </div>
                          <div>
                            <h4 className="wrap-break-word text-[16px] font-display font-bold text-[#2C3C28] line-clamp-2 text-ellipsis overflow-hidden h-[50px] w-[240px]">
                              {item.product.name}
                            </h4>
                            <h4 className="text-[16px] font-display font-bold text-[#2C3C28] h-[22px]">
                              product brand
                            </h4>
                            <div className="flex items-center justify-between h-[28px]">
                              <h4 className="text-[18px] font-bold text-[#2C3C28] ">
                                ${item.product.price}
                              </h4>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleIncrement(
                                      'Increment',
                                      item.CartitemID
                                    )
                                  }
                                  className="transition-all ease-in-out duration-300  text-[12px] font-display font-bold text-black bg-white border border-[#e2e2e2] cursor-pointer py-1  flex items-center justify-center px-2.5 hover:text-[#FFF] hover:bg-green-500"
                                >
                                  <i class="fa-solid fa-plus-large"></i>
                                </button>
                                <button
                                  onClick={() =>
                                    handleIncrement(
                                      'Decrement',
                                      item.CartitemID
                                    )
                                  }
                                  className="transition-all ease-in-out duration-300  text-[12px] font-display font-bold text-black bg-white border border-[#e2e2e2] cursor-pointer py-1  flex items-center justify-center px-2.5 hover:text-[#FFF] hover:bg-red-500"
                                >
                                  <i class="fa-solid fa-minus"></i>
                                </button>
                              </div>
                              <i
                                onClick={() =>
                                  clearCart('single', item.CartitemID)
                                }
                                class="fa-solid fa-xmark text-[26px] text-black"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </>
                    ))
                  )}
                </div>

                <div className="mobile:py-[20px] mobile:px-[10px] computer:py-[30px] computer:px-[30px] computer:flex mobile:flex-none items-center justify-between">
                  <div className=" mobile:flex-none computer:flex items-center gap-[20px]">
                    <input
                      className="h-[50px] font-medium text-[#6E777D] bg-[#F3F4F6] rounded-[6px] mobile:w-full computer:w-[290px] p-[15px]  focus:outline-[#629D23]"
                      type="text"
                      placeholder="Apply Coupon..."
                    />
                    <button className="mobile:hidden computer:block text-[16px] font-bold font-display text-[#FFF] bg-[#629D23] px-[28px] py-[10px] rounded-[6px] cursor-pointer">
                      Apply Coupon
                    </button>
                  </div>
                  <div className="mobile:flex mobile:items-center mobile:justify-between computer:flex-none mobile:mt-5 computer:mt-0">
                    <button className="computer:hidden mobile:block text-[16px] font-bold font-display text-[#FFF] bg-[#629D23] px-[28px] py-[10px] rounded-[6px] cursor-pointer">
                      Apply Coupon
                    </button>

                    <button
                      onClick={() => clearCart('clear')}
                      className="text-[16px] font-bold font-display text-[#FFF] bg-[#629D23] px-[28px] py-[10px] rounded-[6px] cursor-pointer"
                    >
                      Clear All Carts
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile:w-full computer:w-[25%]">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p className="text-xl font-Poppipns_FONT font-semibold text-gray-900">
                  Order summary
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-Poppipns_FONT font-normal text-gray-500">
                        Original price
                        <span className="ml-2">
                          {cartProduct.length || 0} Items
                        </span>
                      </dt>
                      <dd className="text-base font-Poppipns_FONT  font-medium text-gray-900">
                        ${summeryData.OrginalPrice || 0}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-Poppipns_FONT  font-normal text-gray-500">
                        Additional Fees
                      </dt>
                      <dd className="text-base font-Poppipns_FONT  font-medium text-gray-900">
                        ${summeryData.additionalFees || 0}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-Poppipns_FONT  font-normal text-gray-500">
                        Shipping Cost
                      </dt>
                      <dd className="text-base font-Poppipns_FONT  font-medium text-gray-900">
                        ${summeryData.shippingCost || 0}
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-Poppipns_FONT  font-bold text-gray-600">
                      SubTotal
                    </dt>
                    <dd className="text-base font-Poppipns_FONT  font-medium text-gray-900">
                      ${summeryData.subTotal || 0}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-Poppipns_FONT  font-normal text-red-400">
                      Discount
                    </dt>
                    <dd className="text-base font-Poppipns_FONT  font-medium text-red-500">
                      <span className="mr-2">(-)</span>$
                      {summeryData.discount || 0}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <dt className="text-[18px] mt-2 font-Poppipns_FONT  font-bold text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-Poppipns_FONT  font-bold text-gray-900">
                      ${summeryData.totalPrice || 0}
                    </dd>
                  </dl>
                </div>

                <a
                  href={cartProduct.length === 0 ? '#' : '/checkout'}
                  type="button"
                  className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 font-medium text-white text-[18px] font-display
                 ${
                   cartProduct.length === 0
                     ? 'bg-gray-400 cursor-not-allowed'
                     : 'bg-[#629D23] hover:bg-[#629D23]/80'
                 }`}
                  onClick={e => {
                    if (cartProduct.length === 0) {
                      e.preventDefault();
                    }
                  }}
                >
                  Proceed to Checkout
                </a>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-[16px] font-display font-normal text-gray-500 dark:text-gray-400">
                    or
                  </span>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 text-[16px] font-medium text-blue-500 underline hover:no-underline dark:text-blue-600 "
                  >
                    Continue Shopping
                    <span className="w-5 h-5">
                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Cart;
