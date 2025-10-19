import type { Metadata, Viewport } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { AppProviders } from '@/providers';
import '@/index.css';

export const metadata: Metadata = {
  title: {
    default: 'Next.js + MUI Template',
    template: '%s | Next.js + MUI',
  },
  description: 'A modern Next.js template with Material-UI, TypeScript, and App Router',
  keywords: ['Next.js', 'React', 'Material-UI', 'TypeScript', 'Template'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Next.js + MUI Template',
    description: 'A modern Next.js template with Material-UI, TypeScript, and App Router',
    siteName: 'Next.js + MUI Template',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js + MUI Template',
    description: 'A modern Next.js template with Material-UI, TypeScript, and App Router',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <AppProviders>{children}</AppProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
