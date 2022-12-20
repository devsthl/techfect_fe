import classNames from 'classnames/bind';
import images from '~/assets/images/home/header';
import styles from './ListDocument.module.scss';
import { Link } from 'react-router-dom';
import ButtonComponent from '~/components/layouts/components/Button';
import { t } from 'i18next';
const cx = classNames.bind(styles);
function ListDocument({ item, currentId }) {
    const view = item.image_url.map((item1) => {
        if (item1.url) return item1.url;
        return item1;
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-left')}>
                <div>
                    <p className={cx('type')}>PDF</p>
                </div>
                <div className={cx('des-title')}>
                    <p className={cx('title')}>{item.name}</p>
                    {/* <span className={cx('title2')}>{item.event.des}</span> */}
                    <div className={cx('list-function')}>
                        {/* <div className={cx('time')}>
                            <img src={images.documenticontime} />
                            20/10/2020
                        </div>
                        <div className={cx('time')}>
                            <img src={images.documenticoneye} />
                            1000 {t('text.view')}
                        </div>
                        <div className={cx('time')}>
                            <img src={images.documenticondownload} />
                            1000 {t('text.download')}
                        </div> */}
                    </div>
                </div>
            </div>
            <div className={cx('content-right')}>
                {/* <div className={cx('right')}>
                    <img src={images.documenticonfolder} />
                    6.1 MB
                </div> */}
                <div className={cx('right2')}>
                    <img src={images.documenticondownload} />
                    Tải về
                </div>
                {/* <Link to='/view-documents'> */}
                <div className={cx('detail-view')}>
                    {item.type === 1 ? (
                        <Link to={`/document`}>Xem chi tiết</Link>
                    ) : (
                        <a href={`${process.env.REACT_APP_API_URL}${`${view}`}`}>Xem chi tiết</a>
                    )}
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default ListDocument;
