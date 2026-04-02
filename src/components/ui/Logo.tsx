import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  /** Height in px — width scales automatically from 740:252 aspect ratio */
  height?: number;
  /** Force a specific width override */
  width?: number;
}

/**
 * GES logo — renders the SVG lockup at the requested height.
 * Default height: 36px  →  width ≈ 106px
 */
export default function Logo({ className, height = 36, width }: Props) {
  const w = width ?? Math.round(height * (740 / 252));
  return (
    <Image
      src="/Global-Express-Shipments-1.svg"
      alt="Global Express Shipments"
      width={w}
      height={height}
      className={cn('object-contain', className)}
      priority
    />
  );
}
