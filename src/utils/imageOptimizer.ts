/**
 * Utility functions for image optimization
 */

/**
 * Generates an optimized image URL with parameters for width, height, and quality
 * @param url - Original image URL
 * @param width - Desired width
 * @param height - Desired height (optional)
 * @param quality - Image quality (1-100)
 * @param format - Image format (webp, avif, jpeg)
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  url: string,
  width: number,
  height?: number,
  quality: number = 80,
  format: 'webp' | 'avif' | 'jpeg' = 'webp'
): string => {
  if (!url) return '';
  
  // If URL already contains optimization parameters, return as is
  if (url.includes('?w=') || url.includes('&w=')) return url;
  
  // Check if URL already has query parameters
  const separator = url.includes('?') ? '&' : '?';
  
  // Build query string with optimization parameters
  let queryString = `${separator}w=${width}&q=${quality}&format=${format}`;
  
  // Add height if specified
  if (height) {
    queryString += `&h=${height}`;
  }
  
  return `${url}${queryString}`;
};

/**
 * Component props for the OptimizedImage component
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
}

/**
 * Generates a set of srcSet URLs for responsive images
 * @param url - Original image URL
 * @param widths - Array of widths for the srcSet
 * @param quality - Image quality
 * @returns srcSet string
 */
export const getSrcSet = (
  url: string, 
  widths: number[] = [320, 640, 768, 1024, 1280, 1536], 
  quality: number = 80
): string => {
  return widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(url, width, undefined, quality, 'webp');
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}; 