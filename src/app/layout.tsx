import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@/components/analytics';
import { siteConfig } from '@/configs/site';
import { env } from '@/env.mjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import AdScript from '@/components/AdScript';

// ✅ Font setup
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

// ✅ Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

// ✅ Metadata (SEO + OG)
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    images: siteConfig.ogImage,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.author,
  },
  icons: { icon: '/favicon.ico' },
  other: { referrer: 'no-referrer-when-downgrade' },
};

// ✅ Main Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Required for PEMSRV / ExoClick ads */}
        <meta
          httpEquiv="Delegate-CH"
          content="Sec-CH-UA https://s.pemsrv.com; Sec-CH-UA-Mobile https://s.pemsrv.com; Sec-CH-UA-Arch https://s.pemsrv.com; Sec-CH-UA-Model https://s.pemsrv.com; Sec-CH-UA-Platform https://s.pemsrv.com; Sec-CH-UA-Platform-Version https://s.pemsrv.com; Sec-CH-UA-Bitness https://s.pemsrv.com; Sec-CH-UA-Full-Version-List https://s.pemsrv.com; Sec-CH-UA-Full-Version https://s.pemsrv.com;"
        />
      </head>

      <body
        className={cn(
          'overflow-y-auto min-h-screen overflow-x-hidden bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        {/* ✅ PEMSRV Popunder Ad Script */}
        <AdScript />

        {/* ✅ Main App Layout */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <TailwindIndicator />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>

        {/* ✅ Google Analytics (optional) */}
        {env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              id="_next-ga"
              src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
            />
            <Script
              id="_next-ga-init"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', { cookie_flags: 'max-age=86400;secure;samesite=none' });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
