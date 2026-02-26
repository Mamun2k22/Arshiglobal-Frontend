import React from 'react';
import { Outlet } from 'react-router-dom';
import NewFooter from '../components/footer/NewFooter';
import ScrollToTop from '../context/ScrollToTop';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import TopContactBar from '../components/ui/TopContactBar';

const MainLayout = () => {
    return (
        <div>
              <ScrollToTop />
             
            <Navbar/>
            <Outlet/>
             <NewFooter />
             
        </div>
    );
};

export default MainLayout;