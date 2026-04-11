import React from 'react';
import Container from '../Container';
import { FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';


const Fotter = () => {
  return (
    <>
      <section className="relative bg-[#F3F4F6] mobile:pt-[40px] tablet:pt-[60px] laptop:pt-[80px] computer:pt-[80px]">
        <div className="relative w-full my-10 border-t-2 border-dashed border-black/30 after:content-['Finishing'] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#F3F4F6] after:px-4 after:text-[#000] after:font-semibold"></div>
        <Container>
          <div className="computer:flex computer:flex-row mobile:flex mobile:flex-wrap items-center justify-between border-b border-[#6E777D]/30">
            <div className="mobile:py-[25px] computer:py-[60px]">
              <h3 className="text-[20px] font-display font-bold text-[#000] leading-[54px] mb-[20px]">
                About Company
              </h3>

              <div className="flex items-center gap-4 mb-[10px]">
                <div className="bg-white flex justify-center items-center w-[50px] h-[50px] rounded-full border border-[#e2e2e2]">
                  <FaPhoneAlt className="text-[#629D23] text-[24px]" />
                </div>
                <div>
                  <h5 className="text-[16px] font-display font-normal text-[#74787C]">
                    Have Question? Call Us 24/7
                  </h5>
                  <p className="text-[24px] font-display font-semibold text-[#629D23]">
                    +880 1887604100
                  </p>
                </div>
              </div>
              <p className="text-[#74787C] text-[16px] font-display font-normal mb-[10px]">
                Monday - Friday:
                <span className="text-[#000] text-[16px] font-display font-semibold ml-[8px]">
                  8:00am - 6:00pm
                </span>
              </p>
              <p className="text-[#74787C] text-[16px] font-display font-normal mb-[10px]">
                Saturday:
                <span className="text-[#000] text-[16px] font-display font-semibold ml-[8px]">
                  8:00am - 6:00pm
                </span>
              </p>
              <p className="text-[#74787C] text-[16px] font-display font-normal ">
                Sunday:
                <span className="text-[#000] text-[16px] font-display font-semibold ml-[8px]">
                  Service Close
                </span>
              </p>
            </div>
            <div className="mobile:py-[25px] computer:py-[60px]">
              <h3 className="text-[20px] font-display font-bold text-[#000] leading-[54px] mb-[20px]">
                Our Stores
              </h3>

              <div className="flex flex-col">
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Delivery Information
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Privacy Policy
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Terms & Conditions
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Support Center
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C]  hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Careers
                </a>
              </div>
            </div>
            <div className="mobile:py-[25px] computer:py-[60px]">
              <h3 className="text-[20px] font-display font-bold text-[#000] leading-[54px] mb-[20px]">
                Shop Categories
              </h3>

              <div className="flex flex-col">
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Contact Us
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Information
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  About Us
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Careers
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C]  hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Nest Stories
                </a>
              </div>
            </div>
            <div className="mobile:py-[25px] computer:py-[60px]">
              <h3 className="text-[20px] font-display font-bold text-[#000] leading-[54px] mb-[20px]">
                Useful Links
              </h3>

              <div className="flex flex-col">
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Cancellation & Returns
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Report Infringement
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Payments
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C] mb-[10px] hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  Shipping
                </a>
                <a
                  className="text-[16px] font-display font-normal text-[#74787C]  hover:text-[#629D23] ease-in-out duration-300"
                  href="#"
                >
                  FAQ
                </a>
              </div>
            </div>
            <div className="mobile:py-[25px] computer:py-[60px]">
              <h3 className="text-[20px] font-display font-bold text-[#000] leading-[54px] mb-[20px]">
                Our Newsletter
              </h3>
              <p className="mb-[20px] text-[16px] font-display font-normal mobile:w-auto computer:w-[352px] text-[#6E777D]">
                Subscribe to the mailing list to receive updates one the new
                arrivals and other discounts
              </p>
              <div class="relative mobile:w-auto w-[350px] h-[50px] mb-[20px]">
                <input
                  type="text"
                  class="w-full h-full bg-white placeholder:text-slate-400 text-slate-700 placeholder:font-display font-display text-[18px] border border-slate-300 outline-[#629D23] rounded-md pl-3 pr-[140px] py-2 transition duration-300 ease-in-out focus:border-[#629D23] "
                  placeholder="Your email address ..."
                />
                <button
                  class="absolute right-1 top-[50%] rounded font-display font-bold bg-[#629D23] py-[8px] px-[24px] border border-transparent text-center text-[16px] text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none hover:bg-slate-700 ease-in-out duration-300 cursor-pointer  disabled:opacity-50 disabled:shadow-none translate-y-[-50%] "
                  type="button"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-[16px] font-display font-normal text-[#6E777D]">
                I would like to receive news and special offer
              </p>
            </div>
          </div>
          <div className="computer:flex computer:flex-row mobile:flex mobile:flex-wrap justify-between items-center py-[30px]">
            <div className="flex items-center gap-[20px] ">
              <div className="text-[16px] font-normal text-[#6E777D] font-display">
                Follow Us:
              </div>

              <div className="flex items-center gap-5 ">
                {[
                  { icon: FaFacebookF, link: 'https://facebook.com' },
                  { icon: FaXTwitter, link: 'https://twitter.com' },
                  { icon: FaInstagram, link: 'https://instagram.com' },
                  { icon: FaLinkedinIn, link: 'https://linkedin.com' },
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group w-12 h-12 flex items-center justify-center text-2xl cursor-pointer "
                    >
                      <span className="absolute inset-0 bg-[#629D23] rounded-full scale-0 transition-transform duration-300 group-hover:scale-100  z-0"></span>
                      <IconComponent className="text-[#000] group-hover:text-white transition-all ease-in-out duration-300 z-10" />
                    </a>
                  );
                })}
              </div>
            </div>
            <div>
              <h5 className="text-[16px] font-display font-semibold text-[#6E777D] mb-[20px]">
                Copyright 2025 ©Ekomart. All rights reserved.
              </h5>
              <h5 className="text-[16px] font-display font-semibold text-[#6E777D]">
                Made By Mahammud Hassan Limon 🖤
              </h5>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Fotter;
