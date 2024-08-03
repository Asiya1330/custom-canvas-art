'use client';

import Image from 'next/image';
import React from 'react';
import Select, { SingleValue, ActionMeta, OptionProps } from 'react-select';

interface OptionGroupItem {
  optionId: number;
  optionName: string;
}

interface OptionGroup {
  optionGroup: string;
  optionGroupItems: OptionGroupItem[];
}

interface FlattenedOption {
  value: number;
  label: string;
  groupLabel: string;
}

interface OptionGroupProps {
  optionGroups: OptionGroup[];
  selectedItems: FlattenedOption[];
  handleSelectionChange: (selectedOptions: SingleValue<FlattenedOption>, actionMeta: ActionMeta<FlattenedOption>) => void;
}

const OptionGroup: React.FC<OptionGroupProps> = ({ optionGroups, selectedItems, handleSelectionChange }) => {
  const customOption = (props: OptionProps<FlattenedOption, false>) => {
    return (
      <div {...props.innerProps} className="flex items-center space-x-2 p-2 hover:bg-gray-200">
        <span>{props.data.label}</span>
        {/* <span className="text-gray-500 text-sm ml-2">({props.data.groupLabel})</span> */}
      </div>
    );
  };

  const flattenedOptions: FlattenedOption[] = optionGroups.flatMap(group =>
    group.optionGroupItems.map(item => ({
      value: item.optionId,
      label: item.optionName,
      // imageUrl: item.optionImageUrl,
      groupLabel: group.optionGroup,
    }))
  );

  return (
    <div className="mb-4">
      {optionGroups.map(group => (
        <div key={group.optionGroup}>
          <h4 className="font-semibold mt-2 text-sm">{group.optionGroup}</h4>
          <Select<FlattenedOption, false>
            options={flattenedOptions.filter(option => option.groupLabel === group.optionGroup)}
            value={selectedItems.find(item => item.groupLabel === group.optionGroup) || null}
            onChange={(selectedOption, actionMeta) => handleSelectionChange(selectedOption, actionMeta)}
            components={{ Option: customOption }}
            styles={{
              option: (provided) => ({
                ...provided,
                display: 'flex',
                alignItems: 'center',
              }),
              singleValue: (provided) => ({
                ...provided,
                display: 'flex',
                alignItems: 'center',
              }),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default OptionGroup;
