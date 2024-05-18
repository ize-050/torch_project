
import React from 'react';
import Header from './Header';
import Menu from './Menu';
const Template = ({ children }) => {
    return (
        <div>

        <Header />
        <Menu/>
        {children}

        </div>
    );
    }


export default Template;