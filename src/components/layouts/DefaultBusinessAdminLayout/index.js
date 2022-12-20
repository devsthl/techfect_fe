import HeaderBusinessAdmin from '../components/BusinessAdmin/Header';
import SideBarBusinessAdmin from '../components/BusinessAdmin/SideBar';
import classNames from 'classnames/bind';
import styles from './DefaultBusinessAdminLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultBusinessAdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderBusinessAdmin />
            <div className={cx('container')}>
                <div className={cx('left-content')}>
                    <SideBarBusinessAdmin />
                </div>
                <div className={cx('right-content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultBusinessAdminLayout;
