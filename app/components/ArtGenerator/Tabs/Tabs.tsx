// components/Tabs.tsx
import React from 'react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-4 bg-gray-100 rounded-full p-1">
      <button
        className={`px-4 py-2 w-1/2 ${activeTab === 'text-to-image' ? ' rounded-full shadow text-white bg-custom-green py-4' : ' text-black'}`}
        onClick={() => setActiveTab('text-to-image')}
      >
        Text-to-Image
      </button>
      <button
        className={`px-4 py-2 w-1/2 ${activeTab === 'image-to-image' ? ' rounded-full shadow text-white bg-custom-green py-4' : ' text-black'}`}
        onClick={() => setActiveTab('image-to-image')}
      >
        Image-to-Image
      </button>
    </div>
  );
};

export default Tabs;
