import "./globals.css";
import TawkToChatbot from "./components/TawkToChatbot";
import type { Metadata } from 'next'
import OrganizationSchema from './components/OrganizationSchema'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ambaaritoursandtravels.com'),
  title: {
    default: 'Ambaari Tours and Travels | Expert Guided Treks & Domestic Travel Packages in India',
    template: '%s | Ambaari Tours'
  },
  description: 'Ambaari Tours and Travels organizes expertly guided treks, domestic travel packages, and custom group trips across India. We specialize in bringing people together through travel, offering specialized services for corporate team-building events and energetic college excursions. At Ambaari, we don\'t just plan trips; we create stories. Join us for a customized travel experience designed just for you.',
  keywords: [
    'Ambaari Tours',
    'Ambaari Travels',
    'Mysuru Ambari Travels',
    'travel agency India',
    'domestic tour packages',
    'guided treks India',
    'corporate travel',
    'college excursions',
    'pilgrimage tours',
    'Karnataka tour packages',
    'South India tours',
    'North India tours',
    'Ladakh bike trips',
    'Thailand packages',
    'Europe tours',
    'budget travel India',
    'luxury travel packages',
    'group tour operators',
    'travel agency Bangalore',
    'Mysore travel agency',
    'WINTER SPITI 4x4 expedition',
    'Leh Ladakh bike trip',
    'Thailand ladies special tour',
    'Dandeli Gokarna weekend trip',
    'Murdeshwara scuba diving',
    'Dharmasthala pilgrimage',
    'Jog Falls day trip',
    'Mantralaya day trip',
    'South Karnataka temple tour',
    'Varanasi Ayodhya pilgrimage',
    'Turkey adventure tour',
    'Europe dream tour'
  ],
  authors: [{ name: 'Ambaari Tours', url: 'https://www.ambaaritoursandtravels.com' }],
  creator: 'Ambaari Tours and Travels',
  publisher: 'Ambaari Tours and Travels',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Ambaari Tours and Travels',
    description: 'Expertly guided treks and travel packages across India. Specializing in corporate events, college excursions, and custom group trips. Book your next adventure with Ambaari Tours for unforgettable experiences through India\'s most breathtaking destinations.',
    url: 'https://www.ambaaritoursandtravels.com',
    siteName: 'Ambaari Tours',
    images: [
      {
        url: '/Images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ambaari Tours - Your Gateway to Incredible India',
      },
      {
        url: '/Images/logo.jpeg',
        width: 800,
        height: 600,
        alt: 'Ambaari Tours and Travels Logo',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ambaari Tours and Travels',
    description: 'Expertly guided treks and travel packages across India. Specializing in corporate events, college excursions, and custom group trips.',
    creator: '@ambaaritours',
    images: ['/Images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'googlec14c01a7816c0302.html', // Replace with actual code from Google Search Console
    yandex: 'your-yandex-verification-code', // Optional
    yahoo: 'your-yahoo-verification-code', // Optional
  },
  alternates: {
    canonical: 'https://www.ambaaritoursandtravels.com',
    languages: {
      'en-IN': 'https://www.ambaaritoursandtravels.com',
    },
  },
  category: 'travel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9352;77.6245" />
        <meta name="ICBM" content="12.9352, 77.6245" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#f59e0b" />
      </head>
      <body>
        <OrganizationSchema />
        {children}
        <TawkToChatbot />
      </body>
    </html>
  );
}