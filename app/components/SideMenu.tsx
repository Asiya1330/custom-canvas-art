// components/SideMenu.tsx
import React from 'react';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 right-0 z-10 w-64 h-full bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <FiX size={24} onClick={onClose} className="cursor-pointer" />
      <nav className="mt-10">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/art-generation">
              Art Generation
            </Link>
          </li>
          {/* Add more menu items here */}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
