"use client";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { CiBookmark } from "react-icons/ci";
import { FiMenu, FiShoppingCart } from 'react-icons/fi';
import SideMenu from './SideMenu';

const Header: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };


  return (
    <>
      <header className="bg-custom-black text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" passHref className='flex items-center'>
              {/* <GiIndianPalace size={"2em"} /> */}
              <Image src="/Icon-Logo.svg" alt="Logo" width={50} height={50} className="mr-2" />
              <h1 className="ml-2 text-xl font-bold hidden md:block">
                <Image src="/logo.svg" alt="Logo" width={150} height={100} className="mr-4" />

              </h1>
            </Link>

          </div>
          <div className="flex items-center">
            <SignedOut>
              <div className='flex items-center space-x-4 justify-center'>
              <SignUpButton mode='modal' />
              <SignInButton mode='modal' />
              </div>
            </SignedOut>
            <SignedIn>
              <div className='mr-2 flex items-center space-x-8'>
                <Link href="/saved-art" passHref className="text-white hover:text-gray-300 border-r border-[#223F61] px-2">
                  <CiBookmark size={24} style={{ strokeWidth: '1' }} />
                </Link>
                <Link href="/cart" passHref className="text-white hover:text-gray-300 border-r border-[#223F61] px-2 !m-0">
                  <FiShoppingCart size={24} />
                </Link>
                <UserButton />
              </div>
            </SignedIn>
            <FiMenu className="text-white cursor-pointer ml-2" size={24} onClick={toggleSideMenu} />
          </div>
        </div>
      </header>
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
      {isSideMenuOpen && <div className="fixed inset-0 z-0" onClick={closeSideMenu}></div>}
    </>
  );
};

export default Header; 
