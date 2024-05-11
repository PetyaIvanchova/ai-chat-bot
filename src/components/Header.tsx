import React from 'react';
import Image from 'next/image';


const Header: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4 overflow-auto bg-white items-center">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Header;
