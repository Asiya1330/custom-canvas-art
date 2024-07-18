import React from 'react';

interface DescriptionInputProps {
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ description, setDescription }) => {
  return (
    <div className="mt-2">
      <label className="block mb-2 text-sm font-medium text-custom-black">Write a Prompt:<sup className='text-red-600'>*</sup></label>
      <textarea
        className="w-full p-2 border rounded-md"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>
  );
};

export default DescriptionInput;
