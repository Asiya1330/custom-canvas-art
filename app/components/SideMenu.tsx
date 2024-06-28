// components/SideMenu.tsx
import React from 'react';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleNavigation = async (url: string) => {
    await router.push(url);
    onClose();
  };

  return (
    <div 
      className={`fixed top-0 right-0 z-10 w-64 h-full bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="p-4 flex justify-end">
        <FiX size={24} onClick={onClose} className="cursor-pointer" />
      </div>
      <nav className="mt-5">
        <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => handleNavigation('/')}>
            Home
          </li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => handleNavigation('/art-generation')}>
            Art Generation
          </li>
          {/* Add more menu items here */}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
