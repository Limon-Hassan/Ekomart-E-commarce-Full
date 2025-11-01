import React from 'react';
import Container from '../Container';
import Page1 from './Page1';
import { Link } from 'react-router-dom';

const Navber2 = () => {
  return (
    <>
      <nav className="bg-[#22351E] mobile:hidden computer:block">
        <Container>
          <div className="flex items-center justify-between">
            <div className="relative w-[280px] inline-block group">
              <button className="text-[20px] group-hover:bg-black transition-all ease-in-out duration-300 font-display font-semibold text-[#fff] bg-[#629D23] py-[22px] px-[25px] w-full cursor-pointer">
                All Categories
                <span className="ml-[80px]">
                  <i class="fa-light fa-chevrons-down"></i>
                </span>
              </button>
              <div
                className=" absolute top-0 left-0 w-[280px] bg-black shadow-3xl py-[10px] z-10 
               opacity-0 invisible translate-y-[130px] 
               transition-all duration-300 ease-in-out 
               group-hover:opacity-100 group-hover:visible group-hover:translate-y-[74px] border-x-2 border-[#629D23] border-b-2 rounded-b-lg"
              >
                <ul className="">
                  <li className=" text-[18px] font-display font-semibold hover:w-full hover:bg-[#629D23] text-amber-700 px-6 py-3 cursor-pointer transition-all ease-in-out duration-300 hover:text-white">
                    <span className="mr-[25px]">
                      <i class="fa-thin fa-apple-whole"></i>
                    </span>
                    Breakfast & Dairy
                  </li>
                  <li className=" text-[18px] font-display font-semibold hover:w-full hover:bg-[#629D23] text-amber-700 px-6 py-3 cursor-pointer transition-all ease-in-out duration-300 hover:text-white">
                    <span className="mr-[25px]">
                      <i class="fa-thin fa-apple-whole"></i>
                    </span>
                    Breakfast & Dairy
                  </li>
                  <li className=" text-[18px] font-display font-semibold hover:w-full hover:bg-[#629D23] text-amber-700 px-6 py-3 cursor-pointer transition-all ease-in-out duration-300 hover:text-white">
                    <span className="mr-[25px]">
                      <i class="fa-thin fa-apple-whole"></i>
                    </span>
                    Breakfast & Dairy
                  </li>
                </ul>
              </div>
            </div>
            <ul className="flex gap-[40px]">
              <Link
                to="/"
                className="text-[18px] font-display font-semibold text-[#FFF] hover:text-[#629D23] ease-in-out transition-all duration-300"
              >
                <a href="#">Home</a>
              </Link>
              <li className="text-[18px] font-display font-semibold text-[#FFF] hover:text-[#629D23] ease-in-out transition-all duration-300">
                <a href="#">About</a>
              </li>
              <Link
                to="/shop"
                className="text-[18px] font-display font-semibold text-[#FFF] hover:text-[#629D23] ease-in-out transition-all duration-300"
              >
                <a href="#">Shop</a>
              </Link>
              <li className="text-[18px] font-display font-semibold text-[#FFF] hover:text-[#629D23] ease-in-out transition-all duration-300">
                <a href="#">Blog</a>
              </li>
              <li className="text-[18px] font-display font-semibold text-[#FFF] hover:text-[#629D23] ease-in-out transition-all duration-300">
                <a href="#">Dashboard</a>
              </li>
              <li className="text-[18px] font-display font-semibold text-[#FFF] hover:text-[#629D23] ease-in-out transition-all duration-300">
                <a href="#">Contact</a>
              </li>
            </ul>
            <div className="flex gap-4 items-center">
              <p className="text-[18px] font-display font-semibold  text-white">
                Get 30% Discount Now
              </p>
              <button className="text-[16px] text-white font-display font-semibold bg-[#629D23] px-[15px] py-[2px] rounded-[33px]">
                SALE
              </button>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navber2;
