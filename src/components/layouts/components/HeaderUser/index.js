import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Wrapper } from '../Popper';
import menuHeader from '~/utils/menuHeader';
import styles from './HeaderUser.module.scss';
import logo from '~/assets/images/home/header/logo.png';
import { useSelector } from 'react-redux';
import CurrentUser from '../CurrentUser';
import ModalRegister from '~/components/Modal/ModalRegister';
import Language from '../Language';
import { useTranslation } from 'react-i18next';
import { Menu } from 'antd';

const cx = classNames.bind(styles);

function HeaderUser() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.userReducer);
    const [currentModal, setCurrentModal] = useState(false);

    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

    const handleModalLogin = () => {
        setCurrentModal(true);
    };
    const handleClose = (e) => {
        setCurrentModal(false);
    };
    const menuHeader = [
        {
            name: 'home',
            title: t('homecustomer.home'),
            link: '/',
        },
        {
            name: 'introduce',
            title: t('homecustomer.introduce'),
            link: '/introduce',
            children: [
                {
                    name: 'events',
                    title: t('homecustomer.events'),
                    link: '/events',
                },
            ],
        },
        {
            name: 'stores',
            title: t('homecustomer.stores'),
            link: '/company',
        },
        {
            name: 'activities',
            title: t('homecustomer.activity'),
            link: '/activities',
        },
        {
            name: 'news',
            title: t('homecustomer.news'),
            link: '/news',
        },
        {
            name: 'document',
            title: t('homecustomer.document'),
            link: '/document',
        },
        // {
        //     name: 'events',
        //     title: t('homecustomer.events'),
        //     link: '/events',
        // },
    ];
    return (
        <div className={cx('header-wrapper')}>
            <ModalRegister visible={currentModal} onHide={handleClose} />
            <header className={cx('header')}>
                <Link to={'/'}>
                    <img src={logo} alt="logo" />
                </Link>

                {user !== null && user.type === 2 ? (
                    <Link className={cx('to-business')} to={'/user/register-business'}>
                        {t('homecustomer.beenterprise')}
                    </Link>
                ) : (
                    <></>
                )}

                <div className={cx('admin-profile')}>
                    <nav className={cx('nav-group')}>
                        <Menu mode="horizontal">
                            {menuHeader.map((route, index) => {
                                if (route.children !== undefined) {
                                    return (
                                        <Menu.SubMenu
                                            key="SubMenu"
                                            title={route.title}
                                            onClick={() => {
                                                // navigate('/introduce');
                                            }}
                                        >
                                            {route.children.map((item) => {
                                                return (
                                                    <>
                                                        <Menu.Item key={route.name}>
                                                            <NavLink
                                                                className={cx('nav-item')}
                                                                key={index}
                                                                to={route.link}
                                                            >
                                                                {route.title}
                                                            </NavLink>
                                                        </Menu.Item>
                                                        <Menu.Item key={item.name}>
                                                            <NavLink
                                                                className={cx('nav-item')}
                                                                key={index}
                                                                to={item.link}
                                                            >
                                                                {item.title}
                                                            </NavLink>
                                                        </Menu.Item>
                                                    </>
                                                );
                                            })}
                                        </Menu.SubMenu>
                                    );
                                } else {
                                    return (
                                        <Menu.Item key={route.name}>
                                            <NavLink key={index} to={route.link}>
                                                {route.title}
                                            </NavLink>
                                        </Menu.Item>
                                    );
                                }
                            })}
                        </Menu>
                        {/* {menuHeader.map((route, index) => {
                            if (route.children !== undefined) {
                                return (
                                    <HeadlessTippy
                                        interactive
                                        visible={true}
                                        placement="top"
                                        // onClickOutside={() => setShowCartHeader(false)}
                                        render={(attrs) => (
                                            <Wrapper tabIndex="-1" {...attrs}>
                                                {route.children.map((item) => {
                                                    return (
                                                        <NavLink className={cx('nav-item')} key={index} to={item.link}>
                                                            {item.title}
                                                        </NavLink>
                                                    );
                                                })}
                                            </Wrapper>
                                        )}
                                    >
                                        <NavLink className={cx('nav-item')} key={index} to={route.link}>
                                            {route.title}
                                        </NavLink>
                                    </HeadlessTippy>
                                );
                            } else {
                                return (
                                    <NavLink className={cx('nav-item')} key={index} to={route.link}>
                                        {route.title}
                                    </NavLink>
                                );
                            }
                        })} */}
                    </nav>
                    {user !== null ? (
                        <>
                            <CurrentUser />
                        </>
                    ) : (
                        <>
                            <div className={cx('action-btn')}>
                                <button
                                    className={cx('btn-login')}
                                    onClick={() => {
                                        navigate('/login');
                                    }}
                                >
                                    {t('homecustomer.login')}
                                </button>
                                <button className={cx('btn-register')} onClick={() => handleModalLogin()}>
                                    {t('homecustomer.register')}
                                </button>
                            </div>
                        </>
                    )}
                    <div className={cx('language')}>
                        <Language />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default HeaderUser;
