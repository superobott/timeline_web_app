import React from 'react';

/**
 * TimelineImages component displays a responsive grid of images.
 * 
 * Props:
 * - images: array of image objects with `src` and `alt` properties
 * 
 * Behavior:
 * - Returns null if no images are provided or the array is empty
 * - Displays images in a responsive grid with consistent aspect ratio (3:2)
 * - Each image is centered, cropped, and fills its container
 * - Fully responsive design for all device sizes
 */

const TimelineImages = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg bg-transparent">
      {images.map((image, index) => (
        <div
          key={index}
          className="aspect-[3/2] flex flex-col items-center text-center rounded-lg overflow-hidden shadow-md"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default TimelineImages;
