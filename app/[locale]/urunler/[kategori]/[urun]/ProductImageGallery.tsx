'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  seriesColor: string;
  seriesName: string;
}

export default function ProductImageGallery({
  images,
  productName,
  seriesColor,
  seriesName,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  // If all images failed or no images, show nothing (caller handles fallback)
  const validImages = images.filter((_, i) => !imgError[i]);

  if (validImages.length === 0) return null;

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-white">
        <Image
          src={images[activeIndex]}
          alt={productName}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          onError={() => setImgError((prev) => ({ ...prev, [activeIndex]: true }))}
        />
        {/* Series badge */}
        <span
          className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-md z-10"
          style={{ backgroundColor: seriesColor }}
        >
          {seriesName}
        </span>
      </div>

      {/* Thumbnail strip */}
      {images.length >= 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 bg-white ${
                activeIndex === i
                  ? 'border-[#1a5fa8] shadow-md'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} - ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="80px"
                onError={() => setImgError((prev) => ({ ...prev, [i]: true }))}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
