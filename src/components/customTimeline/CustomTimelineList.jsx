import React from 'react';

/**
 * TimelineList component displays a list of user timelines.
 *
 * Props:
 * - timelines: array of timeline objects to display
 * - onSelect: callback invoked with the selected timeline on button click
 *
 * Renders a message if no timelines are available.
 */

const TimelineList = ({ timelines, onSelect }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-[#006A71] dark:text-[#3dd6f3] mb-2">
        Your Timelines:
      </h3>
      {timelines.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No timelines found.</p>
      ) : (
      <ul className="flex flex-row gap-2 flex-wrap pb-5">
        {timelines.map((tl) => (
          <li key={tl._id}>
            <button
              onClick={() => onSelect(tl)}
              className="
              px-5 py-2 rounded font-semibold text-base cursor-pointer transition-all duration-300
              bg-[#006A71] text-white
              dark:bg-[#3dd6f3] dark:text-gray-900
              hover:bg-[#6db3b7] dark:hover:bg-[#0f7389]"
              >
              {tl.title}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default TimelineList;