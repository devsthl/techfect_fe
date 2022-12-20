import classNames from 'classnames/bind';
import styles from './DefaultHeaderLayout.module.scss';
import Footer from '../components/Footer';
import Header from '../components/header';
import images from '~/assets/images/home/header';
import HeaderUser from '../components/HeaderUser';

const cx = classNames.bind(styles);
function DefaultHeaderLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderUser />
            <div className={cx('container')}>{children}</div>
            <Footer />
            {/* <div className={cx('footer')}></div> */}
        </div>
    );
}

export default DefaultHeaderLayout;
