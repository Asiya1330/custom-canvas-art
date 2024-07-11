'use client';

import Image from 'next/image';
import React from 'react';
import Select, { MultiValue, ActionMeta, OptionProps } from 'react-select';

interface OptionGroupItem {
  optionId: number;
  optionName: string;
  optionImageUrl: string; // Add image URL to the item interface
}

interface OptionGroup {
  optionGroup: string;
  optionGroupItems: OptionGroupItem[];
}

interface FlattenedOption {
  value: number;
  label: string;
  imageUrl: string;
  groupLabel: string;
}

interface OptionGroupProps {
  optionGroups: OptionGroup[];
  selectedItems: MultiValue<FlattenedOption>;
  handleSelectionChange: (selectedOptions: MultiValue<FlattenedOption>, actionMeta: ActionMeta<FlattenedOption>) => void;
}

const OptionGroup: React.FC<OptionGroupProps> = ({ optionGroups, selectedItems, handleSelectionChange }) => {
  const customOption = (props: OptionProps<FlattenedOption, true>) => {
    return (
      <div {...props.innerProps} className="flex items-center space-x-2 p-2 hover:bg-gray-200">
        <Image src={props.data.imageUrl} alt={props.data.label} width={32} height={32} className="w-8 h-8" />
        <span>{props.data.label}</span>
        <span className="text-gray-500 text-sm ml-2">({props.data.groupLabel})</span>
      </div>
    );
  };

  const flattenedOptions: FlattenedOption[] = optionGroups.flatMap(group =>
    group.optionGroupItems.map(item => ({
      value: item.optionId,
      label: item.optionName,
      imageUrl: item.optionImageUrl,
      groupLabel: group.optionGroup,
    }))
  );

  return (
    <div className="mb-4">
      <Select<FlattenedOption, true>
        isMulti
        options={flattenedOptions}
        value={selectedItems}
        onChange={(selectedOptions, actionMeta) => handleSelectionChange(selectedOptions as MultiValue<FlattenedOption>, actionMeta)}
        components={{ Option: customOption }}
        styles={{
          option: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
          }),
        }}
      />
    </div>
  );
};

export default OptionGroup;
