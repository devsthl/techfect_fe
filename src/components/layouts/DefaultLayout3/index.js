import React from 'react';
import Footer from '../components/Footer';
import HeaderUser from '../components/HeaderUser';
import './DefaultLayout3.scss';

const DefaultLayout3 = ({ children }) => {
    return (
        <div className="defaultLayout-wrapper">
            <HeaderUser />
            <div className="defaultLayout-container">{children}</div>
            <div className="defaultLayout-footer">
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout3;
