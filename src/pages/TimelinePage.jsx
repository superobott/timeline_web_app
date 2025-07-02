// TimelinePage.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import EventCard from "../components/bubbleTimeline/EventCard";
import EventModal from "../components/bubbleTimeline/EventModal";
import Controls from "../components/bubbleTimeline/Controls";

/**
 * TimelinePage Component
 *
 * Renders a timeline of historical events filtered by topic and type from localStorage.
 * Fetches data from backend API and supports sorting and color customization.
 * Displays events as cards; clicking a card opens a modal with event details.
 *
 * Hooks:
 * - useEffect for data fetching on mount
 * - useState for state management
 *
 * Components used:
 * Header, Footer, Controls, EventCard, EventModal
 */


const TimelinePage = () => {
  const [topic, setTopic] = useState(null);
  const [type, setType] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [color, setColor] = useState("#2563eb");
  const [selectedEvent, setSelectedEvent] = useState(null);


  useEffect(() => {
    const storedTopic = localStorage.getItem("selectedTopic");
    const storedType = localStorage.getItem("selectedType");

    if (!storedTopic || !storedType) {
      alert("No topic or type selected! Redirecting to topics page.");
      window.location.href = "/"; 
      return;
    }

    setTopic(storedTopic);
    setType(storedType);

    setLoading(true);

    fetch(`${process.env.REACT_APP_API}/api/dataset?topic=${encodeURIComponent(storedTopic)}&type=${encodeURIComponent(storedType)}`)

      .then((res) => {
        if (!res.ok) {
          console.error("Server responded with an error:", res.statusText);
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTimeline(data);
      })
      .catch((error) => {
        console.error("Failed to fetch timeline data:", error);
        setTimeline([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSort = () => setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  const handleColorChange = (e) => setColor(e.target.value);

  
  const monthToNumber = (month) => {
      if (!month) return null;
      const months = {
        January: 1, February: 2, March: 3, April: 4,
        May: 5, June: 6, July: 7, August: 8,
        September: 9, October: 10, November: 11, December: 12,
      };
      return months[month] ?? null;
    };

  const sortedTimeline = [...timeline].sort((a, b) => {
    const aYear = parseInt(a.Year);
    const bYear = parseInt(b.Year);

    if (aYear !== bYear) {
      return sortOrder === "asc" ? aYear - bYear : bYear - aYear;
    }

    const aMonth = monthToNumber(a.Month);
    const bMonth = monthToNumber(b.Month);
    const aMonthValue = aMonth !== null ? aMonth : 13;
    const bMonthValue = bMonth !== null ? bMonth : 13;

    if (aMonthValue !== bMonthValue) {
      return sortOrder === "asc" ? aMonthValue - bMonthValue : bMonthValue - aMonthValue;
    }

    const aDay = a.Date ? parseInt(a.Date) : 31; 
    const bDay = b.Date ? parseInt(b.Date) : 31;

    return sortOrder === "asc" ? aDay - bDay : bDay - aDay;
  });

  if (!topic || !type) {
    return <div className="text-center p-6">Loading...</div>;
  }

  
  return (
  <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] dark:bg-gray-900 transition-colors duration-300">
    <Header />
    <div className="w-full flex-1 px-4 mt-8">
      <h1 className="text-5xl font-extrabold text-[#006A71] dark:text-[#3dd6f3] mb-8 text-center drop-shadow-md transition-colors duration-300">
        {topic} Timeline
      </h1>

      <Controls
        sortOrder={sortOrder}
        onSort={handleSort}
        color={color}
        onColorChange={handleColorChange}
      />

      {loading ? (
        <div className="text-center text-gray-700 dark:text-gray-300">Loading...</div>
      ) : (
        <div className="flex overflow-x-auto py-4 px-4 gap-4 scroll-smooth">
          {sortedTimeline.map((event, idx) => (
            <EventCard
              key={idx}
              event={event}
              onClick={() => setSelectedEvent(event)}
              borderColor={color}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
    <Footer />
  </div>
);
};

export default TimelinePage;
