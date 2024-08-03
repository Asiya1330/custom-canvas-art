"use client"
import React, { useState, useEffect } from 'react';
import CartProduct from '../components/Cart/CartProduct';
import { fetchCartItems } from '@/app/firebase/services'; // Assuming this is the correct path
import { useAuth } from '@clerk/nextjs';
import { MoonLoader } from 'react-spinners';

const CartPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    const loadCartItems = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const cartItems = await fetchCartItems(userId);
        console.log(cartItems,"cartItems");
        setProducts(cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [userId]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({ ...product, selected: !selectAll }))
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader size={40} />
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="text-center mt-10">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:max-w-lg">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="flex items-center">
          <label className="mr-2">Select All</label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleSelectAll}
            className="form-checkbox h-5 w-5"
          />
        </div>
      </div>
      <div>
        {products.map((product) => (
          <CartProduct
            key={product.productId}
            product={product}
            selectAll={selectAll}
            setProducts={setProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default CartPage;
