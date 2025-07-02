import React from 'react';

const Loading = ({ query }) => {
  return (
    <div className="flex flex-col items-center mt-8 text-center">
      <p className="text-lg text-gray-700 mb-2">
        Searching for: <span className="text-teal-700 font-semibold">{query}</span>
      </p>
      <p className="text-xl text-gray-500 dark:text-gray-300 animate-pulse">Loading timeline...</p>
    </div>
  );
};

export default Loading;
