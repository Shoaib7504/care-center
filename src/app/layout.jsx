import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://care-center-liard.vercel.app"),

  title: {
    default: "Care Center | Trusted Healthcare & Medical Services",
    template: "%s | Care Center",
  },

  description:
    "Care Center is your trusted healthcare platform for finding experienced doctors, booking appointments, exploring medical services, and receiving quality healthcare with ease.",

  keywords: [
    "Care Center",
    "Healthcare",
    "Medical Services",
    "Doctors",
    "Appointment Booking",
    "Hospital",
    "Healthcare Platform",
    "Medical Consultation",
    "Patient Care",
    "Health Services",
  ],

  applicationName: "Care Center",

  authors: [
    {
      name: "Care Center Team",
      url: "https://care-center-liard.vercel.app",
    },
  ],

  creator: "Care Center",
  publisher: "Care Center",

  category: "Healthcare",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://care-center-liard.vercel.app",
    siteName: "Care Center",

    title: "Care Center | Trusted Healthcare & Medical Services",

    description:
      "Book appointments, connect with experienced doctors, and access quality healthcare services through Care Center.",

    images: [
      {
        url: "https://ibb.co.com/JF287Rn6",
        width: 1200,
        height: 630,
        alt: "Care Center Homepage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Care Center | Trusted Healthcare Platform",

    description:
      "Find doctors, book appointments, and access trusted healthcare services.",

    images: ["https://ibb.co.com/JF287Rn6"],
  },

  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Care Center",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  other: {
    "theme-color": "#0EA5E9",
    "color-scheme": "light",
  },
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}</body>
    </html>
  );
}
