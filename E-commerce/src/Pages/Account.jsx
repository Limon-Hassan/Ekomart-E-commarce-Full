import React, { useState } from 'react';
import Container from '../Container';
import OrderDetails from './OrderDetails';
import TrackOrder from './TrackOrder';
import { FaShoppingBag } from 'react-icons/fa';
import {
  FaArrowRightFromBracket,
  FaLeftRight,
  FaTruckMoving,
} from 'react-icons/fa6';
import { CiUser } from 'react-icons/ci';

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
            <div className="mobile:w-full tablet:w-full laptop:w-[25%] computer:w-[25%]">
              <ul>
                <li
                  onClick={() => handleActive('a')}
                  className={`text-[16px] font-display font-medium  py-[14px] px-[30px] ${
                    active.a
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  }  border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200 flex items-center `}
                >
                  <span className="mr-3">
                    <FaShoppingBag size={20} />
                  </span>
                  My Order
                </li>
                <li
                  onClick={() => handleActive('b')}
                  className={`text-[16px] font-display font-medium  py-[14px] px-[30px] ${
                    active.b
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  }  border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200 flex items-center`}
                >
                  <span className="mr-3">
                    <FaTruckMoving size={20} />
                  </span>
                  Track Your Order
                </li>
                <li
                  onClick={() => handleActive('c')}
                  className={`text-[16px] font-display font-medium py-[14px] px-[30px] ${
                    active.c
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  } border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200  flex items-center`}
                >
                  <span className="mr-3">
                    <CiUser size={20} />
                  </span>
                  Account Details
                </li>
                <li
                  onClick={() => handleActive('d')}
                  className={`text-[16px] font-display font-medium py-[14px] px-[30px] ${
                    active.d
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  } border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200 flex items-center`}
                >
                  <span className="mr-3">
                    <FaLeftRight size={20} />
                  </span>
                  My Cancelation & Return
                </li>
                <li
                  onClick={() => handleActive('e')}
                  className={`text-[16px] font-display font-medium py-[14px] px-[30px] ${
                    active.e
                      ? 'bg-[#629D23] text-white'
                      : 'bg-none text-[#2C3C28]'
                  } border border-[#e2e2e2] rounded-[4px] mb-[10px] cursor-pointer transition-all ease-in-out duration-200 flex items-center`}
                >
                  <span className="mr-3">
                    <FaArrowRightFromBracket size={20} />
                  </span>
                  Log Out
                </li>
              </ul>
            </div>

            <div className="mobile:hidden tablet:hidden laptop:block computer:block w-[75%]">
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
