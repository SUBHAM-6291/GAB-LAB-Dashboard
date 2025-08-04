import React from 'react';

const ButtonGroup = ({ onResetClick }) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-3 sm:space-y-0 w-full">
      <button
        type="submit"
        className="w-full sm:w-auto relative py-2.5 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#000000] border border-gray-700 text-white text-sm font-semibold tracking-wider uppercase rounded-lg shadow-lg shadow-black/40 overflow-hidden group cursor-pointer transition-all duration-300"
      >
        <span className="relative z-10 group-hover:text-black transition-colors duration-300">
          saveChanges
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
      </button>

      <button
        type="button"
        onClick={onResetClick}
        className="w-full sm:w-auto relative py-2.5 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#000000] border border-gray-700 text-white text-sm font-semibold tracking-wider uppercase rounded-lg shadow-lg shadow-black/40 overflow-hidden group cursor-pointer transition-all duration-300"
      >
        <span className="relative z-10 group-hover:text-black transition-colors duration-300">
          reset
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
      </button>
    </div>
  );
};

export default ButtonGroup;