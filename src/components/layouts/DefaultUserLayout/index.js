import React from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultUserLayout.module.scss';
import HeaderUser from '../components/HeaderUser';
import SideBarUser from '../components/SideBarUser';
import Header from '../components/header';

const cx = classNames.bind(styles);

const DefaultUserLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <HeaderUser />
            {/* <div className={cx('header')}>
                <Header />
            </div> */}
            <div className={cx('container')}>
                <div className={cx('left-content')}>
                    <SideBarUser />
                </div>
                <div className={cx('right-content')}>{children}</div>
            </div>
        </div>
    );
};

export default DefaultUserLayout;
