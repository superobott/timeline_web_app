import React from 'react';

/**
 * EventForm component renders a form for adding or editing a timeline event.
 *
 * Props:
 * - eventData: object containing event fields (title, date, description)
 * - onChange: input change handler function
 * - onSubmit: form submit handler function
 * - timelineName: optional timeline name string
 * - onTimelineNameChange: handler for timeline name input changes
 * - isEditing: boolean indicating if the form is in editing mode
 *
 * The form includes inputs for timeline name, event title, date, and description,
 * and a submit button to add or update the event.
 */

const EventForm = ({ eventData, onChange, onSubmit, timelineName, onTimelineNameChange, isEditing }) => (
  <form 
    onSubmit={onSubmit} 
    className="flex flex-col gap-2 mb-8 w-full max-w-xl"
  >
    {typeof timelineName !== 'undefined' && (
    <>
    <input
      type="text"
      value={timelineName}
      onChange={onTimelineNameChange}
      placeholder="Timeline name"
      required={!isEditing}
      className="px-3 py-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#006A71]"
      />
      </>
    )}
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={eventData.title}
      onChange={onChange}
      required
      className="px-3 py-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#006A71]"
    />

    <input
      type="date"
      name="date"
      value={eventData.date}
      onChange={onChange}
      required
      className="px-3 py-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#006A71]"
    />

    <textarea
      name="description"
      placeholder="Description"
      value={eventData.description}
      onChange={onChange}
      className="px-3 py-2 text-base border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#006A71]"
    />

    <button
      type="submit"
      className="
            px-5 py-2 rounded font-semibold text-base cursor-pointer transition-all duration-300
            bg-[#006A71] text-white
            dark:bg-[#3dd6f3] dark:text-gray-900
            hover:bg-[#6db3b7] dark:hover:bg-[#0f7389]"
            >
      Add Event
    </button>
  </form>
);

export default EventForm;
