import React from 'react';

const Loading = () => {
  const size = 60; // Static size
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div style={{ width: `${size}px`, height: `${size}px` }} className="animate-spin">
        <div className="h-full w-full border-4 border-t-purple-500 border-b-purple-700 rounded-[50%]"></div>
      </div>
    </div>
  );
};

export default Loading;
