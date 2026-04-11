import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa6';

const Pegination = ({ active, setActive, totalPages }) => {
  const next = () => {
    window.scrollTo(0, 0);
    if (active < totalPages) setActive(active + 1);
  };

  const prev = () => {
    window.scrollTo(0, 0);
    if (active > 1) setActive(active - 1);
  };
  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          disabled={active === 1}
          className={`uppercase cursor-pointer flex items-center gap-2 px-[12px] py-[10px] rounded-full text-sm  font-medium transition-all ease-in-out duration-300 ${
            active === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'hover:text-[#FFF] text-black hover:bg-[#629D23]'
          }`}
        >
          <span>
            <FaArrowLeft size={20} />
          </span>
          Previous
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setActive(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ease-in-out duration-200 font-bold text-sm ${
                active === page
                  ? 'bg-[#629D23] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-[#629D23]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={active === totalPages}
          className={`uppercase cursor-pointer flex items-center gap-2 px-[12px] py-[10px] rounded-full text-sm  font-medium transition-all ease-in-out duration-300 ${
            active === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'hover:text-[#FFF] text-black hover:bg-[#629D23]'
          }`}
        >
          Next
          <span>
            <FaArrowRight size={20}/>
          </span>
        </button>
      </div>
    </>
  );
};

export default Pegination;
