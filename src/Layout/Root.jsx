import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

const Root = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes("login") || location.pathname.includes("signUp")
    return (
        <div>
            {isLogin || <Navbar></Navbar>}
            <Outlet></Outlet>
            {isLogin || <Footer></Footer>}
        </div>
    );
};

export default Root;