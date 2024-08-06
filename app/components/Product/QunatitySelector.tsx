// components/Product/QuantitySelector.tsx
import { FC } from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      onQuantityChange(value);
    }
  };

  return (
    <div className='sm:max-w-xs flex items-center mb-2'>
      <h2 className="text-lg font-bold block w-1/3">
        Quantity:
      </h2>
      <input
        type="number"
        id="quantity"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
        className="w-full sm:max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-2/3"
      />
    </div>
  );
};

export default QuantitySelector;
