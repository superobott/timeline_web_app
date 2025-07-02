import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TimelineList from '../components/customTimeline/CustomTimelineList';
import TimelineEditor from '../components/customTimeline/CustomTimelineEditor';
import NewTimelineEditor from '../components/customTimeline/NewCustomTimelineEditor';


/**
 * CustomTimeline Component
 *
 * This component allows users to build, edit, and save custom timelines.
 * Users can add events with a title, date, and description, and either create a new timeline
 * or update an existing one. All timelines are fetched and saved through a backend API.
 *
 * Features:
 * - Displays a list of user timelines fetched from the server
 * - Allows selection and editing of an existing timeline
 * - Enables creation of a new timeline with multiple events
 * - Uses localStorage to identify the logged-in user by email
 * - Fully responsive design for all device sizes
 *
 * Hooks used:
 * - useState: Manages local component state (timelines, events, selected timeline, etc.)
 * - useEffect: Fetches timelines on component mount
 * - useCallback: Optimizes and memoizes the fetch function to avoid unnecessary re-creations
 */

const CustomTimeline = () => {
  const userEmail = localStorage.getItem('userEmail');

  const [timelines, setTimelines] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [timelineName, setTimelineName] = useState('');
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });

  // Fetch timelines for the user
  const fetchTimelines = useCallback(async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/user/${userEmail}`);
      if (!res.ok) throw new Error('Failed to fetch timelines');
      const data = await res.json();
      setTimelines(data);
    } catch (error) {
      console.error(error);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchTimelines();
  }, [fetchTimelines]);

  // Handle changes for new event inputs
  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    const cleanDate = newEvent.date.slice(0, 10); 

    const cleanedEvent = {
      ...newEvent,
      date: cleanDate,
    };

    if (selectedTimeline) {
      setSelectedTimeline(prev => ({
        ...prev,
        events: [...prev.events, cleanedEvent],
      }));
    } else {
      setEvents(prev => [...prev, cleanedEvent]);
    }

    setNewEvent({ title: '', date: '', description: '' });
  };


  // Save a new timeline
  const saveNewTimeline = async () => {
    if (!timelineName.trim() || events.length === 0) {
      alert('Please enter a name and add at least one event.');
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userEmail, title: timelineName.trim(), events }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Timeline saved successfully!');
        setTimelineName('');
        setEvents([]);
        fetchTimelines();
      } else {
        alert('Error saving timeline: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save timeline');
    }
  };

  // Update an existing timeline
  const saveExistingTimeline = async () => {
    if (!selectedTimeline) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/${selectedTimeline._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedTimeline.title,
          events: selectedTimeline.events,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Timeline updated successfully!');
        setSelectedTimeline(null);
        fetchTimelines();
      } else {
        alert('Error updating timeline: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update timeline');
    }
  };

  // Handle editing timeline name for existing timeline
  const handleEditTimelineName = (e) => {
    if (!selectedTimeline) return;
    const newTitle = e.target.value;
    setSelectedTimeline(prev => ({ ...prev, title: newTitle }));
  };

  // Delete a selected timeline
  const deleteTimeline = async () => {
    if (!selectedTimeline) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/${selectedTimeline._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        alert('Timeline deleted successfully!');
        setSelectedTimeline(null);
        fetchTimelines();
      } else {
        alert('Error deleting timeline: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete timeline');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl w-full mx-auto px-3 sm:px-4 md:px-5 py-4 sm:py-6 md:py-8 flex-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#006A71] dark:text-[#3dd6f3] mb-4 sm:mb-6 md:mb-8 text-center drop-shadow-md">
          Build Your Own Timeline
        </h2>
        <TimelineList timelines={timelines} onSelect={setSelectedTimeline} />

        <div className="mt-4 sm:mt-6">
          {selectedTimeline ? (
            <TimelineEditor
              selectedTimeline={selectedTimeline}
              newEvent={newEvent}
              onAddEvent={handleAddEvent}
              onEditTimelineName={handleEditTimelineName}
              onChangeNewEvent={handleNewEventChange}
              onSave={saveExistingTimeline}
              onCancel={() => setSelectedTimeline(null)}
              onDelete={deleteTimeline}
            />
          ) : (
            <NewTimelineEditor
              timelineName={timelineName}
              newEvent={newEvent}
              events={events}
              onTimelineNameChange={(e) => setTimelineName(e.target.value)}
              onChangeNewEvent={handleNewEventChange}
              onAddEvent={handleAddEvent}
              onSave={saveNewTimeline}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomTimeline;
