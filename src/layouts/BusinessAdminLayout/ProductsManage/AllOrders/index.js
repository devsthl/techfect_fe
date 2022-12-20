import React from 'react';
import classNames from 'classnames/bind';
import styles from './AllOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faFilter, faMagnifyingGlass, faPlus, faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { Input, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images/home/header';

const cx = classNames.bind(styles);

const AllOrder = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content-main')}>
                    <div className={cx('content-top')}>
                        <div className={cx('filter-search-group')}>
                            <div className={cx('filter')}>
                                <FontAwesomeIcon icon={faFilter} />
                                <span>Thêm điều kiện lọc</span>
                            </div>
                            <div className={cx('search')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <input type="text" placeholder="Tìm kiếm" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-bottom')}>
                        <div className={cx('group-orders')}>
                            <div className={cx('title')}>
                                <FontAwesomeIcon icon={faTruckMoving} />
                                <span>Giao hàng thành công</span>
                            </div>
                            <div className={cx('group-order-details')}>
                                <div className={cx('order-details')}>
                                    <div className={cx('order-image')}>
                                        <img src={images.postImage} alt="Image" />
                                    </div>
                                    <div className={cx('right-group')}>
                                        <div className={cx('details-lefts')}>
                                            <span className={cx('order-name')}>Nước hoa DS</span>
                                            <span className={cx('normal-name')}>Công ty ABC</span>
                                            <span className={cx('normal-name')}>Số lượng: 02</span>
                                        </div>
                                        <div className={cx('order-price')}>
                                            <span>1.250.000 VNĐ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('order-details')}>
                                    <div className={cx('order-image')}>
                                        <img src={images.postImage} alt="Image" />
                                    </div>
                                    <div className={cx('right-group')}>
                                        <div className={cx('details-lefts')}>
                                            <span className={cx('order-name')}>Nước hoa DS</span>
                                            <span className={cx('normal-name')}>Công ty ABC</span>
                                            <span className={cx('normal-name')}>Số lượng: 02</span>
                                        </div>
                                        <div className={cx('order-price')}>
                                            <span>1.250.000 VNĐ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('order-details')}>
                                    <div className={cx('order-image')}>
                                        <img src={images.postImage} alt="Image" />
                                    </div>
                                    <div className={cx('right-group')}>
                                        <div className={cx('details-lefts')}>
                                            <span className={cx('order-name')}>Nước hoa DS</span>
                                            <span className={cx('normal-name')}>Công ty ABC</span>
                                            <span className={cx('normal-name')}>Số lượng: 02</span>
                                        </div>
                                        <div className={cx('order-price')}>
                                            <span>1.250.000 VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('order-bottom')}>
                                <div className={cx('total-price')}>
                                    Tổng tiền: <span>10.000.000 VNĐ</span>
                                </div>
                                <div className={cx('actions-btn')}>
                                    <button className={cx('order-btn')}>Mua lại</button>
                                    <button className={cx('order-btn')}>Xem chi tiết</button>
                                </div>
                            </div>
                        </div>

                        <div className={cx('group-orders')}>
                            <div className={cx('title')}>
                                <FontAwesomeIcon icon={faTruckMoving} />
                                <span>Giao hàng thành công</span>
                            </div>
                            <div className={cx('group-order-details')}>
                                <div className={cx('order-details')}>
                                    <div className={cx('order-image')}>
                                        <img src={images.postImage} alt="Image" />
                                    </div>
                                    <div className={cx('right-group')}>
                                        <div className={cx('details-lefts')}>
                                            <span className={cx('order-name')}>Nước hoa DS</span>
                                            <span className={cx('normal-name')}>Công ty ABC</span>
                                            <span className={cx('normal-name')}>Số lượng: 02</span>
                                        </div>
                                        <div className={cx('order-price')}>
                                            <span>1.250.000 VNĐ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('order-details')}>
                                    <div className={cx('order-image')}>
                                        <img src={images.postImage} alt="Image" />
                                    </div>
                                    <div className={cx('right-group')}>
                                        <div className={cx('details-lefts')}>
                                            <span className={cx('order-name')}>Nước hoa DS</span>
                                            <span className={cx('normal-name')}>Công ty ABC</span>
                                            <span className={cx('normal-name')}>Số lượng: 02</span>
                                        </div>
                                        <div className={cx('order-price')}>
                                            <span>1.250.000 VNĐ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('order-details')}>
                                    <div className={cx('order-image')}>
                                        <img src={images.postImage} alt="Image" />
                                    </div>
                                    <div className={cx('right-group')}>
                                        <div className={cx('details-lefts')}>
                                            <span className={cx('order-name')}>Nước hoa DS</span>
                                            <span className={cx('normal-name')}>Công ty ABC</span>
                                            <span className={cx('normal-name')}>Số lượng: 02</span>
                                        </div>
                                        <div className={cx('order-price')}>
                                            <span>1.250.000 VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('order-bottom')}>
                                <div className={cx('total-price')}>
                                    Tổng tiền: <span>10.000.000 VNĐ</span>
                                </div>
                                <div className={cx('actions-btn')}>
                                    <button className={cx('order-btn')}>Mua lại</button>
                                    <button className={cx('order-btn')}>Xem chi tiết</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllOrder;
