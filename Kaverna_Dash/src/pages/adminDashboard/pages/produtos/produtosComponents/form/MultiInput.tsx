import React, { useState, KeyboardEvent } from "react";

interface MultiInputProps {
  label: string;
  placeholder?: string;
  values: string[];
  onChange: (values: string[]) => void;
}

const MultiInput: React.FC<MultiInputProps> = ({
  label,
  placeholder,
  values,
  onChange,
}) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      onChange([...values, input.trim()]);
      setInput("");
    }
  };

  const removeValue = (indexToRemove: number) => {
    onChange(values.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="mb-4">
      <label className="block text-white mb-1">{label}</label>
      <div className="flex flex-wrap gap-">
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-2 border-neutral-600 rounded-md p-2 bg-transparent text-white focus:outline-none"
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Pressione Enter para adicionar
      </p>
      <div className="flex gap-2">
        {values.map((val, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-neutral-800 text-white rounded-full px-3 py-1"
          >
            <span>{val}</span>
            <button
              type="button"
              onClick={() => removeValue(index)}
              className="text-red-500 hover:text-red-600"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiInput;
