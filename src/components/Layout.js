import React from 'react';
import Styles from './Layout.module.css';
import Menu from './Menu';

const Layout = ({ children }) => {
    return (
        <div className={Styles.box}>
            <Menu></Menu>
            {children}
        </div>
    );
};

export default Layout;
