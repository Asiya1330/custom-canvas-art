"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { GiIndianPalace } from 'react-icons/gi';
import SideMenu from './SideMenu';

const Header: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" passHref>
              <GiIndianPalace size={"2em"} />
              {/* <Image src="/logo.png" alt="Logo" width={50} height={50} className="mr-4" /> */}
            </Link>
            <h1 className="ml-2 text-xl font-bold">Custom Canvas</h1>
          </div>
          <div className="flex items-center">
            <Link href="/login" passHref className="text-white mr-4 hover:underline">
              Log In
            </Link>
            <FiMenu className="text-white cursor-pointer" size={24} onClick={toggleSideMenu} />
          </div>
        </div>
      </header>
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
    </>
  );
};

export default Header;
