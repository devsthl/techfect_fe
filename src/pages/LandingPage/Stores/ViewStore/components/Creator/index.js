import classNames from 'classnames/bind';
import styles from './Creator.module.scss';

import images from '~/assets/images/home/header';

const cx = classNames.bind(styles);
function Creator() {
    return (
        <div className={cx('wrapper')}>
            <img src={images.creator1} className={cx('content1')} />
            <div className={cx('content2')}>
                <div className={cx('title')}>Bà Trần Văn Anh</div>
                <div className={cx('des')}>
                    Trưởng làng Công nghệ An toàn không gian mạng TECHFEST 2021, TGĐ CTCP An ninh mạng Việt Nam VSEC Ông
                    Trương Đức Lượng - TGĐ Công ty Cổ phần An ninh mạng Việt Nam VSEC
                </div>
            </div>
        </div>
    );
}

export default Creator;
