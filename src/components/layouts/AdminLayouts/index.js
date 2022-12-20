import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import HeaderAdmin from '~/components/layouts/components/Admin/Header';
import SideBarAdmin from '~/components/layouts/components/Admin/Sidebar';

const cx = classNames.bind(styles);

const AdminLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <HeaderAdmin />
            <div className={cx('container')}>
                <div className={cx('left-content')}>
                    <SideBarAdmin />
                </div>
                <div className={cx('right-content')}>{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
