import React from 'react';
import classNames from 'classnames/bind';
import styles from './CardProduct.module.scss';
import { Rate } from 'antd';
import formatCash from '~/utils/formatCash';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const CardProduct = ({ item }) => {
    const navigate = useNavigate();
    console.log('itemmmm', item);
    const handleShowDetailsProduct = (item) => {
        navigate(`/stores/viewstore/detail-product/${item.id}`);
        window.scrollTo({ top: 570, left: 0, behavior: 'smooth' });
    };

    return (
        <div className={cx('card-wrapper')}>
            <div className={cx('card-image')} onClick={() => handleShowDetailsProduct(item)}>
                <img src={`${process.env.REACT_APP_API_URL}${item?.image_url[0].url}`} alt="Avatar" />
            </div>
            <div className={cx('card-details')}>
                <span className={cx('card-details-title')} onClick={() => handleShowDetailsProduct(item)}>
                    {item?.name}
                </span>
                <div className={cx('rating')}>
                    <Rate disabled defaultValue={4} />
                </div>
                <div className={cx('price')}>
                    <span className={cx('price-title')}>Price: </span>
                    <span className={cx('price-number')}>{formatCash(item?.price.toString())} đ</span>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;
