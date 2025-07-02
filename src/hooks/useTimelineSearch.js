import { useState, useEffect } from 'react';

/**
 * useTimelineSearch - Custom React hook for managing timeline search functionality.
 *
 * Performs search queries with optional year filters, handles authentication redirects,
 * manages loading and error states, and records search history for logged-in users.
 *
 * Parameters:
 * - query (string): Search term.
 * - startYear (string): Start year filter.
 * - endYear (string): End year filter.
 * - userId (string|number): Current user ID for logging search history.
 * - navigate (function): React Router navigation function for redirects.
 *
 * Returns:
 * - fullText (string): Extracted text summary from search results.
 * - timelineEvents (array): Array of timeline events matching the search.
 * - images (array): Related images from search results.
 * - loading (boolean): Indicates ongoing fetch operation.
 * - error (string|null): Error message if fetch fails.
 */

const API_BASE_URL = process.env.REACT_APP_API;
const SEARCH_HISTORY_ENDPOINT = `${API_BASE_URL}/api/users/search-history`;
const SEARCH_ENDPOINT = `${API_BASE_URL}/search`;

const useTimelineSearch = (query, startYear, endYear, userId, navigate) => {
  const [fullText, setFullText] = useState('');
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setFullText('');
      setTimelineEvents([]);
      setImages([]);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setFullText('');
      setTimelineEvents([]);
      setImages([]);

      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          navigate('/login');
          return;
        }

        const searchUrl = new URL(SEARCH_ENDPOINT);
        searchUrl.searchParams.append('q', query);
        searchUrl.searchParams.append('startYear', startYear);
        searchUrl.searchParams.append('endYear', endYear);

        const response = await fetch(searchUrl, {
          headers: { 'user-email': userEmail },
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFullText(data.extract);
        setTimelineEvents(data.timelineEvents || []);
        setImages(data.images || []);

        if (userId) {
          await fetch(SEARCH_HISTORY_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, query }),
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to load timeline: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, startYear, endYear, userId, navigate]);

  return { fullText, timelineEvents, images, loading, error };
};

export default useTimelineSearch;
