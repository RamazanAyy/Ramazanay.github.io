'use client';

import Image from 'next/image';
import { useState } from 'react';

const gradients: Record<string, string> = {
  'eco-baby-diapers': 'from-blue-50 to-teal-100',
  'mega-baby-diapers': 'from-blue-100 to-indigo-100',
  'adult-diapers-10': 'from-slate-100 to-blue-100',
  'adult-diapers-30': 'from-slate-100 to-blue-100',
  'adult-pants-10': 'from-blue-50 to-indigo-100',
  'adult-pants-30': 'from-blue-50 to-indigo-100',
  'adult-underpad': 'from-gray-100 to-blue-50',
  'baby-wet-wipes': 'from-teal-50 to-green-100',
  'wet-wipes': 'from-green-50 to-teal-100',
  'bladder-pads': 'from-cyan-50 to-teal-100',
  'home-care-wet-towels': 'from-orange-50 to-amber-100',
  'baby-underpad': 'from-teal-50 to-blue-100',
};

interface SmartImageProps {
  src: string;
  alt: string;
  productKey: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function SmartImage({
  src,
  alt,
  productKey,
  width = 400,
  height = 400,
  className = '',
  priority = false,
}: SmartImageProps) {
  const [error, setError] = useState(false);
  const gradient = gradients[productKey] || 'from-blue-50 to-teal-100';

  if (error || !src) {
    return (
      <div
        className={`bg-gradient-to-br ${gradient} flex flex-col items-center justify-center rounded-xl w-full aspect-square ${className}`}
      >
        <div className="text-4xl mb-2 opacity-40">📦</div>
        <p className="text-xs text-gray-400 text-center px-2">{alt}</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-square ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        className="object-contain"
        onError={() => setError(true)}
        priority={priority}
        quality={85}
      />
    </div>
  );
}
