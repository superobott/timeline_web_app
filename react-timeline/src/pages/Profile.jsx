import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import useSearchHistory from '../hooks/useSearchHistory';
import useProfileForm from '../hooks/useProfileForm';
import SearchHistory from '../components/profile/SearchHistory';
import ProfileView from '../components/profile/ProfileView';
import ProfileForm from '../components/profile/ProfileForm';
const API_BASE = process.env.REACT_APP_API || 'http://localhost:5000';

/**
 * Profile Component
 *
 * This component manages the user's profile page where users can view and edit
 * their profile information and see their recent search history.
 *
 * Features:
 * - Redirects to login if user data is missing in localStorage
 * - Displays profile information or an editable form depending on the edit mode
 * - Shows success and error messages based on profile updates
 * - Displays user's search history with clickable items to re-run searches
 * - Fully responsive design for all device sizes
 *
 * Custom Hooks used:
 * - useProfileForm: Manages form state, input changes, submission, and editing status
 * - useSearchHistory: Fetches and manages the user's search history from the backend
 *
 * Hooks used:
 * - useEffect: Checks for user login status and redirects if needed
 * - useNavigate: Handles navigation between routes
 */

const Profile = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');

  const {
    formData, error, success, isEditing,
    setIsEditing, handleInputChange,
    handleSubmit, cancelEdit
  } = useProfileForm(userEmail, userId, API_BASE, (newEmail) => {
    if (newEmail !== userEmail) localStorage.setItem('userEmail', newEmail);
  });

  const { history: searches, loading: searchesLoading, error: searchesError } = useSearchHistory(userId);

  useEffect(() => {
    if (!userEmail || !userId) {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      navigate('/login');
    }
  }, [userEmail, userId, navigate]);

  const handleHistorySelect = (term) => {
    navigate(`/search?query=${encodeURIComponent(term)}`);
  };

  return (
  <div className="min-h-screen flex flex-col justify-between items-center bg-[#F2EFE7]  dark:bg-gray-900 transition-colors duration-300 overflow-x-auto">
    <Header />
    <div className="flex-1 max-w-sm sm:max-w-md w-full m-4 sm:m-6 md:m-8 p-4 sm:p-6 md:p-8 rounded-xl 
          bg-white dark:bg-gray-800 
          shadow-[0_8px_16px_rgba(0,106,113,0.2)] dark:shadow-none
          ">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-[#006A71] dark:text-[#3dd6f3] text-center text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">My Profile</h2>
      </div>

      {success && (
        <div className="bg-green-100 text-green-800 text-center p-2 sm:p-3 rounded-md mb-4 text-sm sm:text-base">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 text-center p-2 sm:p-3 rounded-md mb-4 text-sm sm:text-base">
          {error}
        </div>
      )}

      {isEditing ? (
        <ProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          cancelEdit={cancelEdit}
        />
      ) : (
        <ProfileView
          email={userEmail}
          onEdit={() => setIsEditing(true)}
          onReturn={() => navigate('/choose')}
        />
      )}

      <SearchHistory
        searches={searches}
        loading={searchesLoading}
        error={searchesError}
        onSelect={handleHistorySelect}
      />
    </div>
    <Footer />
  </div>
);

};

export default Profile;
