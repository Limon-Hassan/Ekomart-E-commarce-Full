import React from 'react';

const Container = ({ children, className = '' }) => {
  return (
    <div
      className={`w-full mx-auto mobile:px-3 tablet:px-6 laptop:px-8 computer:px-0  max-w-[1660px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
