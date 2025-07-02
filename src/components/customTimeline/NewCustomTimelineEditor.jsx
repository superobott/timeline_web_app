import React from 'react';
import EventForm from './EventMakerCustomTimeLine';
import TimelineView from './CustomTimelineView';

/**
 * NewTimelineEditor component manages the creation of a new timeline.
 *
 * Props:
 * - timelineName: current name of the new timeline
 * - newEvent: object representing the event being created
 * - events: array of existing events in the timeline
 * - onTimelineNameChange: handler for changes to the timeline name input
 * - onChangeNewEvent: handler for input changes in the new event form
 * - onAddEvent: callback for adding a new event to the timeline
 * - onSave: callback to save the entire timeline
 *
 * Renders the event creation form, a save button, and the list of current events.
 */

const NewTimelineEditor = ({
  timelineName,
  newEvent,
  events,
  onTimelineNameChange,
  onChangeNewEvent,
  onAddEvent,
  onSave,
}) => (
  <>
    <EventForm
      eventData={newEvent}
      onChange={onChangeNewEvent}
      onSubmit={onAddEvent}
      timelineName={timelineName}
      onTimelineNameChange={onTimelineNameChange}
      isEditing={false}
    />

    <button
      onClick={onSave}
      className="
            px-5 py-2 rounded font-semibold text-base cursor-pointer transition-all duration-300
            bg-[#006A71] text-white
            dark:bg-[#3dd6f3] dark:text-gray-900
            hover:bg-[#6db3b7] dark:hover:bg-[#0f7389]"
            >
      Save Timeline
    </button>

    <TimelineView events={events} />
  </>
);

export default NewTimelineEditor;
