import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';


/**
 * Index Component
 *
 * This is the landing page of the HistoryFlow app, welcoming users and providing
 * navigation options to either login or register.
 *
 * Features:
 * - Displays a welcome message and app description
 * - Provides two primary action buttons: Login and Register
 * - Uses React Router's useNavigate hook for client-side navigation
 * - Fully responsive design for all device sizes
 *
 * Hooks used:
 * - useNavigate: To programmatically navigate to login or register routes
 */

const Index = () => {
  const navigate = useNavigate();

  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');

   return (
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] dark:bg-gray-900 transition-colors duration-300 overflow-x-auto">
      <Header />
      <main className="flex-1 flex flex-col items-center mt-8 sm:mt-10 md:mt-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#006A71] dark:text-[#3dd6f3] mb-6 sm:mb-8 text-center drop-shadow-md">
          Welcome to HistoryFlow
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-[40px] items-center justify-center my-8 sm:my-12 md:my-[60px] w-full max-w-md sm:max-w-lg md:max-w-2xl">
          <button
            onClick={goToLogin}
           className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] rounded-full text-lg sm:text-xl md:text-2xl font-bold flex items-center justify-center
          bg-[#006A71] text-white shadow-[0_8px_16px_rgba(0,106,113,0.3)]
          transition duration-300 transform hover:-translate-y-1
          hover:bg-[#F2EFE7] hover:text-[#006A71] hover:border hover:border-[#006A71] hover:shadow-[0_12px_24px_rgba(0,106,113,0.4)]
          dark:bg-[#3dd6f3] dark:text-gray-900 dark:hover:bg-[#1f9aad] dark:hover:text-white"
        >
            Login
          </button>

          <button
            onClick={goToRegister}
            className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] rounded-full text-lg sm:text-xl md:text-2xl font-bold flex items-center justify-center
              border-[3px] border-[#006A71] bg-transparent text-[#006A71]
              shadow-[0_8px_16px_rgba(0,106,113,0.2)]
              transition duration-300 transform hover:-translate-y-1
              hover:bg-[#006A71] hover:text-white hover:shadow-[0_12px_24px_rgba(0,106,113,0.4)]
              dark:border-[#3dd6f3] dark:text-[#3dd6f3] dark:hover:bg-[#3dd6f3] dark:hover:text-gray-900"
          >
            Register
          </button>
        </div>
        <section className="text-center text-[#006A71] dark:text-[#3dd6f3] text-base sm:text-lg max-w-xs sm:max-w-md md:max-w-3xl mx-auto leading-relaxed px-4">
          <p className="mb-2 sm:mb-3">Discover historical events and timelines through our interactive search platform.</p>
          <p>Login to access your personalized timeline searches or register to get started!</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;