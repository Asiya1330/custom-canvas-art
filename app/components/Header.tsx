// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} className="mr-4" />
          <h1 className="text-xl font-bold">Custom Canvas</h1>
        </div>
        <div className="flex items-center">
          <Link href="/login" passHref className="text-white mr-4 hover:underline">
            Login
          </Link>
          <FiMenu className="text-white cursor-pointer" size={24} />
        </div>
      </div>
    </header>
  );
};

export default Header;
