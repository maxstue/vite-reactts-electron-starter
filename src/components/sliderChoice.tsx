import React, { useState, useEffect } from 'react';

interface SliderProps {
  options: string[];
  initialValue: string;
  onChange: (value: string) => void;
}

const SliderChoice: React.FC<SliderProps> = ({ options, initialValue, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>(initialValue);

  useEffect(() => {
    // Update selected option when the initialValue prop changes
    setSelectedOption(initialValue);
  }, [initialValue]);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <span className="grid w-fit place-items-start">
      <div className="grid grid-cols-4 gap-4 rounded-xl p-2">
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name={option}
              id={option}
              value={option}
              className="peer hidden"
              checked={selectedOption === option}
            />
            <label
              htmlFor={option}
              className={`block cursor-pointer select-none rounded-xl px-4 py-2 text-center 
                ${
                  selectedOption === option
                    ? 'peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
                    : ''
                }`}
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </span>
  );
};

export default SliderChoice;
