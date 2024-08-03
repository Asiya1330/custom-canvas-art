import React from 'react';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';

interface ProductQuantityControlsProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductQuantityControls: React.FC<ProductQuantityControlsProps> = ({
  quantity,
  setQuantity,
}) => {
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex items-center border rounded p-1">
      <button
        onClick={decrement}
        className="text-xl px-2 py-1"
      >
        <FaRegTrashAlt className="" size={10}/>
      </button>
      <span className="text-sm mx-2">{quantity}</span>
      <button
        onClick={increment}
        className="text-xl px-2 py-1"
      >
        <FaPlus className="" size={10}/>
      </button>
    </div>
  );
};

export default ProductQuantityControls;
