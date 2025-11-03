import React from 'react';
import Container from '../Container';

const Page8 = () => {
  return (
    <>
      <section className="bg-[#629D23] mobile:pb-[25px] tablet:pb-[50px] laptop:pb-[50px] computer:pb-[50px] mobile:py-[25px] computer:py-[60px] tablet:py-[60px] laptop:py-[60px] ">
        <Container>
          <div className="flex flex-wrap mobile:justify-normal computer:justify-normal tablet:justify-normal laptop:justify-around gap-8 items-center">
            {[
              {
                icon: 'fa-light fa-badge-dollar',
                title: 'Best Prices & Offers',
              },
              {
                icon: 'fa-light fa-circle-arrow-left',
                title: '100% Return Policy',
              },
              { icon: 'fa-light fa-headset', title: 'Support 24/7' },
              { icon: 'fa-light fa-fire', title: 'Great Offer Daily Deal' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex justify-center items-center rounded-full bg-white w-[60px] h-[60px] tablet:w-[70px] tablet:h-[70px] laptop:w-[80px] laptop:h-[80px] computer:w-[90px] computer:h-[90px] transition-all duration-500 ease-in-out">
                  <i
                    className={`${item.icon} 
                   text-[#629D23] 
                   text-[28px] tablet:text-[34px] laptop:text-[40px] computer:text-[45px] `}
                  ></i>
                </div>

                <div>
                  <h4 className="text-[16px] tablet:text-[18px] laptop:text-[20px] font-display font-bold text-white leading-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[14px] tablet:text-[15px] laptop:text-[16px] text-[#fff] max-w-[260px] leading-snug">
                    We prepared special discounts for you on grocery products.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page8;
