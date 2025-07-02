import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

/**
 * Choose Component
 *
 * This component provides a simple navigation interface for users to choose their experience path:
 * - Explore Bubbles: Navigate to the interactive bubble page
 * - Explore Timeline: Navigate to the timeline search page
 * - Create Your Own Timeline: Navigate to the custom timeline creation page
 *
 * Features:
 * - Uses buttons styled as arrows for a clear UX
 * - Uses React Router's useNavigate hook for client-side navigation
 * - Fully responsive design for all device sizes
 *
 * Hooks used:
 * - useNavigate: For programmatic navigation between routes
 */

const Choose = () => {
  const navigate = useNavigate();

  const goToBubbles = () => navigate('/bubble');
  const goToTimelineSearch = () => navigate('/search');
  const goToCreateTimeline = () => navigate('/custom-timeline');

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] dark:bg-gray-900 font-sans transition-colors duration-300">
      <Header />
      <main className="flex flex-col items-center justify-start pt-16 sm:pt-20 h-screen flex-1 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-extrabold text-[#006A71] dark:text-[#3dd6f3] mb-6 sm:mb-8 text-center drop-shadow-md">
          Choose Your Experience
        </h1>
        <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-7 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <button
            onClick={goToBubbles}
            className="relative inline-flex items-center justify-center h-16 sm:h-18 md:h-20 w-full max-w-[450px] min-w-[280px]
              bg-[#F2EFE7] dark:bg-gray-800 text-[#006A71] dark:text-[#3dd6f3] border-2 border-[#006A71] dark:border-[#3dd6f3]
              font-bold text-lg sm:text-xl md:text-[22px] rounded-lg transition-all duration-300
              hover:bg-[#6db3b7] dark:hover:bg-[#0f7389] hover:shadow-lg hover:-translate-y-1
              after:content-[''] after:absolute after:top-0 after:-right-[30px] sm:after:-right-[35px] md:after:-right-[43px]
              after:border-t-[32px] after:border-b-[32px] after:border-l-[32px] sm:after:border-t-[36px] sm:after:border-b-[36px] sm:after:border-l-[36px] md:after:border-t-[40px] md:after:border-b-[40px] md:after:border-l-[40px]
              after:border-transparent after:border-l-[#006A71] dark:after:border-l-[#3dd6f3] z-10
              px-4 sm:px-6"
          >
            EXPLORE BUBBLES
          </button>

          <button
            onClick={goToTimelineSearch}
            className="relative inline-flex items-center justify-center h-16 sm:h-18 md:h-20 w-full max-w-[450px] min-w-[280px]
              bg-[#006A71] dark:bg-[#3dd6f3] text-white dark:text-gray-900
              font-bold text-lg sm:text-xl md:text-[22px] rounded-lg transition-all duration-300
              hover:bg-[#6db3b7] dark:hover:bg-[#66c9f4] hover:shadow-lg hover:-translate-y-1
              before:content-[''] before:absolute before:top-0 before:-left-[30px] sm:before:-left-[35px] md:before:-left-[43px]
              before:border-t-[32px] before:border-b-[32px] before:border-r-[32px] sm:before:border-t-[36px] sm:before:border-b-[36px] sm:before:border-r-[36px] md:before:border-t-[40px] md:before:border-b-[40px] md:before:border-r-[40px]
              before:border-transparent before:border-r-[#006A71] dark:before:border-r-[#3dd6f3] z-10 
              pl-[45px] sm:pl-[50px] md:pl-[60px] pr-4 sm:pr-6"
          >
            EXPLORE TIMELINE
          </button>

          <button
            onClick={goToCreateTimeline}
            className="relative inline-flex items-center justify-center h-16 sm:h-18 md:h-20 w-full max-w-[450px] min-w-[280px]
              bg-[#F2EFE7] dark:bg-gray-800 text-[#006A71] dark:text-[#3dd6f3] border-2 border-[#006A71] dark:border-[#3dd6f3]
              font-bold text-lg sm:text-xl md:text-[22px] rounded-lg transition-all duration-300
              hover:bg-[#6db3b7] dark:hover:bg-[#0f7389] hover:shadow-lg hover:-translate-y-1
              after:content-[''] after:absolute after:top-0 after:-right-[30px] sm:after:-right-[35px] md:after:-right-[43px]
              after:border-t-[32px] after:border-b-[32px] after:border-l-[32px] sm:after:border-t-[36px] sm:after:border-b-[36px] sm:after:border-l-[36px] md:after:border-t-[40px] md:after:border-b-[40px] md:after:border-l-[40px]
              after:border-transparent after:border-l-[#006A71] dark:after:border-l-[#3dd6f3] z-10
              px-4 sm:px-6"
          >
            CREATE YOUR OWN TIMELINE
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Choose;
