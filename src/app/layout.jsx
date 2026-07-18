import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import NextAuthProvider from "@/Provider/NextAuthProvider";
import Providers from "@/Provider/Providers";
import JsonLd from "@/Components/JsonLd";

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
    "Care Center connects families with trusted, vetted caregivers for babysitting, elderly care, and home nursing. Book compassionate care in minutes.",

  keywords: [
    "Care Center",
    "Home Care Services",
    "Babysitting",
    "Elderly Care",
    "Home Nursing",
    "Caregivers",
    "Vetted Caregivers",
    "Childcare",
    "Senior Care",
    "In-Home Care",
    "Healthcare Platform",
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

    title: "Care Center | Trusted Home Care Services",

    description:
      "Book trusted, vetted caregivers for babysitting, elderly care, and home nursing. Care Center connects your family with compassionate professionals.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Care Center Homepage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Care Center | Trusted Home Care Services",

    description:
      "Find vetted caregivers, book babysitting or elderly care, and access trusted home care services.",

    images: ["/og-image.jpg"],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
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
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <NextAuthProvider>
          <Providers>
            {children}
          </Providers>
        </NextAuthProvider>
        <Toaster
          position="top-right"
          gutter={12}
          containerClassName=""
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--color-card)",
              color: "var(--color-foreground)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-card)",
              fontSize: "0.875rem",
              padding: "14px 18px",
            },
            success: {
              iconTheme: { primary: "var(--color-primary)", secondary: "white" },
            },
            error: {
              iconTheme: { primary: "var(--color-destructive)", secondary: "white" },
            },
          }}
        />
      </body>
    </html>
  );
}
