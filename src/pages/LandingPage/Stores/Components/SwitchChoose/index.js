import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './SwitchChoose.module.scss';
import ButtonComponent from '~/components/layouts/components/Button';
import images from '~/assets/images/home/header';
import { Pagination } from 'antd';
import parse from 'html-react-parser';

const cx = classNames.bind(styles);
const MEMU_ITEMS = [
    {
        title: 'Mô tả sản phẩm',
        id: 1,
    },

    {
        title: 'Đánh giá',
        id: 5,
    },
];

function SwitchChoose({ item }) {
    const [currentItem, setCurrentItem] = useState(1);
    const list = MEMU_ITEMS.map((item, index) => {
        return (
            <div
                key={index}
                className={currentItem === item.id ? `${cx('list-item')}` : ''}
                onClick={() => setCurrentItem(item.id)}
            >
                {item.title}
            </div>
        );
    });
    console.log('item', item);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-item')}>{list}</div>
            <div className={cx('content-detail')}>
                {currentItem === 1 ? <div className={cx('des')}>{parse(`${item.des}`)}</div> : null}
                {currentItem === 4 ? (
                    <div className={cx('contact')}>
                        <div className={cx('contact-detail')}>
                            Công ty TNHH BioSun 68 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM, Việt Nam.
                        </div>
                        <div className={cx('contact-btn')}>
                            <ButtonComponent leftIcon={<img src={images.phoneIcon} />} outline large>
                                Gọi điện
                            </ButtonComponent>
                            <ButtonComponent leftIcon={<img src={images.message} />} outline large>
                                Đăng ký
                            </ButtonComponent>
                            <ButtonComponent leftIcon={<img src={images.message} />} outline large>
                                Chat ngay
                            </ButtonComponent>
                        </div>
                    </div>
                ) : null}
                {currentItem === 5 ? (
                    <div className={cx('feedback')}>
                        <div className={cx('feedback-detail')}>FEEDBACK</div>
                        {/* <Pagination defaultCurrent={1} total={150} /> */}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default SwitchChoose;
