import * as React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  target?: string;
  loading?: boolean;
  as?: 'button' | 'a';
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 disabled:opacity-50 disabled:pointer-events-none select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-neutral-900 text-neutral-0 hover:bg-neutral-800 focus-visible:ring-neutral-900',
  secondary: 'bg-neutral-0 border border-neutral-200 text-neutral-900 hover:bg-neutral-100',
  ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
  danger: 'bg-neutral-0 border border-neutral-200 text-red-600 hover:bg-red-50',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs rounded-8',
  md: 'h-9 px-4 text-sm rounded-10',
  lg: 'h-11 px-5 text-sm rounded-10',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  loading,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} target={target} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}
