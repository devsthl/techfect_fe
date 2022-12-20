import Header from '../components/header';
import classNames from 'classnames/bind';
import styles from './DefaultHeaderLogin.module.scss';
import LogoSologan from './LogoSologan';
import HeaderUser from '../components/HeaderUser';

const cx = classNames.bind(styles);
function DefaultHeaderLogin({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderUser />
            <div className={cx('children')}>{children}</div>
        </div>
    );
}

export default DefaultHeaderLogin;
