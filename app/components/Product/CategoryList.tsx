'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import CategoryItem from './CategoryItem';
import SubCategoryItem from './SubCategoryItem';
import OptionGroup from './OptionGroup';
import { MultiValue } from 'react-select';

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

interface SubCategory {
  id: number;
  name: string;
  imageUrl: string;
  maximumHeight: number;
  maximumWidth: number;
  minimumHeight: number;
  minimumWidth: number;
  requiredDPI: number;
  subcategoryId: number;
}


interface OptionGroupItem {
  optionId: number;
  optionName: string;
  optionImageUrl: string;
}

interface OptionsGroup {
  optionGroup: string;
  optionGroupItems: OptionGroupItem[];
}


const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<MultiValue<{ value: number; label: string; imageUrl: string; groupLabel: string }>>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState<boolean>(false);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showSubCategories, setShowSubCategories] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/lumaprint/categories');
        console.log("data", response.data)
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
        console.log("data", response.data)
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchOptions = async () => {
      if (selectedSubCategory === null) return;

      setLoadingOptions(true);

      try {
        const response = await axios.get(`/api/lumaprint/options?subcategoryId=${selectedSubCategory}`);
        setOptionGroups(response.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [selectedSubCategory]);

  const handleSelectionChange = (selectedOptions: MultiValue<{ value: number; label: string; imageUrl: string; groupLabel: string }>) => {
    setSelectedItems(selectedOptions);
    console.log("Selected Items: " + selectedItems);
  };


  return (
    <div className="w-full max-w-xs mt-4">
      <h1 className="text-xl font-semibold mb-2">Media</h1>
      <Dropdown
        label={selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.name || 'Choose Print Media' : 'Choose Print Media'}
        loading={loadingCategories}
        showDropdown={showCategories}
        toggleDropdown={() => setShowCategories(!showCategories)}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            id={category.id}
            name={category.name}
            imageUrl={category.imageUrl}
            onClick={() => { setSelectedCategory(category.id); setShowCategories(false); }}
          />
        ))}
      </Dropdown>

      {selectedCategory && (
        <div className="relative">
          <h2 className="text-lg font-semibold mb-2">Subcategories</h2>
          <Dropdown
            label={selectedSubCategory ? subCategories.find(sub => sub.subcategoryId === selectedSubCategory)?.name || 'Choose Print Media sub-category' : 'Choose Print Media sub-category'}
            loading={loadingSubCategories}
            showDropdown={showSubCategories}
            toggleDropdown={() => setShowSubCategories(!showSubCategories)}
          >
            {subCategories.map((subCategory) => (
              <SubCategoryItem
                key={subCategory.subcategoryId}
                id={subCategory.subcategoryId}
                name={subCategory.name}
                imageUrl={subCategory.imageUrl}
                onClick={() => { setSelectedSubCategory(subCategory.subcategoryId); setShowSubCategories(false); }}
              />
            ))}
          </Dropdown>
        </div>
      )}

      {selectedSubCategory && (
        <div className="relative">
          <h2 className="text-lg font-semibold mb-2">Options</h2>
          <OptionGroup
            optionGroups={optionGroups}
            selectedItems={selectedItems}
            handleSelectionChange={handleSelectionChange}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryList;
