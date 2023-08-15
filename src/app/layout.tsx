import StyledComponentsRegistry from '@/lib/registry';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Analytics} from '@vercel/analytics/react';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'PeePooBoo',
  description: 'PeePooBoo tracking app',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  manifest: '/manifest.json',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body style={{margin: 0, backgroundColor: 'black'}} className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  );
}
