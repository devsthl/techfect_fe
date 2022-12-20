import React from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import logo from '~/assets/images/home/header/logo.png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const HeaderAdmin = () => {
    return (
        <header className={cx('header')}>
            <Link to={'/'}>
                <img src={logo} alt="logo" />
            </Link>
            <div className={cx('admin-profile')}>
                <span className={cx('admin-name')}>Admin</span>
                <div className={cx('avatar')}></div>
                {/* <div className={cx('notify', 'active-notify')}></div> */}
            </div>
        </header>
    );
};

export default HeaderAdmin;
