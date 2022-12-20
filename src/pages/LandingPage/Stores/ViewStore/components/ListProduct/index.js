import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';
import images from '~/assets/images/home/header';
import ButtonComponent from '~/components/layouts/components/Button';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function ListProduct({ item }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-left')}>
                <div className={cx('container-left-logo')}>
                    <img src={images.logostores1} className={cx('logo')} alt="" />
                    <div className={cx('title')}>
                        <Link className={cx('title1')} to="/store-details">
                            {item.name}
                        </Link>

                        <p className={cx('title2')}>Khu vực: Việt Nam</p>
                    </div>
                </div>
                <div className={cx('container-left-content')}>
                    {item?.products.map((itemProd) => {
                        return (
                            <div className={cx('content1')}>
                                <img src={`${process.env.REACT_APP_API_URL}${itemProd.image_url[0].url}`} alt="" />
                                <div className={cx('des')}>{itemProd.name}</div>
                                <p>Giá: Liên hệ</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={cx('container-right')}>
                <div className={cx('border-left')}>
                    <div className={cx('right-button')}>
                        <ButtonComponent leftIcon={<img src={images.calling} alt="" />} outline large>
                            Gọi điện
                        </ButtonComponent>
                        <ButtonComponent leftIcon={<img src={images.calendar} alt="" />} outline large>
                            Đặt lịch
                        </ButtonComponent>
                        <ButtonComponent leftIcon={<img src={images.message} alt="" />} outline large>
                            Nhắn tin
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListProduct;
