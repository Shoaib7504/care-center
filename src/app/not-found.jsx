import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Return to Care Center homepage to find trusted caregivers and services.",
  robots: {
    index: false,
  },
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center animate-fade-in">
      <span className="text-8xl sm:text-9xl font-extrabold gradient-text">404</span>
      <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground text-lg">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="cta-btn mt-8 inline-flex items-center gap-2 rounded-full gradient-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-soft hover:shadow-glow transition-all"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  );
};

export default NotFound;
