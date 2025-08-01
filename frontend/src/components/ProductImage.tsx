// frontend/src/components/ProductImage.tsx
"use client"; // This directive marks this file as a Client Component

import React from 'react'; // Import React

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string; // Optional className prop for styling
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // This onError handler now runs on the client
        e.currentTarget.src = `https://placehold.co/250x180/333333/FFFFFF?text=No+Image`;
        e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
      }}
      className={className || ''} // Ensure className is always a string, even if optional prop is not provided
    />
  );
};

export default ProductImage;