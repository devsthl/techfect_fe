import classNames from 'classnames/bind';
import styles from './CurrentUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faCartShopping,
    faCircleQuestion,
    faSignOut,
    faTrash,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import PopperMenu from '../Popper/PopperMenu';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper } from '../Popper';
import CartApi from '~/api/Cart/cartApi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message, Skeleton } from 'antd';
import { isEnterprise, isSubAdmin } from '~/utils/utils';
import formatCash from '~/utils/formatCash';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function CurrentUser() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [listProductInCart, setListProductInCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCartHeader, setShowCartHeader] = useState(false);

    const handlelogout = (e) => {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('info');
        message.success('Bạn đã đăng xuất');
        navigate('/');
    };

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
                <Link to={'/'} onClick={handlelogout}>
                    {t('text.sign_out')}
                </Link>
            ),
        },
    ];
    const MENU_ITEMS2 = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: (
                <Link to={'/user/personal-info'} className="profile-item">
                    {t('text.account')}
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
                <Link to={'/'} onClick={handlelogout}>
                    {t('text.sign_out')}
                </Link>
            ),
        },
    ];

    const handleShowCart = () => {
        setShowCartHeader(!showCartHeader);
        if (!showCartHeader) {
            setLoading(true);
            const getAllProductIncart = async () => {
                const listData = await CartApi.getAllCart();
                setListProductInCart(listData.store);
                setLoading(false);
            };
            getAllProductIncart();
        }
    };

    return (
        <div className={cx('current-wrapper')}>
            <div className={cx('current-user')}>
                <PopperMenu items={isEnterprise() || isSubAdmin() ? MENU_ITEMS1 : MENU_ITEMS2}>
                    <img
                        src="https://media.coolmate.me/cdn-cgi/image/quality=80/uploads/May2022/avatar-review-1_(1).jpeg"
                        alt=""
                    />
                </PopperMenu>
                <HeadlessTippy
                    interactive
                    visible={showCartHeader}
                    placement="bottom-end"
                    onClickOutside={() => setShowCartHeader(false)}
                    render={(attrs) => (
                        <Wrapper tabIndex="-1" {...attrs}>
                            <div className={cx('cart-wrapper')}>
                                <div className={cx('cart-product-group')}>
                                    {listProductInCart.length === 0 ? (
                                        <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                                    ) : (
                                        <Skeleton loading={loading}>
                                            {listProductInCart?.map((itemStore) => {
                                                return itemStore.products?.map((item) => {
                                                    return (
                                                        <div className={cx('cart-product-item')}>
                                                            <img
                                                                src={`${process.env.REACT_APP_API_URL}${item.image_url[0].url}`}
                                                                alt="Avatar"
                                                            />
                                                            <div className={cx('cart-product-details')}>
                                                                <div className={cx('cart-product-details__left')}>
                                                                    <h3>{item.name}</h3>
                                                                    <p>
                                                                        {formatCash(item.price.toString())} đ{' '}
                                                                        <span>x{item.quantity}</span>
                                                                    </p>
                                                                </div>
                                                                <div className={cx('cart-product-details__right')}>
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                });
                                            })}
                                        </Skeleton>
                                    )}
                                </div>
                                <div className={cx('cart-header-bottom')}>
                                    {listProductInCart.length === 0 ? (
                                        <></>
                                    ) : (
                                        <div className={cx('action-btn')}>
                                            <button
                                                className={cx('show-cart')}
                                                onClick={() => {
                                                    navigate('/my-cart');
                                                    setShowCartHeader(false);
                                                }}
                                            >
                                                {t('text.My_cart')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Wrapper>
                    )}
                >
                    <button className={cx('action-btn')} onClick={handleShowCart}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                </HeadlessTippy>

                {/* <button className={cx('action-btn')}>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                </button> */}
            </div>
        </div>
    );
}

export default CurrentUser;
