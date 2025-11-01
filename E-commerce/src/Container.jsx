import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="mobile:p-2.5  computer:max-w-[1666px] computer:mx-auto computer:p-0">
      {children}
    </div>
  );
};

export default Container;
