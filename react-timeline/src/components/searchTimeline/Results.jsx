import TimelineEvent from './TimelineEvent';
import TimelineImages from './TimelineImages';

/**
 * Results component displays search results including Wikipedia summary,
 * timeline events, and related side images.
 *
 * Props:
 * - query: Search term string
 * - startYear: Filter start year (optional)
 * - endYear: Filter end year (optional)
 * - fullText: Wikipedia summary text
 * - timelineEvents: Array of timeline event objects with date and summary
 * - images: Array of images (not used directly here)
 * - getSideImages: Function to retrieve images for left/right side panels
 *
 * Features:
 * - Shows Wikipedia summary in a collapsible section
 * - Renders timeline events centered with a vertical line
 * - Displays side image panels on left and right
 * - Provides user feedback when no results or timeline events found
 * - Fully responsive design for all device sizes
 */

export default function Results({
  query,
  startYear,
  endYear,
  fullText,
  timelineEvents,
  images,
  getSideImages
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Images - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
          <div className="sticky top-4">
            <TimelineImages images={getSideImages('left')} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {fullText ? (
            <div className="
              w-full p-4 sm:p-6 lg:p-8 rounded-lg 
              bg-white dark:bg-gray-800 
              shadow-md dark:shadow-[0_8px_16px_rgba(0,106,113,0.2)] 
              border border-gray-300 dark:border-[#006A71] 
            ">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#006A71] dark:text-[#3dd6f3] mb-4 sm:mb-6 text-center">
                {`Results for "${query}"`}
                {(startYear || endYear) && (
                  <span className="block text-lg sm:text-xl lg:text-2xl mt-2"> from: {startYear || '1900'} to: {endYear || '2024'}</span>
                )}
              </h2>

              <details className="
                my-4 sm:my-6 border border-[#006A71] dark:border-[#3dd6f3] rounded-lg p-3 sm:p-4 
                bg-[#F2EFE7] dark:bg-[#004a4f]
              ">
                <summary className="
                  cursor-pointer font-bold text-[#006A71] dark:text-[#3dd6f3] hover:underline text-base sm:text-lg
                ">
                  Show Wikipedia summary
                </summary>
                <p className="
                  mt-3 leading-relaxed whitespace-pre-wrap text-gray-800 dark:text-gray-300 max-h-60 overflow-y-auto 
                  border border-[#006A71] dark:border-[#3dd6f3] p-4 rounded bg-white dark:bg-[#003739] text-sm sm:text-base
                ">
                  {fullText}
                </p>
              </details>

              {timelineEvents.length > 0 ? (
                <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
                  <div className="absolute top-0 bottom-0 left-1/2 w-1 sm:w-1.5 md:w-2 lg:w-2.5 xl:w-3 bg-[#006A71] dark:bg-[#3dd6f3] -translate-x-1/2 z-0" />
                  {timelineEvents.map((event, index) => (
                    <TimelineEvent
                      key={index}
                      date={event.date}
                      summary={event.summary}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-lg sm:text-xl text-red-600 dark:text-red-400 mt-6 sm:mt-8">
                  No specific timeline events found for "{query}" in the extract.
                </p>
              )}
            </div>
          ) : (
            <p className="text-center text-lg sm:text-xl text-red-600 dark:text-red-400 mt-6 sm:mt-8">
              No data found on Wikipedia for "{query}". Please try a different search term.
            </p>
          )}

          {/* Mobile Images - Shown only on mobile/tablet, below content */}
          <div className="lg:hidden mt-6 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-[#006A71] dark:text-[#3dd6f3] mb-4">Related Images</h3>
              <TimelineImages images={getSideImages('left')} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <TimelineImages images={getSideImages('right')} />
            </div>
          </div>
        </div>

        {/* Right Images - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
          <div className="sticky top-4">
            <TimelineImages images={getSideImages('right')} />
          </div>
        </div>
      </div>
    </div>
  );
}
