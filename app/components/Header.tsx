"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { GiIndianPalace } from 'react-icons/gi';
import SideMenu from './SideMenu';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" passHref className='flex items-center'>
              {/* <GiIndianPalace size={"2em"} /> */}
              <Image src="/Icon-Logo.svg" alt="Logo" width={50} height={50} className="mr-2" />
              <h1 className="ml-2 text-xl font-bold">
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
              <div className='mr-2 flex'>
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
