import React, { useState } from 'react';
import useSearchHistory from '../../hooks/useSearchHistory';

/**
 * SearchBar component provides a search input with autocomplete suggestions
 * based on the user's previous search history, plus optional year range filters.
 *
 * Props:
 * - onSearch: function called with { query, startYear, endYear } when search is submitted
 *
 * Features:
 * - Retrieves user search history from custom hook (uses localStorage userId)
 * - Filters suggestions matching input prefix (case-insensitive)
 * - Shows suggestions dropdown; clicking a suggestion triggers search
 * - Allows optional input of start and end year filters
 * - Handles form submission via Enter key or Search button
 * - Fully responsive design for all device sizes
 */

function SearchBar({ onSearch }) {
  const userId = localStorage.getItem('userId');
  const { history: searchHistory } = useSearchHistory(userId);

  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const fetchSuggestions = (input) => {
    if (!userId || !input.trim()) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = searchHistory.filter(historyTerm =>
      historyTerm.toLowerCase().startsWith(input.toLowerCase()) &&
      historyTerm.toLowerCase() !== input.toLowerCase()
    );
    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    fetchSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setTerm(suggestion);
    setShowSuggestions(false);
    onSearch({
      query: suggestion,
      startYear: startYear.trim(),
      endYear: endYear.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    setShowSuggestions(false);
    onSearch({
      query: term.trim(),
      startYear: startYear.trim(),
      endYear: endYear.trim()
    });
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <form className="flex flex-col gap-3 sm:gap-4 md:gap-[15px]" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input
            type="text"
            value={term}
            onChange={handleInputChange}
            placeholder="Search for a topic..."
            autoComplete="off"
            className="w-full p-2 sm:p-3 text-base sm:text-lg md:text-[20px] border border-gray-300 rounded"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded z-50 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400">
              <div className="inline-flex p-2 gap-2">
                {suggestions.map((suggestion, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 sm:px-3 py-1 bg-gray-100 rounded-full cursor-pointer text-sm sm:text-base md:text-[18px] whitespace-nowrap hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-[10px]">
          <input
            type="text"
            value={startYear}
            onChange={e => setStartYear(e.target.value)}
            placeholder="Start Year"
            className="flex-1 p-2 sm:p-3 text-base sm:text-lg md:text-[18px] border border-gray-300 rounded"
          />
          <input
            type="text"
            value={endYear}
            onChange={e => setEndYear(e.target.value)}
            placeholder="End Year"
            className="flex-1 p-2 sm:p-3 text-base sm:text-lg md:text-[18px] border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="
            px-4 sm:px-5 py-2 sm:py-3 text-white bg-[#006A71] rounded font-semibold text-sm sm:text-base cursor-pointer 
            transition
            hover:bg-[#10b2bd] hover:-translate-y-0.5 hover:shadow-md
            dark:bg-[#3dd6f3] dark:text-gray-900
            dark:hover:bg-[#0f7389]">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
