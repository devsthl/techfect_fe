import React from 'react';
import classNames from 'classnames/bind';
import styles from './LoginAdmin.module.scss';
import images from '~/assets/images/home/header';

const cx = classNames.bind(styles);

const AdminLogin = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <header className={cx('header')}>
                    <a>
                        <img src={images.logoTechfest} alt="logo" />
                    </a>
                </header>
                <div className={cx('container')}>
                    <div className={cx('content-left')}>
                        <span className={cx('content-name')}>TECHFEST</span>
                        <span className={cx('slogan')}>KẾT NỐI HỆ SINH THÁI KHỞI NGHIỆP KHÔNG GIỚI HẠN</span>
                    </div>
                    <div className={cx('content-right')}>
                        <span className={cx('title')}>Đăng nhập tài khoản</span>
                        <form className={cx('login-form')}>
                            <div className={cx('form-item-input')}>
                                <img src={images.userNameIcon} alt="icon" />
                                <input
                                    id={cx('username')}
                                    placeholder="Tên đăng nhập"
                                    type="text"
                                    // autoComplete="off"
                                ></input>
                            </div>
                            <div className={cx('form-item-input')}>
                                <img src={images.passwordIcon} alt="icon" />
                                <input id={cx('password')} placeholder="Mật khẩu" type="password"></input>
                            </div>
                            <div className={cx('password-action')}>
                                <div className={cx('remember-password')}>
                                    <input id={cx('btn-checkbox')} type="checkbox" />
                                    <span>Nhớ mật khẩu</span>
                                </div>
                                <a href="#" className={cx('forgot-password')}>
                                    Quên mật khẩu
                                </a>
                            </div>
                            <div className={cx('password-or')}>Hoặc</div>
                            <div>
                                <button className={cx('btn-login')} type="submit">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
