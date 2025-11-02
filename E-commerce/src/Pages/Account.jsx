import React, { useState } from 'react';
import Container from '../Container';
import OrderDetails from './OrderDetails';
import TrackOrder from './TrackOrder';

const Account = () => {
  let [active, setActive] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
  });
  let handleActive = type => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      if (type === 'a') {
        window.location.href = '/orderDetails';
        return;
      }
      if (type === 'b') {
        window.location.href = '/trackOrder';
        return;
      }
    }
    setActive({
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      [type]: true,
    });
  };
  return (
    <>
      <section className="mobile:py-[50px] computer:py-[200px]">
        <Container>
          <div className="flex justify-between gap-10">
            <div className="mobile:w-full computer:w-[25%]">
              <ul>
                <li
                  onClick={() => handleActive('a')}
                  className={`text-[16px] font-display font-medium  py-[14px] px-[30px] ${
                    active.a
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  }  border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200 `}
                >
                  <span className="mr-3">
                    <i class="fa-light fa-bag-shopping"></i>
                  </span>
                  My Order
                </li>
                <li
                  onClick={() => handleActive('b')}
                  className={`text-[16px] font-display font-medium  py-[14px] px-[30px] ${
                    active.b
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  }  border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200 `}
                >
                  <span className="mr-3">
                    <i class="fa-light fa-truck-fast"></i>
                  </span>
                  Track Your Order
                </li>
                <li
                  onClick={() => handleActive('c')}
                  className={`text-[16px] font-display font-medium py-[14px] px-[30px] ${
                    active.c
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  } border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200 `}
                >
                  <span className="mr-3">
                    <i class="fa-light fa-user"></i>
                  </span>
                  Account Details
                </li>
                <li
                  onClick={() => handleActive('d')}
                  className={`text-[16px] font-display font-medium py-[14px] px-[30px] ${
                    active.d
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  } border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200 `}
                >
                  <span className="mr-3">
                    <i class="fa-light fa-arrow-turn-left"></i>
                  </span>
                  My Cancelation & Return
                </li>
                <li
                  onClick={() => handleActive('e')}
                  className={`text-[16px] font-display font-medium py-[14px] px-[30px] ${
                    active.e
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  } border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200 `}
                >
                  <span className="mr-3">
                    <i class="fa-light fa-right-from-bracket"></i>
                  </span>
                  Log Out
                </li>
              </ul>
            </div>

            <div className="mobile:w-0 mobile:hidden computer:block computer:w-[75%]">
              {active.a && <OrderDetails />}
              {active.b && <TrackOrder />}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Account;
