import React from 'react';

interface DescriptionInputProps {
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ description, setDescription }) => {
  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-medium text-green-500">Description</label>
      <textarea
        className="w-full p-2 border rounded-md"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default DescriptionInput;