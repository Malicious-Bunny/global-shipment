'use client';

import Script from 'next/script';

export default function ChatWidget() {
  return (
    <>
      <Script id="tawk-init" strategy="afterInteractive">
        {`window.Tawk_API = window.Tawk_API || {}; window.Tawk_LoadStart = new Date();`}
      </Script>
      <Script
        id="tawk-to"
        src="https://embed.tawk.to/69dcd5d65a78fd1c363996ae/1jm3a6k5m"
        strategy="afterInteractive"
        crossOrigin="*"
      />
    </>
  );
}
