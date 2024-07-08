// components/CategoryList.tsx

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/lumaprint/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategory === null) return;

      setLoadingSubCategories(true);

      try {
        const response = await axios.get(`/api/lumaprint/subcategories?categoryId=${selectedCategory}`);
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-xs mt-4">
      <h1 className="text-xl font-semibold mb-2">Media</h1>
      <div className="relative mb-4">
        {loadingCategories ? (
          <div className="flex items-center justify-center py-2">
            <MoonLoader size={20} />
          </div>
        ) : (
          <>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              defaultValue=""
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              <option value="" disabled>
                Choose Print Media
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </>
        )}
      </div>
      {selectedCategory && (
        <div className="relative">
          <h2 className="text-lg font-semibold mb-2">Subcategories</h2>
          {loadingSubCategories ? (
            <div className="flex items-center justify-center py-2">
              <MoonLoader size={20} />
            </div>
          ) : (
            <div className='relative'>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose Print Media sub-category
                </option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
