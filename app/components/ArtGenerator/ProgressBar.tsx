import React from 'react';

interface StrengthBarProps {
  strength: number;
  setStrength: (value: number) => void;
}

const StrengthBar: React.FC<StrengthBarProps> = ({ strength, setStrength }) => {
  const handleStrengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrength(parseFloat(event.target.value));
  };

  // Dynamically calculate the background gradient based on strength
  const progressBarStyle = {
    background: `linear-gradient(to right, #0CA156 0%, #0CA156 ${strength * 100}%, #fff ${strength * 100}%, white 100%)`,
  };

  return (
    <div className="flex  items-center mt-4 w-full flex-wrap">
      <label className="text-custom-black block mr-2">Strength :</label>
      <div className="flex items-center my-4 w-full md:w-1/3">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={strength}
          onChange={handleStrengthChange}
          className="flex-grow progress"
          style={progressBarStyle} // Apply the dynamic style here
        />
      </div>
      <span className="mx-2 text-gray-700">{strength.toFixed(2)}</span>

    </div>
  );
};

export default StrengthBar;
