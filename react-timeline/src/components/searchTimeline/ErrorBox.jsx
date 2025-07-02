import React from 'react';

const ErrorBox = ({ error }) => {
  return (
    <div
      className="mt-8 p-4 bg-red-100 border border-red-500 text-red-700 rounded-lg shadow"
      role="alert"
    >
      <p className="font-bold mb-1">Error:</p>
      <p>{error}</p>
    </div>
  );
};

export default ErrorBox;