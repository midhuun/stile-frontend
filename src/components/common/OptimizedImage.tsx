import React, { useState } from 'react';
import { getOptimizedImageUrl, getSrcSet, OptimizedImageProps } from '../../utils/imageOptimizer';

/**
 * OptimizedImage component for rendering optimized and responsive images
 * with proper loading strategies and placeholder handling
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  sizes = '100vw',
  loading = 'lazy',
  quality = 80,
  objectFit = 'cover',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate optimized image URL
  const optimizedSrc = getOptimizedImageUrl(src, width || 800, height, quality, 'webp');
  
  // Generate srcSet for responsive images
  const srcSet = getSrcSet(src, undefined, quality);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  // Define loading attribute based on priority
  const loadingAttr = priority ? 'eager' : loading;

  return (
    <div className={`relative ${className}`} style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}>
      {/* Placeholder/skeleton while loading */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" 
          style={{ width: '100%', height: '100%' }}
        />
      )}
      
      {/* Actual image */}
      <picture>
        <source
          srcSet={srcSet} 
          type="image/webp"
          sizes={sizes}
        />
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loadingAttr}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ 
            objectFit, 
            width: '100%', 
            height: '100%'
          }}
        />
      </picture>
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          {alt || 'Image failed to load'}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 