import React from 'react';
import Container from '../Container';
import Page5 from './Page5';
import { FaPlus } from 'react-icons/fa6';

const Page4 = () => {
  return (
    <>
      <section className="bg-[#dbe2e9]/30 mobile:pt-[20px] tablet:pt-[60px] laptop:pt-[60px] computer:pt-[60px] ">
        <Container>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            <div className="bg-[url(/01.jpg)] w-full mobile:h-[300px] tablet:h-[400px] laptop:h-[400px] computer:h-[400px] bg-no-repeat mobile:py-[30px] mobile:px-[20px] computer:py-[40px] computer:px-[70px]  bg-cover">
              <div className="">
                <button className="text-[16px] font-display font-bold text-[#FFF] py-[7px] px-[26px] rounded-[6px] bg-[#629D23] mb-[25px]">
                  Weekend Discount
                </button>
                <h3 className="mobile:text-[18px] computer:text-[26px] font-display font-bold text-[#1F1F25] mb-[20px] leading-1.5">
                  Drink Fresh Corn Juice
                </h3>
                <h4 className="text-[26px] font-display font-normal text-[#629D23] mb-[20px] ">
                  Good Taste
                </h4>
                <div className="group flex items-center gap-2">
                  <button className="text-[12px] transition-all font-bold text-[#FFF] py-2.5 cursor-pointer group-hover:text-white group-hover:bg-[#1F1F25] ease-in-out duration-300 px-2.5 bg-[#629D23] rounded-full">
                    <FaPlus size={28} />
                  </button>
                  <span className=" cursor-pointer font-display font-bold">
                    Shop Now
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[url(/02.jpg)] w-full mobile:h-[300px] tablet:h-[400px] laptop:h-[400px] computer:h-[400px] bg-no-repeat mobile:py-[30px] mobile:px-[20px] computer:py-[40px] computer:px-[70px] bg-cover">
              <div className="">
                <button className="text-[16px] font-display font-bold text-[#FFF] py-[7px] px-[26px] rounded-[6px] bg-[#629D23] mb-[25px]">
                  Weekend Discount
                </button>
                <h3 className="mobile:text-[18px] computer:text-[26px] font-display font-bold text-[#1F1F25] mb-[20px] leading-1.5">
                  Drink Fresh Corn Juice
                </h3>
                <h4 className="text-[26px] font-display font-normal text-[#629D23] mb-[20px] ">
                  Good Taste
                </h4>
                <div className="group flex items-center gap-2">
                  <button className="text-[12px] transition-all font-bold text-[#FFF] py-2.5 cursor-pointer group-hover:text-white group-hover:bg-[#1F1F25] ease-in-out duration-300 px-2.5 bg-[#629D23] rounded-full">
                    <FaPlus size={28} />
                  </button>
                  <span className=" cursor-pointer font-display font-bold">
                    Shop Now
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[url(/03.jpg)] w-full mobile:h-[300px] tablet:h-[400px] laptop:h-[400px] computer:h-[400px] bg-no-repeat mobile:py-[30px] mobile:px-[20px] computer:py-[40px] computer:px-[70px]  bg-cover">
              <div className="">
                <button className="text-[16px] font-display font-bold text-[#FFF] py-[7px] px-[26px] rounded-[6px] bg-[#629D23] mb-[25px]">
                  Weekend Discount
                </button>
                <h3 className="mobile:text-[18px] computer:text-[26px] font-display font-bold text-[#1F1F25] mb-[20px] leading-1.5">
                  Drink Fresh Corn Juice
                </h3>
                <h4 className="text-[26px] font-display font-normal text-[#629D23] mb-[20px] ">
                  Good Taste
                </h4>
                <div className="group flex items-center gap-2">
                  <button className="text-[12px] transition-all font-bold text-[#FFF] py-2.5 cursor-pointer group-hover:text-white group-hover:bg-[#1F1F25] ease-in-out duration-300 px-2.5 bg-[#629D23] rounded-full">
                    <FaPlus size={28} />
                  </button>
                  <span className=" cursor-pointer font-display font-bold">
                    Shop Now
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[url(/04.jpg)] w-full mobile:h-[300px] tablet:h-[400px] laptop:h-[400px] computer:h-[400px] bg-no-repeat mobile:py-[30px] mobile:px-[20px] computer:py-[40px] computer:px-[70px]  bg-cover">
              <div className="">
                <button className="text-[16px] font-display font-bold text-[#FFF] py-[7px] px-[26px] rounded-[6px] bg-[#629D23] mb-[25px]">
                  Weekend Discount
                </button>
                <h3 className="mobile:text-[18px] computer:text-[26px] font-display font-bold text-[#1F1F25] mb-[20px] leading-1.5">
                  Drink Fresh Corn Juice
                </h3>
                <h4 className="text-[26px] font-display font-normal text-[#629D23] mb-[20px] ">
                  Good Taste
                </h4>
                <div className="group flex items-center gap-2">
                  <button className="text-[12px] transition-all font-bold text-[#FFF] py-2.5 cursor-pointer group-hover:text-white group-hover:bg-[#1F1F25] ease-in-out duration-300 px-2.5 bg-[#629D23] rounded-full">
                    <FaPlus size={28} />
                  </button>
                  <span className=" cursor-pointer font-display font-bold">
                    Shop Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page4;
