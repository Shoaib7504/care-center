import { Footer } from '@/Components/Shared/Footer';
import Navbar from '@/Components/Shared/Navbar';
import React from 'react';

const layout = ({ children }) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default layout;