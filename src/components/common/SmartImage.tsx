import { useEffect, useRef, useState } from 'react';

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  placeholderColor?: string;
};

export default function SmartImage({
  src,
  alt,
  className = '',
  width,
  height,
  sizes,
  placeholderColor = '#f3f4f6',
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '250px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const url = new URL(src, window.location.origin);
  // Request a smaller, optimized version from server/CDN if supported
  if (width) url.searchParams.set('w', String(width));
  if (height) url.searchParams.set('h', String(height));
  url.searchParams.set('q', '70');

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
        />
      )}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        ref={imgRef}
        src={inView ? url.toString() : undefined}
        alt={alt}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`block w-full h-full object-cover object-top transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
      />
    </div>
  );
}


