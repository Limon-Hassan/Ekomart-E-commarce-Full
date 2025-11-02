import React from 'react';
import Container from '../Container';

const Page8 = () => {
  return (
    <>
      <section className="bg-[#629D23] mobile:pb-[25px] computer:pb-[50px] mobile:py-[25px] computer:py-[60px] ">
        <Container>
          <div className=" computer:flex computer:flex-row mobile:flex mobile:flex-wrap mobile:justify-normal computer:justify-between items-center mobile:gap-5 computer:gap-0">
            <div className="flex items-center gap-[20px]">
              <div className="mobile:w-[70px] mobile:h-[60px] computer:w-[80px] computer:h-[80px] rounded-full bg-white flex justify-center items-center">
                <i class="fa-light fa-badge-dollar text-[40px] text-[#629D23]"></i>
              </div>
              <div className="relative ">
                <div className="absolute bottom-[-4px] left-[-10px] w-0.5 h-[80px] bg-white"></div>
                <h4 className="text-[20px] font-display font-bold text-white leading-1.5 mb-[15px]">
                  Best Prices & Offers
                </h4>
                <p className="text-[16px] font-normal font-display text-[#fff] leading-[23px] mobile:w-auto computer:w-[305px]">
                  We prepared special discounts you on grocery products.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[20px]">
              <div className="mobile:w-[70px] mobile:h-[60px] computer:w-[80px] computer:h-[80px] rounded-full bg-white flex justify-center items-center">
                <i class="fa-light fa-circle-arrow-left  text-[40px] text-[#629D23]"></i>
              </div>
              <div className="relative">
                <div className="absolute bottom-[-4px] left-[-10px] w-0.5 h-[80px] bg-white"></div>
                <h4 className="text-[20px] font-display font-bold text-white leading-1.5 mb-[15px]">
                  100% Return Policy
                </h4>
                <p className="text-[16px] font-normal font-display text-[#fff] leading-[23px] mobile:w-auto computer:w-[305px]">
                  We prepared special discounts you on grocery products.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[20px]">
              <div className="mobile:w-[70px] mobile:h-[60px] computer:w-[80px] computer:h-[80px] rounded-full bg-white flex justify-center items-center">
                <img
                  className="w-[50px] text-[#629D23]"
                  src="svgfrom.svg"
                  alt="svgfrom"
                />
              </div>
              <div className="relative">
                <div className="absolute bottom-[-4px] left-[-10px] w-0.5 h-[80px] bg-white"></div>
                <h4 className="text-[20px] font-display font-bold text-white leading-1.5 mb-[15px]">
                  Support 24/7
                </h4>
                <p className="text-[16px] font-normal font-display text-[#fff] leading-[23px] mobile:w-auto computer:w-[305px]">
                  We prepared special discounts you on grocery products.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[20px]">
              <div className="mobile:w-[70px] mobile:h-[60px] computer:w-[80px] computer:h-[80px] rounded-full bg-white flex justify-center items-center">
                <i class="fa-light fa-fire text-[40px] text-[#629D23]"></i>
              </div>
              <div className="relative">
                <div className="absolute bottom-[-4px] left-[-10px] w-0.5 h-[80px] bg-white"></div>
                <h4 className="text-[20px] font-display font-bold text-white leading-1.5 mb-[15px]">
                  Great Offer Daily Deal
                </h4>
                <p className="text-[16px] font-normal font-display text-[#fff] leading-[23px] mobile:w-auto computer:w-[305px]">
                  We prepared special discounts you on grocery products.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page8;
