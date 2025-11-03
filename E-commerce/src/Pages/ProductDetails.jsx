import React, { useContext, useEffect, useState } from 'react';
import Container from '../Container';
import { Navigation, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import ProductDetalisPart1 from './ProductDetalisPart1';
import AddictionalDetail from './AddictionalDetail';
import CustomerReviews from './CustomerReviews';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import api from '../Api/axios';
import { SocketContext } from '../socket/SocketContext';

const ProductDetails = () => {
  let [buttonActive, setButtonActive] = useState({
    a: false,
    b: false,
    c: false,
  });
  const { id } = useParams();
  const socket = useContext(SocketContext);
  let { enqueueSnackbar } = useSnackbar();
  let location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [relatedProducts, setRelatedProducts] = useState(
    location.state?.relatedProducts || []
  );

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        let response = await api.get('product/GetProducts', { params: { id } });
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts);

        socket.emit('joinProduct', { productId: response.data.product._id });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product?._id) return;
    const handleNewReview = data => {
      if (data.productId === product._id) {
        setProduct(prev => ({
          ...prev,
          reviews: [data.review, ...prev.reviews],
          Totoalreviews: prev.reviews.length + 1,
        }));
      }
    };
    socket.on('reviewCreated', handleNewReview);
    return () => socket.off('reviewCreated', handleNewReview);
  }, [product?._id]);

  let handleCartItem = async product => {
    let userId = JSON.parse(localStorage.getItem('auth-Info')).user.id;
    try {
      let payload = {
        user: userId,
        product: product._id,
      };

      let response = await api.post('Cart/createCart', payload);
      enqueueSnackbar(response.data.msg, { variant: 'success' });
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const index = cart.findIndex(item => item._id === product._id);

      if (index > -1) {
        cart[index].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      let backendMsg = error.response?.data?.msg || 'Something went wrong!';
      enqueueSnackbar(backendMsg, { variant: 'error' });
    }
  };

  let handleProductItem = async id => {
    try {
      let response = await api.get('product/GetProducts', {
        params: { id: id },
      });

      window.location.href = `/productDetails/${id}/${response.data.product.name.replace(
        /\s+/g,
        '-'
      )}`;
    } catch (error) {
      console.error(error);
    }
  };

  let HandleActive = type => {
    setButtonActive({
      a: false,
      b: false,
      c: false,
      [type]: true,
    });
  };
  return (
    <>
      <section className="mobile:py-[50px] computer:py-[100px] bg-[#F3F4F6]">
        <Container>
          <div className="mobile:flex mobile:flex-wrap computer:flex gap-[50px] bg-white rounded-[6px] mobile:p-[15px] computer:p-[60px]">
            {product && (
              <>
                <div className="image computer:w-auto computer:h-auto mobile:w-full mobile:h-full">
                  <div className="mobile:w-auto computer:w-[480px] h-auto flex justify-center items-center mx-auto rounded-[6px] mb-[30px] border-2 border-[#f1f1f1]">
                    <img
                      className="w-full h-full"
                      src={product.photo}
                      alt="product"
                    />
                  </div>
                  <div className="flex items-center mobile:gap-0 computer:gap-6">
                    <div className="cursor-pointer  w-[100px] mobile:p-[8px] computer:p-[20px] border border-[#f1f1f1] rounded-[6px]">
                      <img
                        className="w-full h-auto"
                        src={product.photo}
                        alt=""
                      />
                    </div>
                    <div className="cursor-pointer  w-[100px] mobile:p-[8px] computer:p-[20px] border border-[#f1f1f1] rounded-[6px]">
                      <img
                        className="w-full h-auto"
                        src={product.photo}
                        alt=""
                      />
                    </div>
                    <div className="cursor-pointer  w-[100px] mobile:p-[8px] computer:p-[20px] border border-[#f1f1f1] rounded-[6px]">
                      <img
                        className="w-full h-auto"
                        src={product.photo}
                        alt=""
                      />
                    </div>
                    <div className="cursor-pointer  w-[100px] mobile:p-[8px] computer:p-[20px] border border-[#f1f1f1] rounded-[6px]">
                      <img
                        className="w-full h-auto"
                        src={product.photo}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="text_part">
                  <span className="flex items-center gap-1.5 mb-[20px]">
                    <i class="fa-solid fa-star text-yellow-500"></i>
                    <i class="fa-solid fa-star text-yellow-500"></i>
                    <i class="fa-solid fa-star text-yellow-500"></i>
                    <i class="fa-solid fa-star text-yellow-500"></i>
                    <i class="fa-solid fa-star text-yellow-500"></i>
                    <span className="text-[16px] font-display font-normal text-[#6E777D]">
                      ({product.Totoalreviews || 0} Reviews)
                    </span>
                  </span>
                  <h2 className="text-[26px] font-display font-bold leading-6 text-[#2C3C28] mb-[20px]">
                    {product.name}
                  </h2>
                  <p className="text-[16px] font-display font-normal text-[#6E777D] leading-7 mb-[30px] max-w-[540px]">
                    {product.discription}
                  </p>
                  <h3 className="text-[36px] font-display font-bold text-[#DC2626] mb-[15px]">
                    ${product.price}
                  </h3>
                  <button
                    onClick={() => handleCartItem(product)}
                    className="text-[16px] font-display font-bold text-white bg-[#629D23] px-[48px] py-[12px] rounded-[6px] cursor-pointer mb-[20px]"
                  >
                    Add To Cart
                    <span className="ml-[10px] ">
                      <i class="fa-light fa-cart-shopping"></i>
                    </span>
                  </button>
                  <div className="mt-[20px] mb-[10px]">
                    <p className="text-[16px] font-display font-bold text-[#6E777d] mb-[8px]">
                      Sold :<span className="ml-2">({product.sold})</span>
                    </p>
                    {product.stock > 20 ? (
                      <p className="text-[16px] font-display font-bold text-[#629D23]">
                        In Stock
                      </p>
                    ) : (
                      <span className="text-[16px] font-display font-bold text-[#6E777d]">
                        Available {product.stock}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[16px] font-bold text-[#6E777D] font-display mb-1.5">
                      Category :
                    </p>
                    <p>{product.category?.[0].name}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[16px] font-bold text-[#6E777D] font-display mb-1.5">
                      Tags :
                    </p>
                    <p>{product.category?.[0].name}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[16px] font-bold text-[#6E777D] font-display mb-1.5">
                      Type :
                    </p>
                    <p>Orginal</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bottom_part bg-white rounded-[6px] mobile:p-[15px] computer:p-[60px]">
            <div className="flex items-center mobile:gap-[8px] computer:gap-4 border-b border-[#dee2e6] pb-[30px]">
              <button
                onClick={() => HandleActive('a')}
                className={` computer:text-[16px] mobile:text-[12px] font-display font-bold ${
                  buttonActive.a
                    ? 'bg-[#629D23] text-white'
                    : 'bg-none text-[#495057]'
                } border border-[#dee2e6] hover:bg-[#629D23] transition-all ease-in-out duration-300 rounded-[6px] computer:w-[200px] computer:h-[60px] mobile:w-[115px] mobile:h-[50px] cursor-pointer hover:text-white`}
              >
                Product Details
              </button>
              <button
                onClick={() => HandleActive('b')}
                className={` computer:text-[16px] mobile:text-[12px] font-display font-bold ${
                  buttonActive.b
                    ? 'bg-[#629D23] text-white'
                    : 'bg-none text-[#495057]'
                } border border-[#dee2e6] hover:bg-[#629D23] transition-all ease-in-out duration-300 rounded-[6px] computer:w-[200px] computer:h-[60px] mobile:w-[115px] mobile:h-[50px] cursor-pointer  hover:text-white`}
              >
                Additional Information
              </button>
              <button
                onClick={() => HandleActive('c')}
                className={` computer:text-[16px] mobile:text-[12px] font-display font-bold ${
                  buttonActive.c
                    ? 'bg-[#629D23] text-white'
                    : 'bg-none text-[#495057]'
                } border border-[#dee2e6] hover:bg-[#629D23] transition-all ease-in-out duration-300 rounded-[6px] computer:w-[200px] computer:h-[60px] mobile:w-[115px] mobile:h-[50px] cursor-pointer hover:text-white`}
              >
                Customer Reviews ({product?.Totoalreviews || 0})
              </button>
            </div>
            <div className="mt-[20px] relative">
              {buttonActive.a && <ProductDetalisPart1 />}
              {buttonActive.b && <AddictionalDetail />}
              {buttonActive.c && <CustomerReviews product={product} />}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-[8px] mobile:p-[10px] computer:p-[30px] ">
              <div className="flex items-center justify-between border-b border-black/20 pb-[30px]">
                <h4 className="text-[30px] font-display leading-1.5 font-bold text-[#2C3C28] ">
                  Related Product
                </h4>
                <span className="flex items-center gap-3">
                  <button className="swiper-button-prev-custom bg-[#fff] hover:bg-[#629D23] w-[33px] h-[33px] border border-[#629D23] hover:text-white rounded-[8px] flex justify-center items-center ease-in-out duration-300 cursor-pointer">
                    <i class="fa-regular fa-arrow-left-from-arc"></i>
                  </button>
                  <button className="swiper-button-next-custom  bg-[#fff] hover:bg-[#629D23] w-[33px] h-[33px] border border-[#629D23] rounded-[8px]  hover:text-white flex justify-center items-center ease-in-out duration-300 cursor-pointer">
                    <i class="fa-regular fa-arrow-right-from-arc"></i>
                  </button>
                </span>
              </div>
              <div className="mt-[50px]">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={6}
                  slidesPerView={6}
                  slidesPerGroup={1}
                  loop={true}
                  speed={800}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 16,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 16,
                    },
                    1024: {
                      slidesPerView: 6,
                      spaceBetween: 16,
                    },
                  }}
                >
                  {relatedProducts.map((item, index) => (
                    <SwiperSlide
                      onClick={() => handleProductItem(item._id)}
                      key={index._id}
                    >
                      <div className=" p-[15px] mobile:w-[100%] mobile:h-[430px] mobile:mx-auto computer:w-[250px] computer:mx-0 computer:h-[386px] bg-[#F5F6F7] rounded-[6px] ">
                        <div className=" relative bg-white mobile:w-auto mobile:h-[50%] computer:w-[220px] flex items-center justify-center computer:h-[190px] rounded-[6px] overflow-hidden">
                          <img
                            className="w-[65%] h-auto hover:scale-120 ease-in-out duration-300 rounded-[8px] cursor-pointer"
                            src={item.photo}
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
                        <h4 className="text-[16px] font-display mobile:h-[55px] computer:h-auto font-bold mt-[10px] hover:text-[#629D23] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                          {item.name}
                        </h4>
                        <p className="text-[14px] mobile:h-[22px] computer:h-auto font-display font-semibold text-black/30 mt-[10px]">
                          {item.stock} Pack
                        </p>
                        <div className="flex mobile:h-[55px] computer:h-auto items-center gap-1.5 mt-1">
                          <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                            ${item.price}
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
                                <i class="fa-solid fa-plus-large"></i>
                              </button>
                              <button className="transition-all ease-in-out duration-300  text-[12px] font-display font-bold text-black bg-white border border-[#e2e2e2] cursor-pointer py-1  flex items-center justify-center px-2.5 hover:text-[#FFF] hover:bg-red-500">
                                <i class="fa-solid fa-minus"></i>
                              </button>
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => handleCartItem(item)}
                              className="text-[18px] font-display font-bold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white cursor-pointer transition-all ease-in-out duration-300"
                            >
                              ADD
                              <span>
                                <i class="fa-light fa-cart-shopping"></i>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
