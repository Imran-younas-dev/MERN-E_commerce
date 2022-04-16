import React from "react";

export const Svg = ({d}) => {
  return (
    <>
      <svg
        className="w-8 h-8 text-gray-600 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www/w3/org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={d}
        />
      </svg>
    </>
  );
};
