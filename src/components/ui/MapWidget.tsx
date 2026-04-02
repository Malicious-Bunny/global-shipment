'use client';

import { cn } from '@/lib/utils';

interface Props {
  lat: number;
  lng: number;
  className?: string;
}

export default function MapWidget({ lat, lng, className }: Props) {
  const delta = 0.04;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className={cn('overflow-hidden rounded-xl border border-neutral-200', className)}>
      <iframe
        src={src}
        title="Package location map"
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block', minHeight: '100%' }}
        loading="lazy"
      />
    </div>
  );
}
