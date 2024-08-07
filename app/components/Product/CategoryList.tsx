'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import CategoryItem from './CategoryItem';
import SubCategoryItem from './SubCategoryItem';
import OptionGroup from './OptionGroup';
import { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { BeatLoader } from 'react-spinners';

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
interface FlattenedOption {
  value: number;
  label: string;
  groupLabel: string;
}

interface OptionGroupItem {
  optionId: number;
  optionName: string;
}

const categoryImageMapping = {
  "Canvas": '/stretched-canvas/0.75Canvas-1.jpg',
  "Framed Canvas": '/framed-canvas/Black-Floating-Frame-Canvas-labeled.jpg',
  // Add other categories and their images as needed
};

const subCategoryImageMappingCanvas = {
  101001: "/stretched-canvas/0.75Canvas-1.jpg",
  101002: "/stretched-canvas/1.25Canvas-1.jpg",
  101003: "/stretched-canvas/1.50Canvas-1.jpg",
  101005: "/stretched-canvas/RolledCanvas.jpg",
  // Add more mappings as needed
};

const subCategoryImageMappingFramedCanvas = {
  102001: "/framed-canvas/0.75 framed canvas depth.png",
  102002: "/framed-canvas/1.5 framed canvas depth.png",
  102003: "/framed-canvas/1.25 framed canvas depth.png",
  // Add more mappings as needed
};

export interface ProductCateory {
  categoryId: number | null;
  categoryName: string | null;
  subCategoryId: number | null;
  subCategoryName: string | null;
  selectedOptions: FlattenedOption[];
}

interface CategoryListProps {
  onProductUpdate: (productCateory: ProductCateory) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onProductUpdate }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<FlattenedOption[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState<boolean>(false);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showSubCategories, setShowSubCategories] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [productCateory, setProductCateory] = useState<ProductCateory>({
    categoryId: null,
    categoryName: null,
    subCategoryId: null,
    subCategoryName: null,
    selectedOptions: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/lumaprint/categories');
        const filteredCategories = response.data.filter((category: Category) =>
          category.name === "Canvas" || category.name === "Framed Canvas"
        ).map((category: Category) => ({
          ...category,
          imageUrl: categoryImageMapping[category.name as keyof typeof categoryImageMapping]
        }));
        setCategories(filteredCategories);
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
        let filteredSubCategories = response.data;
        if (selectedCategory === 101) { // Assuming 101 is the categoryId for "Canvas"
          filteredSubCategories = filteredSubCategories.map((subCategory: SubCategory) => ({
            ...subCategory,
            imageUrl: subCategoryImageMappingCanvas[subCategory.subcategoryId as keyof typeof subCategoryImageMappingCanvas]
          }));
        } else if (selectedCategory === 102) { // Assuming 102 is the categoryId for "Framed Canvas"
          filteredSubCategories = filteredSubCategories.map((subCategory: SubCategory) => ({
            ...subCategory,
            imageUrl: subCategoryImageMappingFramedCanvas[subCategory.subcategoryId as keyof typeof subCategoryImageMappingFramedCanvas]
          }));
        }

        setSubCategories(filteredSubCategories);
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

  const handleSelectionChange = (selectedOption: SingleValue<FlattenedOption>, actionMeta: ActionMeta<FlattenedOption>) => {
    if (!selectedOption) return;
    let updatedItems:any = [];
    // Replace the item in selectedItems that has the same groupLabel with the new selectedOption
    setSelectedItems(prevSelectedItems => {
       updatedItems = prevSelectedItems.filter(item => item.groupLabel !== selectedOption.groupLabel);
      updatedItems.push(selectedOption);
      setProductCateory(prevProduct => ({
        ...prevProduct,
        selectedOptions: updatedItems,
      }));
      return updatedItems;
    });

    
  };
  const handleCategorySelection = (categoryId: number, categoryName: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null); // Reset subcategory
    setSubCategories([]); // Clear subcategories
    setShowCategories(false);
    setSelectedItems([]); // Clear options
    setOptionGroups([]); // Clear option groups
    // Update product with selected category and reset subcategory and options
    setProductCateory(prevProduct => ({
      ...prevProduct,
      categoryId,
      categoryName,
      subCategoryId: null,
      subCategoryName: null,
      selectedOptions: [],
    }));
  };
  

  const handleSubCategorySelection = (subcategoryId: number, subCategoryName: string) => {
    setSelectedSubCategory(subcategoryId);
    setSelectedItems([]); // Reset selected options
    setOptionGroups([]); // Clear option groups
    setShowSubCategories(false);
    // Update product with selected subcategory and reset options
    setProductCateory(prevProduct => ({
      ...prevProduct,
      subCategoryId: subcategoryId,
      subCategoryName: subCategoryName,
      selectedOptions: [],
    }));
  };
  useEffect(() => {
    onProductUpdate(productCateory);
  }, [productCateory, onProductUpdate]);
  return (
    <div className="w-full sm:max-w-xs mt-4">
      <h1 className="text-xl font-semibold">Media (Category)</h1>
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
            onClick={() => handleCategorySelection(category.id, category.name)}
          />
        ))}
      </Dropdown>

      {selectedCategory && (
        <div className="relative">
          <h2 className="text-lg font-semibold">Subcategories</h2>
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
                onClick={() => handleSubCategorySelection(subCategory.subcategoryId, subCategory.name)}
              />
            ))}
          </Dropdown>
        </div>
      )}

      {selectedSubCategory && (
        <div className="relative">
          <h2 className="text-lg font-semibold">Options</h2>
          {loadingOptions ? (

            <div className="flex items-center justify-center py-2">
              <BeatLoader size={20} />
            </div>) : (
            <OptionGroup
              optionGroups={optionGroups}
              selectedItems={selectedItems}
              handleSelectionChange={handleSelectionChange}
            />
          )
          }

        </div>
      )}
    </div>
  );
};

export default CategoryList;
