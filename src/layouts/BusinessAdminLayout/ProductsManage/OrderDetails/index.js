import React from 'react';
import classNames from 'classnames/bind';
import styles from './OrderDetails.module.scss';

const cx = classNames.bind(styles);

const OrderDetails = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('top-content')}>
                    <div className={cx('title')}>
                        Chi tiết đơn hàng - <span>Giao hàng thành công</span>
                    </div>
                    <div className={cx('notify')}>
                        <h2>THÔNG BÁO</h2>
                        <div className={cx('notify-content')}>
                            <span className={cx('notify-time')}>6:41 27/04/2022</span>
                            <span className={cx('notify-text')}>
                                Chúng tôi bàn giao đơn hàng của quý khách đến đối tác vận chuyển
                            </span>
                        </div>
                    </div>
                    <div className={cx('order-details-group')}>
                        <div className={cx('parent-group')}>
                            <h2>ĐỊA CHỈ NGƯỜI NHẬN</h2>
                            <div className={cx('details-group')}>
                                <span className={cx('name')}>Vũ Ngọc Khiêm</span>
                                <div>
                                    <span className={cx('label')}>Địa chỉ: </span>
                                    <span className={cx('content')}>105 Láng Hạ, Đống Đa, Hà Nội</span>
                                </div>
                                <div>
                                    <span className={cx('label')}>Số điện thoại: </span>
                                    <span className={cx('content')}>0339160077</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('parent-group')}>
                            <h2>HÌNH THỨC GIAO HÀNG</h2>
                            <div className={cx('details-group')}>
                                <span className={cx('name')}>Giao hàng tiết kiệm</span>

                                <span className={cx('content')}>Giao vào thứ 4, 29/04</span>

                                <span className={cx('content')}>Được giao bởi ABC</span>
                                <span className={cx('content')}>Miễn phí vận chuyên</span>
                            </div>
                        </div>
                        <div className={cx('parent-group')}>
                            <h2>HÌNH THỨC THANH TOÁN</h2>
                            <div className={cx('details-group')}>
                                <span className={cx('name')}>Miễn phí vận chuyển</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
