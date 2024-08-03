import React, { useState, useEffect } from 'react';
import ProductQuantityControls from './ProductQuantityControls';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartProductProps {
  product: Product;
  selectAll: boolean;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartProduct: React.FC<CartProductProps> = ({ product, selectAll, setProducts }) => {
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    setSelected(selectAll);
  }, [selectAll]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? { ...p, quantity: newQuantity } : p))
    );
  };

  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => setSelected(!selected)}
          className="form-checkbox h-5 w-5 mr-4"
        />
        <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover mr-4 p-4 bg-[#8C8C8C] md:min-w-24 rounded" />
        <div>
          <p className="text-sm text-[#434F5E]">{product.name}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        <div className="flex items-center mt-5">
          <ProductQuantityControls
            quantity={quantity}
            setQuantity={handleQuantityChange}
          />
          <button className="border border-light-gray ml-4 py-1 px-4 text-sm rounded hover:border-dark-black">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
