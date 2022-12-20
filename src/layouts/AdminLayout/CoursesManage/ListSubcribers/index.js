import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListSubcribers.module.scss';
import images from '~/assets/images/home/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ListUnconfirmed from './ListUnconfirmed';
import ListConfirmed from './ListConfirmed';

const cx = classNames.bind(styles);

const ListSubcribers = () => {
    const [activeComp, setActiveComp] = useState('confirm');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Bài viết</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Danh sách bài viết</span>
                    </div>
                    <div className={cx('header-search')}>
                        <div className={cx('search-input')}>
                            <label htmlFor="search-business"></label>
                            <input id={cx('search-business')} placeholder="Tìm kiếm"></input>
                        </div>
                        <button className={cx('btn-search')}>Tìm kiếm</button>
                    </div>
                    <div className={cx('list-btn')}>
                        <div
                            className={activeComp === 'confirm' ? cx('comfirmed-btn', 'active') : cx('comfirmed-btn')}
                            onClick={() => setActiveComp('confirm')}
                        >
                            Danh sách tham gia
                        </div>
                        <div
                            className={
                                activeComp === 'unconfirm' ? cx('uncomfirmed-btn', 'active') : cx('uncomfirmed-btn')
                            }
                            onClick={() => setActiveComp('unconfirm')}
                        >
                            Danh sách chưa duyệt
                        </div>
                    </div>
                    {/* <div className={cx('header-create-group')}>
                        <ul>
                            <li className={cx('image')}>Họ và tên</li>
                            <li className={cx('time')}>Email</li>
                            <li className={cx('title')}>Địa chỉ</li>
                            <li className={cx('type')}>Số điện thoại</li>
                            <li className={cx('status')}>Trạng Thái</li>
                        </ul>
                    </div> */}
                </div>
                <ListConfirmed activeComp={activeComp} />
                {/* {activeComp === 'confirm' ? <ListConfirmed /> : <ListUnconfirmed />} */}
            </div>
        </div>
    );
};

export default ListSubcribers;
