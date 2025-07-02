import React from 'react';

/**
 * SearchHistory component displays a list of recent search terms.
 *
 * Props:
 * - searches: array of search strings
 * - loading: boolean indicating if data is loading
 * - error: error message string (if any)
 * - onSelect: callback triggered when a search term is clicked
 *
 * Features:
 * - Shows loading and error states
 * - Displays message if no searches exist
 * - Responsive tag-like clickable search terms with hover effect
 */

const SearchHistory = ({ searches, loading, error, onSelect }) => (
  <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md mt-8 p-4 dark:bg-[#395866] border-2 border-[#006A71] dark:border-[#3dd6f3]">
    <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 border-b pb-2 mb-4">
      Recent Searches ({searches.length})
    </h3>

    {loading ? (
      <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
    ) : error ? (
      <p className="text-center bg-red-100 text-red-700 p-2 rounded dark:bg-red-900 dark:text-red-400">{error}</p>
    ) : searches.length === 0 ? (
      <p className="text-center text-gray-500 dark:text-gray-400">No searches yet</p>
    ) : (
      <div className="flex flex-wrap gap-2 justify-center">
        {searches.map((term, index) => (
          <button
            key={index}
            onClick={() => onSelect && onSelect(term)}
            className="
              px-5 py-2 rounded font-semibold text-base cursor-pointer transition-all duration-300
              bg-[#006A71] text-white
              dark:bg-[#3dd6f3] dark:text-gray-900
              hover:bg-[#6db3b7] dark:hover:bg-[#0f7389]"
          >
            {term}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default SearchHistory;
