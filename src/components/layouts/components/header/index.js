import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images/home/header';
import { Link, useNavigate } from 'react-router-dom';
import ButtonComponent from '../Button';
import CurrentUser from '../CurrentUser';
import { useState } from 'react';
import ModalRegister from '~/components/Modal/ModalRegister';
import Language from '../Language';
import { useTranslation, Trans } from 'react-i18next';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.userReducer);
    const [currentModal, setCurrentModal] = useState(false);
    const menuHeader = [
        {
            name: 'home',
            title: <>{t('homecustomer.home')}</>,
            link: '/',
        },
        {
            name: 'introduce',
            title: <>{t('homecustomer.introduce')}</>,
            link: '/introduce',
        },
        {
            name: 'stores',
            title: <>{t('homecustomer.stores')}</>,
            link: '/fields-list',
        },
        {
            name: 'activity',
            title: <>{t('homecustomer.activity')}</>,
            link: '/activities',
        },
        {
            name: 'news',
            title: <>{t('homecustomer.news')}</>,
            link: '/news',
        },
        {
            name: 'document',
            title: <>{t('homecustomer.document')}</>,
            link: '/document',
        },
        {
            name: 'events',
            title: <>{t('homecustomer.events')}</>,
            link: '/events',
        },
    ];

    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

    const menu = menuHeader.map((item, index) => {
        return (
            <div className={cx('title-detail')} key={index}>
                <Link to={item.link} className={cx('title-detail-link')}>
                    <p>{item.title}</p>
                </Link>
            </div>
        );
    });
    const handleModalLogin = () => {
        setCurrentModal(true);
    };
    const handleClose = (e) => {
        setCurrentModal(false);
    };
    return (
        <header className={cx('wrapper')}>
            <ModalRegister visible={currentModal} onHide={handleClose} />
            <div className={cx('inner')}>
                <div className={cx('container')}>
                    <div className={cx('contents')}>
                        <div
                            className={cx('logo-content')}
                            onClick={() => {
                                navigate('/user/register-business');
                            }}
                        >
                            <img src={images.logo} alt="Logo" className={cx('logo-content1')} />
                            {isAuth && user.type === 2 ? (
                                <Link to={'/user/register-business'}>Trở thành doanh nghiệp</Link>
                            ) : (
                                <></>
                            )}
                        </div>

                        {isAuth ? (
                            <div className={cx('title-content')}>
                                {menu}
                                <CurrentUser />
                                <Language />
                            </div>
                        ) : (
                            <div className={cx('title-content')}>
                                {menu}
                                <span className={cx('border-split')}>|</span>
                                <ButtonComponent primary small to="/login">
                                    {t('homecustomer.login')}
                                </ButtonComponent>
                                <ButtonComponent outline small onClick={() => handleModalLogin()}>
                                    {t('homecustomer.register')}
                                </ButtonComponent>
                                <Language />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
