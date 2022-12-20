import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FavoriteProduct.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import { HeartFilled } from '@ant-design/icons';
import images from '~/assets/images/home/header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLikeProduct } from '~/store/Like/likeSlice';
import formatCash from '~/utils/formatCash';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const FavoriteProduct = () => {
    const [statusLove, setStatusLove] = useState(false);
    const { listLikeProduct } = useSelector((state) => state.likeReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getLikeProduct());
    }, [dispatch]);

    const classNotActive = cx('love-icon');
    const classesActive = cx('love-icon', 'active');

    const classesLoveIcon = statusLove ? classesActive : classNotActive;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Đơn hàng</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Khóa học yêu thích</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <div className={cx('list-courses')}>
                        {listLikeProduct.map((item) => {
                            return (
                                <div className={cx('course-item')}>
                                    <div className={cx('course-image')}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}${item?.product?.image_url[0]?.url}`}
                                            alt="Error"
                                        />
                                    </div>
                                    <div className={cx('course-details')}>
                                        <div className={cx('left-content')}>
                                            <span className={cx('course-name')}>{item?.product?.name}</span>
                                            <div className={cx('row-group')}>
                                                {/* <label>Mã Sản Phẩm :</label>
                                                <span>VNA-MALL-IP 004</span> */}
                                            </div>
                                            {/* <div className={cx('row-group')}>
                                            <label>Thời gian học:</label>
                                            <span>Thứ 2 đến CN</span>
                                        </div>
                                        <div className={cx('row-group')}>
                                            <label>Số lượng:</label>
                                            <span>8-10 người</span>
                                        </div> */}
                                        </div>
                                        <div className={cx('right-content')}>
                                            <div className={classesLoveIcon} onClick={() => setStatusLove(!statusLove)}>
                                                {/* <HeartFilled /> */}
                                            </div>
                                            <div className={cx('actions-group')}>
                                                <span>{formatCash(item?.product?.price.toString())} VNĐ</span>
                                                <button
                                                    onClick={() => {
                                                        navigate(
                                                            `/stores/viewstore/detail-product/${item?.product?.id}`,
                                                        );
                                                    }}
                                                >
                                                    Mua ngay
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteProduct;
