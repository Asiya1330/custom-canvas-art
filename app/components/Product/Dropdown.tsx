'use client';

import { FC, ReactNode } from 'react';
import { BeatLoader } from 'react-spinners';

interface DropdownProps {
  label: string;
  loading: boolean;
  showDropdown: boolean;
  toggleDropdown: () => void;
  children: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ label, loading, showDropdown, toggleDropdown, children }) => {
  return (
    <div className="relative mb-2">
      {loading ? (
        <div className="flex items-center justify-center py-2">
          <BeatLoader size={20} />
        </div>
      ) : (
        <div className="relative">
          <div
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
            onClick={toggleDropdown}
          >
            {label}
          </div>
          {showDropdown && (
            <div className="absolute z-10 bg-white border border-gray-400 rounded shadow-lg w-full">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
