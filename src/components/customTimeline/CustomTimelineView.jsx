import React from 'react';

/**
 * TimelineView component renders a vertical timeline of events sorted by date.
 *
 * Props:
 * - events: array of event objects with `date`, `title`, and `description`
 *
 * Each event is displayed with a date label, title, and description.
 */

const TimelineView = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
  <div className="border-l-2 border-gray-700 dark:border-gray-400 pl-5">
    {sortedEvents.map((event, index) => (
      <div key={index} className="relative mb-5">

        <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-gray-700 dark:bg-gray-300 rounded-full"></div>

        <div className="font-bold text-gray-600 dark:text-gray-200">{event.date}</div>

        <div className="mt-1">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{event.title}</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">{event.description}</p>
        </div>
      </div>
    ))}
  </div>
);
}

export default TimelineView;
