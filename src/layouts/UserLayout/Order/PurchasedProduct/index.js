import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PurchasedProduct.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import { HeartFilled } from '@ant-design/icons';
import images from '~/assets/images/home/header';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import formatCash from '~/utils/formatCash';

const cx = classNames.bind(styles);

const PurchasedProduct = () => {
    const navigate = useNavigate();
    const [statusLove, setStatusLove] = useState(false);
    const { listLikeProduct } = useSelector((state) => state.likeReducer);

    const classNotActive = cx('love-icon');
    const classesActive = cx('love-icon', 'active');

    const classesLoveIcon = statusLove ? classesActive : classNotActive;

    console.log('damua', listLikeProduct);

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
                        {listLikeProduct.length === 0 ? (
                            <>
                                <div className={cx('course-item')}>
                                    <div className={cx('course-image')}>
                                        <img
                                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
                                            alt="Course"
                                        />
                                    </div>
                                    <div className={cx('course-details')}>
                                        <div className={cx('left-content')}>
                                            <span className={cx('course-name')}>
                                                IPad PRO 11-INCH WI‑FI 128GB - Space Grey MHQR3ZA/A
                                            </span>
                                            <div className={cx('row-group')}>
                                                <label>Mã Sản Phẩm :</label>
                                                <span>VNA-MALL-IP 004</span>
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
                                                <HeartFilled />
                                            </div>
                                            <div className={cx('actions-group')}>
                                                <span>1.500.000 VNĐ</span>
                                                <button
                                                    onClick={() => {
                                                        navigate('/user/course-payment');
                                                    }}
                                                >
                                                    Mua lại
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('course-item')}>
                                    <div className={cx('course-image')}>
                                        <img
                                            src="https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png"
                                            alt="Course"
                                        />
                                    </div>
                                    <div className={cx('course-details')}>
                                        <div className={cx('left-content')}>
                                            <span className={cx('course-name')}>
                                                IPad PRO 11-INCH WI‑FI 128GB - Space Grey MHQR3ZA/A
                                            </span>
                                            <div className={cx('row-group')}>
                                                <label>Mã Sản Phẩm :</label>
                                                <span>VNA-MALL-IP 004</span>
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
                                                <HeartFilled />
                                            </div>
                                            <div className={cx('actions-group')}>
                                                <span>1.500.000 VNĐ</span>
                                                <button
                                                    onClick={() => {
                                                        navigate('/user/course-payment');
                                                    }}
                                                >
                                                    Mua lại
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('course-item')}>
                                    <div className={cx('course-image')}>
                                        <img
                                            src="https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg"
                                            alt="Course"
                                        />
                                    </div>
                                    <div className={cx('course-details')}>
                                        <div className={cx('left-content')}>
                                            <span className={cx('course-name')}>
                                                IPad PRO 11-INCH WI‑FI 128GB - Space Grey MHQR3ZA/A
                                            </span>
                                            <div className={cx('row-group')}>
                                                <label>Mã Sản Phẩm :</label>
                                                <span>VNA-MALL-IP 004</span>
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
                                                <HeartFilled />
                                            </div>
                                            <div className={cx('actions-group')}>
                                                <span>1.500.000 VNĐ</span>
                                                <button
                                                    onClick={() => {
                                                        navigate('/user/course-payment');
                                                    }}
                                                >
                                                    Mua lại
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            listLikeProduct.map((item) => {
                                return (
                                    <div className={cx('course-item')}>
                                        <div className={cx('course-image')}>
                                            <img
                                                src={
                                                    item?.product.image_url === undefined
                                                        ? ''
                                                        : `${process.env.REACT_APP_API_URL}${item?.product?.image_url[0]?.url}`
                                                }
                                                alt="Course"
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
                                                <div
                                                    className={classesLoveIcon}
                                                    onClick={() => setStatusLove(!statusLove)}
                                                >
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
                                                        Mua lại
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasedProduct;
