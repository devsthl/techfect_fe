import Footer from '../components/Footer';
import classNames from 'classnames/bind';
import styles from './DefaultHeaderLayout2.module.scss';
import banner2 from '~/assets/images/ListCourses/banner2.jpg';
import HeaderUser from '../components/HeaderUser';

const cx = classNames.bind(styles);
function DefaultHeaderLayout2({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderUser />
            <div className={cx('slideshow')}>
                <img src={banner2} alt="" />
            </div>
            <div className={cx('container')}>
                <div>{children}</div>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultHeaderLayout2;
