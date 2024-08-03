// import React, { useState } from 'react';
// import CartProduct from './CartProduct';

// const dummyProducts = [
//   { id: 1, title: 'Product 1', price: 29.99, image: '/path/to/image1.jpg', quantity: 1 },
//   { id: 2, title: 'Product 2', price: 49.99, image: '/path/to/image2.jpg', quantity: 1 },
//   { id: 3, title: 'Product 3', price: 19.99, image: '/path/to/image3.jpg', quantity: 1 },
// ];

// const CartPage = () => {
//   const [products, setProducts] = useState(dummyProducts);
//   const [selectAll, setSelectAll] = useState(false);

//   const toggleSelectAll = () => {
//     setSelectAll(!selectAll);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center border-b pb-4 mb-4">
//         <h1 className="text-2xl font-bold">Cart</h1>
//         <div className="flex items-center">
//           <label className="mr-2">Select All</label>
//           <input
//             type="checkbox"
//             checked={selectAll}
//             onChange={toggleSelectAll}
//             className="form-checkbox h-5 w-5"
//           />
//         </div>
//       </div>
//       <div>
//         {products.map((product) => (
//           <CartProduct
//             key={product.id}
//             product={product}
//             selectAll={selectAll}
//             setProducts={setProducts}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CartPage;
