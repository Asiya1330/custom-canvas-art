// components/PriceCalculator.tsx

import { useState } from 'react';
import axios from 'axios';

const PriceCalculator = () => {
  const [product, setProduct] = useState('');
  const [subProduct, setSubProduct] = useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [price, setPrice] = useState<number | null>(null);

  const handleCalculatePrice = async () => {
    try {
      const response = await axios.post('/api/calculatePrice', {
        product,
        subProduct,
        width,
        height,
      });
      setPrice(response.data.price);
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

  return (
    <div>
      {/* Add your inputs for product, subProduct, width, and height here */}
      <button onClick={handleCalculatePrice}>Calculate Price</button>
      {price !== null && <div>Price: ${price.toFixed(2)}</div>}
    </div>
  );
};

export default PriceCalculator;
