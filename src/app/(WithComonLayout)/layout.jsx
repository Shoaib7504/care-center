import { Footer } from '@/Components/Shared/Footer';
import Navbar from '@/Components/Shared/Navbar';
import React from 'react';

const layout = ({ children }) => {
    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-glow focus:outline-none"
            >
                Skip to main content
            </a>
            <Navbar></Navbar>
            <main id="main-content" tabIndex={-1}>
                {children}
            </main>
            <Footer></Footer>
        </>
    );
};

export default layout;