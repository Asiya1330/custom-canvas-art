"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiMenu, FiSave, FiShoppingCart } from 'react-icons/fi';
import { GiIndianPalace } from 'react-icons/gi';
import SideMenu from './SideMenu';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { FaSave } from 'react-icons/fa';
import { CiBookmark } from "react-icons/ci";
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
              <Link href="/sign-in" passHref className="text-white mr-4 hover:underline">
                Sign In
              </Link>
              <Link href="/sign-up" passHref className="text-white mr-4 hover:underline">
                Sign Up
              </Link>
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
            <FiMenu className="text-white cursor-pointer" size={24} onClick={toggleSideMenu} />
          </div>
        </div>
      </header>
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
      {isSideMenuOpen && <div className="fixed inset-0 z-0" onClick={closeSideMenu}></div>}
    </>
  );
};

export default Header; 
