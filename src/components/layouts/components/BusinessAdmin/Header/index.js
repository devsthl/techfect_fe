import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderBusinessAdmin.module.scss';
import logo from '~/assets/images/home/header/logo.png';
import images from '~/assets/images/home/header';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faCartShopping,
    faCircleQuestion,
    faSignOut,
    faTrash,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { message } from 'antd';
import PopperMenu from '../../Popper/PopperMenu';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const HeaderBusinessAdmin = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showProfile, setShowProfile] = useState(false);

    const handlelogout = (e) => {
        localStorage.clear();
        message.success('Bạn đã đăng xuất');
        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 1000);
    };
    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

    const MENU_ITEMS1 = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: (
                <Link to={'/user/personal-info'} className="profile-item">
                    {t('text.account')}
                </Link>
            ),
        },
        {
            icon: <FontAwesomeIcon icon={faBuilding} />,
            title: (
                <Link to={'/all-orders'} className="profile-item">
                    {t('text.company')}
                </Link>
            ),
        },
        {
            icon: <FontAwesomeIcon icon={faCartShopping} />,
            title: (
                <Link to={'/my-cart'} className="profile-item">
                    {t('text.Order')}
                </Link>
            ),
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: (
                <Link to={'/my-cart'} onClick={handlelogout}>
                    {t('text.sign_out')}
                </Link>
            ),
        },
    ];
    const MENU_ITEMS2 = [
        {
            icon: <img src={images.userItem} alt="" />,
            title: (
                <Link to={'/user/personal-info'} className="profile-item">
                    <FontAwesomeIcon icon={faUser} />
                    {t('text.account')}
                </Link>
            ),
        },
        {
            icon: <img src={images.orderItem} alt="" />,
            title: (
                <Link to={'/my-cart'} className="profile-item">
                    <FontAwesomeIcon icon={faUser} />
                    {t('text.Order')}
                </Link>
            ),
        },
        {
            title: (
                <Link to={'/my-cart'} onClick={handlelogout}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    {t('text.sign_out')}
                </Link>
            ),
        },
    ];

    console.log('usserrrrrrr', user);

    return (
        <header className={cx('header')}>
            <Link to={'/'}>
                <img src={logo} alt="logo" />
            </Link>
            <div className={cx('admin-profile')}>
                <span className={cx('admin-name')}>{user === null ? '' : user?.full_name}</span>
                <PopperMenu setShowProfile={setShowProfile} items={MENU_ITEMS1}>
                    {/* <img
                        src="https://media.coolmate.me/cdn-cgi/image/quality=80/uploads/May2022/avatar-review-1_(1).jpeg"
                        alt=""
                    /> */}
                    <div className={cx('avatar')}></div>
                </PopperMenu>
                <div className={cx('notify', 'active-notify')}></div>
            </div>
        </header>
    );
};

export default HeaderBusinessAdmin;
