import React from 'react';
import classNames from 'classnames/bind';
import styles from './BusinessDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/home/header';
import CardProduct from '~/components/layouts/components/CardProduct';

const cx = classNames.bind(styles);

const BusinessDetails = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Doanh nghiệp</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Danh sách doanh nghiệp</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Chi tiết doanh nghiệp</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <div className={cx('content-top')}>
                        <div className={cx('business-details-group')}>
                            <div className={cx('business-group')}>
                                <div className={cx('business-avatar')}>
                                    <img src={images.businessAvatar} alt="Avatar"></img>
                                </div>
                                <div className={cx('business-info')}>
                                    <div className={cx('business-details')}>
                                        <span className={cx('business-name')}>CÔNG TY TNHH DKSH VIỆT NAM</span>
                                        <span className={cx('business-address')}>
                                            Số 23, Đại Lộ Độc Lập, khu Công Nghiệp Việt Nam- Singapore, Bình Hòa, Tp.
                                            Thuận An, Bình Dương
                                        </span>
                                        <span className={cx('business-website')}>http://www.dksh.com.vn</span>
                                        <span className={cx('business-email')}>nam.ky.nguyen@dksh.com</span>
                                    </div>
                                    <div className={cx('business-action')}>
                                        <div className={cx('action-delete')}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                            <span>Xóa</span>
                                        </div>
                                        <div className={cx('business-phone')}>
                                            <img src={images.phoneIcon} alt="Phone" />
                                            <span>0912345678</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('business-desc')}>
                            <h3>Giới thiệu</h3>
                            <span>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet
                                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                            </span>
                        </div>
                    </div>
                    <div className={cx('content-bottom')}>
                        <div className={cx('action')}>
                            <button>Sản phẩm</button>
                            <button>Khóa học</button>
                        </div>
                        <div className={cx('action-result')}>
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetails;
