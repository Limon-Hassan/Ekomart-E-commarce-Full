import React, { useContext, useEffect, useState } from 'react';
import Container from '../Container';
import api from '../Api/axios';
import { useSnackbar } from 'notistack';
import SkeletonProduct from './SkeletonProduct';
import { SocketContext } from '../socket/SocketContext';
import { TiShoppingCart } from 'react-icons/ti';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const Page3 = () => {
  let [products, setProducts] = useState([]);
  let { enqueueSnackbar } = useSnackbar();
  let [loading, setLoading] = useState(true);
  const socket = useContext(SocketContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        let response = await api.get('product/GetProducts');
        const latestProducts = response.data.slice(0, 12);
        setProducts(latestProducts);
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Failed to fetch products', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();

    socket.on('productCreated', newProduct => {
      setProducts(prev => {
        const updated = [newProduct, ...prev];
        return updated.slice(0, 12);
      });
    });

    return () => {
      socket.off('productCreated');
    };
  }, [socket]);

  let handleCartItem = async product => {
    let authInfo = localStorage.getItem('auth-Info');
    if (!authInfo) {
      window.location.href = '/login';
      return;
    }
    let userData = JSON.parse(authInfo);
    let userId = userData?.user?.id;
    try {
      let payload = {
        user: userId,
        product: product._id,
      };
      let response = await api.post('Cart/createCart', payload);
      enqueueSnackbar(response.data?.msg, { variant: 'success' });
      if (response) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const cartItemId = response.data.data._id;

        const index = cart.findIndex(item => item.CartitemID === cartItemId);

        if (index > -1) {
          cart[index].quantity += 1;
        } else {
          cart.push({
            ...product,
            CartitemID: cartItemId,
            quantity: 1,
          });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (error) {
      console.log(error);
      let backendMsg = error.response?.data?.message || ' Please login.!';
      let backendMessage =
        error.response?.data?.msg || ' Something went wrong!';
      if (backendMessage) {
        enqueueSnackbar(backendMessage, { variant: 'error' });
      }
      if (backendMsg === 'No token found. Please login.') {
        window.location.href = '/login';
      }
    }
  };

  let handleProductItem = async id => {
    try {
      let response = await api.get('product/GetProducts', {
        params: { id: id },
      });

      window.location.href = `/productDetails/${id}/${response.data.product.name.replace(
        /\s+/g,
        '-',
      )}`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="bg-[#dbe2e9]/30 mobile:pt-[20px] tablet:pt-[60px] laptop:pt-[60px] computer:pt-[60px]">
        <Container>
          <div className="bg-white rounded-[8px] mobile:pt-[20px] tablet:pt-[30px] laptop:pt-[30px] computer:pt-[30px] p-[15px]  border border-[#e2e2e2]">
            <div className="computer:flex computer:flex-nowrap mobile:flex mobile:flex-wrap items-center justify-between pb-[30px] border-b border-[#e2e2e2]">
              <h2 className="mobile:text-[20px] tablet:text-[22px] laptop:text-[25px] computer:text-[30px] font-display font-bold leading-1.5 text-[#2C3C28]">
                Weekly Best Selling Groceries
              </h2>
              <div className="computer:flex mobile:flex mobile:flex-wrap items-center gap-4 computer:mt-0 mobile:mt-[45px]">
                <button className="text-[16px] font-display font-semibold text-[#FFF] py-[8px] px-[27px] rounded-[100px]   bg-[#629D23]">
                  Frozen Foods
                </button>
                <button className="text-[16px] font-display font-semibold text-[#000] py-[8px] px-[27px] rounded-[100px] transition-all ease-in-out duration-300 hover:text-white hover:bg-[#629D23] bg-white">
                  Diet Foods
                </button>
                <button className="text-[16px] font-display font-semibold text-[#000] py-[8px] px-[27px] rounded-[100px] transition-all ease-in-out duration-300 hover:text-white hover:bg-[#629D23] bg-white">
                  Healthy Foods
                </button>
                <button className="text-[16px] font-display font-semibold text-[#000] py-[8px] px-[27px] rounded-[100px] transition-all ease-in-out duration-300 hover:text-white hover:bg-[#629D23] bg-white">
                  Vitamin Items
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-evenly items-center gap-[24px] mt-[50px] mb-[40px]">
              {loading && (
                <div className="flex flex-wrap gap-[24px] transition-opacity duration-500 opacity-100">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <SkeletonProduct key={idx} />
                  ))}
                </div>
              )}
              {!loading && (
                <div className="flex flex-wrap gap-[24px] transition-opacity duration-500 opacity-100">
                  {products?.map(pro => (
                    <div
                      key={pro._id}
                      className=" p-[15px] mobile:w-[100%] mobile:h-[430px] mobile:mx-auto computer:w-[250px] tablet:w-[250px] laptop:w-[250px] computer:mx-0 computer:h-[386px] tablet:h-[386px] laptop:h-[386px] bg-[#F5F6F7] rounded-[6px] "
                    >
                      <div
                        onClick={() => handleProductItem(pro._id)}
                        className=" relative bg-white mobile:w-auto mobile:h-[50%] computer:w-[220px] flex items-center justify-center computer:h-[190px] rounded-[6px] overflow-hidden"
                      >
                        <img
                          className="w-[65%] h-auto hover:scale-120 ease-in-out duration-300 rounded-[8px] cursor-pointer"
                          src={pro.photo || 'oil.jpg'}
                          alt="jpg"
                        />
                        <div className="Bedge absolute top-0 left-[40px]  w-[35px] ">
                          <div
                            className="bg-yellow-400 text-green-900 font-display font-bold text-center text-[12px] h-[55px] flex items-center justify-center
                            [clip-path:polygon(0%_0%,100%_0%,100%_61%,100%_100%,50%_80%,0_100%,0_63%)]"
                          >
                            25% <br></br>Off
                          </div>
                        </div>
                      </div>
                      <h4
                        onClick={() => handleProductItem(pro._id)}
                        className=" wrap-break-word text-[16px] font-display mobile:h-[52px] mobile:w-[250px] tablet:w-[228px] tablet:h-[52px] laptop:h-[50px] laptop:w-[220px] computer:h-[50px] computer:w-[220px] font-bold mt-[10px] hover:text-[#629D23] transition-all ease-in-out duration-300 cursor-pointer line-clamp-2 text-ellipsis overflow-hidden"
                      >
                        {pro.name}
                      </h4>
                      <p
                        className="text-[14px] mobile:h-[15px] computer:h-auto
                      tablet:h-[5px] laptop:h-[5px] font-display font-semibold text-black/30 mt-[10px]"
                      >
                        {pro.stock} Pack
                      </p>
                      <div className="flex mobile:h-[50px] tablet:h-[50px] laptop:h-[50px] computer:h-auto items-center gap-1.5 mt-1">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          ${pro.price}
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center bg-white p-3 rounded-[4px] gap-3">
                          <div className="mr-[12px]">
                            <h5 className="text-[14px] font-display font-bold">
                              1
                            </h5>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="transition-all ease-in-out duration-300  text-[12px] font-display font-bold text-black bg-white border border-[#e2e2e2] cursor-pointer py-1  flex items-center justify-center px-2.5 hover:text-[#FFF] hover:bg-green-500">
                              <FaPlus />
                            </button>
                            <button className="transition-all ease-in-out duration-300  text-[12px] font-display font-bold text-black bg-white border border-[#e2e2e2] cursor-pointer py-1  flex items-center justify-center px-2.5 hover:text-[#FFF] hover:bg-red-500">
                              <FaMinus />
                            </button>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => handleCartItem(pro)}
                            className="text-[18px] font-display font-bold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white cursor-pointer transition-all ease-in-out duration-300 flex items-center gap-2"
                          >
                            ADD
                            <span>
                              <TiShoppingCart size={20} />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page3;
