import StyledComponentsRegistry from '@/lib/registry';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  viewport: 'initial-scale=1',
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
      </body>
    </html>
  );
}
