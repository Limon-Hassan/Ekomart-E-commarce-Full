import React from 'react';
import { Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Container from '../Container';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { IoIosStar } from 'react-icons/io';

const Page6 = () => {
  return (
    <>
      <section className="bg-[#dbe2e9]/30 mobile:pb-[25px] computer:pb-[50px] tablet:pb-[50px] laptop:pb-[50px] mobile:pt-[20px] computer:pt-[60px] tablet:pt-[60px] laptop:pt-[60px]">
        <Container>
          <div>
            <div className="bg-white rounded-[8px] mobile:p-[20px] computer:p-[30px]">
              <div className="flex items-center justify-between border-b border-black/20 pb-[30px]">
                <h4 className="mobile:text-[26px] computer:text-[30px] font-display leading-1.5 font-bold text-[#2C3C28] ">
                  Recently Added
                </h4>
                <span className="flex items-center gap-3">
                  <button className="swiper-button-prev-custom bg-[#fff] hover:bg-[#629D23] w-[33px] h-[33px] border border-[#629D23] hover:text-white rounded-[8px] flex justify-center items-center ease-in-out duration-300 cursor-pointer">
                    <MdKeyboardArrowLeft size={28} />
                  </button>
                  <button className="swiper-button-next-custom  bg-[#fff] hover:bg-[#629D23] w-[33px] h-[33px] border border-[#629D23] rounded-[8px]  hover:text-white flex justify-center items-center ease-in-out duration-300 cursor-pointer">
                    <MdKeyboardArrowRight size={28} />
                  </button>
                </span>
              </div>
              <div className="mt-[50px]">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={16}
                  slidesPerView={6}
                  slidesPerGroup={1}
                  loop={true}
                  speed={800}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 16,
                    },
                    420: {
                      slidesPerView: 1,
                      spaceBetween: 16,
                    },
                    620: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    720: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1324: {
                      slidesPerView: 6,
                      spaceBetween: 16,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="fulkopi.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <p className="text-[14px] font-display font-semibold text-black/30 mt-[10px]">
                        500g Pack
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          See Details
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="fulkopi.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <p className="text-[14px] font-display font-semibold text-black/30 mt-[10px]">
                        500g Pack
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          See Details
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="fulkopi.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <p className="text-[14px] font-display font-semibold text-black/30 mt-[10px]">
                        500g Pack
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          See Details
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="fulkopi.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <p className="text-[14px] font-display font-semibold text-black/30 mt-[10px]">
                        500g Pack
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          See Details
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="fulkopi.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <p className="text-[14px] font-display font-semibold text-black/30 mt-[10px]">
                        500g Pack
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          See Details
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="fulkopi.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <p className="text-[14px] font-display font-semibold text-black/30 mt-[10px]">
                        500g Pack
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          See Details
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="fulkopi.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <p className="text-[14px] font-display font-semibold text-black/30 mt-[10px]">
                        500g Pack
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          See Details
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="fulkopi.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <p className="text-[14px] font-display font-semibold text-black/30 mt-[10px]">
                        500g Pack
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          See Details
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className="bg-white rounded-[8px] mobile:p-[20px] computer:p-[30px] mobile:mt-[25px] computer:mt-0">
              <div className="flex items-center justify-between border-b border-black/20 pb-[30px]">
                <h4 className="mobile:text-[26px] computer:text-[30px] font-display leading-1.5 font-bold text-[#2C3C28] ">
                  Top Rated
                </h4>
                <span className="flex items-center gap-3">
                  <button className="swiper-button-prev-customs bg-[#fff] hover:bg-[#629D23] w-[33px] h-[33px] border border-[#629D23] hover:text-white rounded-[8px] flex justify-center items-center ease-in-out duration-300 cursor-pointer">
                    <MdKeyboardArrowLeft size={28} />
                  </button>
                  <button className="swiper-button-next-customs  bg-[#fff] hover:bg-[#629D23] w-[33px] h-[33px] border border-[#629D23] rounded-[8px] hover:text-white flex justify-center items-center ease-in-out duration-300 cursor-pointer">
                    <MdKeyboardArrowRight size={28} />
                  </button>
                </span>
              </div>
              <div className="mt-[50px]">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={16}
                  slidesPerView={6}
                  slidesPerGroup={1}
                  loop={true}
                  speed={800}
                  navigation={{
                    nextEl: '.swiper-button-next-customs',
                    prevEl: '.swiper-button-prev-customs',
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 16,
                    },
                    420: {
                      slidesPerView: 1,
                      spaceBetween: 16,
                    },
                    620: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    720: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1324: {
                      slidesPerView: 6,
                      spaceBetween: 16,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="16.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <span className="flex items-center gap-[4px] mt-[10px]">
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <span className="text-[16px] font-display font-normal text-[#6E777D]">
                          (125 Reviews)
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="16.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <span className="flex items-center gap-[4px] mt-[10px]">
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <span className="text-[16px] font-display font-normal text-[#6E777D]">
                          (125 Reviews)
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="16.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <span className="flex items-center gap-[4px] mt-[10px]">
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <span className="text-[16px] font-display font-normal text-[#6E777D]">
                          (125 Reviews)
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="16.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <span className="flex items-center gap-[4px] mt-[10px]">
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <span className="text-[16px] font-display font-normal text-[#6E777D]">
                          (125 Reviews)
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="16.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <span className="flex items-center gap-[4px] mt-[10px]">
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <span className="text-[16px] font-display font-normal text-[#6E777D]">
                          (125 Reviews)
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="16.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <span className="flex items-center gap-[4px] mt-[10px]">
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <span className="text-[16px] font-display font-normal text-[#6E777D]">
                          (125 Reviews)
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="16.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <span className="flex items-center gap-[4px] mt-[10px]">
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <span className="text-[16px] font-display font-normal text-[#6E777D]">
                          (125 Reviews)
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="p-[15px] mobile:w-full computer:w-[250px] h-[460px] bg-[#F5F6F7] rounded-[6px]">
                      <div className=" bg-white w-full h-[250px] rounded-[6px]">
                        <img
                          className="w-[100%] h-[240px] rounded-[6px] object-cover"
                          src="16.jpg"
                          alt="jpg"
                        />
                      </div>
                      <h4 className="text-[16px] font-display font-bold  hover:text-[#629D23] mt-[10px] transition-all ease-in-out duration-300 w-[220px] cursor-pointer ">
                        Details Profitable business makes your profit
                      </h4>
                      <span className="flex items-center gap-[4px] mt-[10px]">
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <IoIosStar className="text-yellow-400 text-[14px]" />
                        <span className="text-[16px] font-display font-normal text-[#6E777D]">
                          (125 Reviews)
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 mb-[10px]">
                        <h3 className="text-[20px] font-display font-bold text-[#DC2626]">
                          $29.00
                        </h3>
                        <h3 className="line-through text-[18px] font-display font-semibold text-black/30">
                          $36.00
                        </h3>
                      </div>
                      <div>
                        <button className="text-[18px] font-display font-semibold text-[#629D23] border border-[#629D23] py-[7px] px-3 rounded-[6px] hover:bg-[#629D23] hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page6;
