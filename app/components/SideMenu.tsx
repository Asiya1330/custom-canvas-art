// components/SideMenu.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';
import { SignedIn } from '@clerk/nextjs';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItemProps {
  label: string;
  path: string;
  onClose: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, path, onClose }) => {
  const router = useRouter();

  const handleClick = async () => {
    await router.push(path);
    onClose();
  };

  return (
    <li
      className="p-4 hover:bg-gray-700 cursor-pointer border-b border-gray-500"
      onClick={handleClick}
    >
      {label}
    </li>
  );
};

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 z-10 w-64 h-full bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out rounded-l-lg border-l border-gray-500 shadow-2xl`}
    >
      <div className="p-4 flex justify-end">
        <FiX size={24} onClick={onClose} className="cursor-pointer" />
      </div>
      <nav className="mt-5">
        <ul>
          <MenuItem label="Home" path="/" onClose={onClose} />
          <MenuItem label="Art Generation" path="/art-generation" onClose={onClose} />
          <SignedIn>
            <MenuItem label="Saved Art" path="/saved-art" onClose={onClose} />
          </SignedIn>
          {/* Add more menu items here */}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
