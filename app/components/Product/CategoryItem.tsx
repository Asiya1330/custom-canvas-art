'use client';

import { FC } from 'react';
import Image from 'next/image';

interface CategoryItemProps {
  id: number;
  name: string;
  imageUrl: string;
  onClick: () => void;
}

const CategoryItem: FC<CategoryItemProps> = ({ id, name, imageUrl, onClick }) => {
  return (
    <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer" onClick={onClick}>
      <Image src={imageUrl} alt={name} width={40} height={40} className="mr-2" />
      <span>{name}</span>
    </div>
  );
};

export default CategoryItem;
