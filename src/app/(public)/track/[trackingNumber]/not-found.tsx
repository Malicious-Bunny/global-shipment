import Link from 'next/link';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <MagnifyingGlass size={32} weight="duotone" className="text-neutral-400" />
        </div>
        <h1 className="mb-2 text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          Shipment Not Found
        </h1>
        <p className="mb-6 text-sm text-neutral-500 leading-relaxed">
          We could not find any shipment with the tracking number you entered.
          Please double-check and try again.
        </p>
        <Link
          href="/track"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/85 transition-colors cursor-pointer"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
