import classNames from 'classnames/bind';
import styles from './LogoSologn.module.scss';

import images from '~/assets/images/home/header';
import { useTranslation, Trans } from 'react-i18next';

const cx = classNames.bind(styles);
function LogoSologan() {
    const { t } = useTranslation();
    return (
        <div className={cx('content-brand')}>
            <div className={cx('content-detail')}>
                <img src={images.bannerlogin} alt="" className={cx('banner')} />
                {/* <div className={cx('sologan')}>
                    <p className={cx('name')}>TECHFEST</p>
                    <span>{t('home.name')}</span>
                </div> */}
            </div>
        </div>
    );
}

export default LogoSologan;
