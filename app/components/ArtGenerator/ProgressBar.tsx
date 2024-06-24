import React from 'react';

interface StrengthBarProps {
  strength: number;
  setStrength: (value: number) => void;
}

const StrengthBar: React.FC<StrengthBarProps> = ({ strength, setStrength }) => {
  const handleStrengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrength(parseFloat(event.target.value));
  };

  return (
    <div className="flex justify-between items-center mt-4 w-full flex-wrap">
      <label className="text-custom-black block">Strength</label>
      <span className="mx-2 text-gray-700">{strength.toFixed(2)}</span>
      <div className="flex items-center my-4 w-full md:w-1/2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={strength}
          onChange={handleStrengthChange}
          className="flex-grow"
        />
      </div>
    </div>
  );
};

export default StrengthBar;
