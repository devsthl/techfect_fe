import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TransportManage.module.scss';
import ButtonComponent from '~/components/layouts/components/Button';
import images from '~/assets/images/home/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ListTransport from './Components/ListTransport';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const TransportManage = () => {
    const { t } = useTranslation();
    const [currentFunction, setCurrentFunction] = useState(1);

    const MENU = [
        {
            id: 1,
            title: t('text.All_Orders'),
        },
        {
            id: 2,
            title: 'Đã xác thực',
        },
        {
            id: 3,
            title: 'Chưa xử lý',
        },
        {
            id: 4,
            title: 'Chưa thanh toán',
        },
        {
            id: 5,
            title: 'Đã thanh toán',
        },
        {
            id: 6,
            title: 'Đang giao hàng',
        },
    ];
    const handleTab = (e) => {
        setCurrentFunction(e);
    };
    const list = MENU.map((item, index) => {
        return (
            <div key={index} onClick={() => handleTab(item.id)}>
                {item.title}
            </div>
        );
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('container-title')}>
                    <p>Quản lý sản phẩm </p>
                    <p>❯</p>
                    <p> Quản lý vận chuyển</p>
                </div>
                <div className={cx('list-function')}>{list}</div>
                <hr />
                <div className={cx('filter')}>
                    <ButtonComponent leftIcon={<img src={images.businessFilter} />} outline large>
                        Thêm điều kiện lọc
                    </ButtonComponent>
                    <div className={cx('input-filter')}>
                        <div className={cx('icon1')}>
                            <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
                        </div>
                        <input placeholder="Nhập tìm kiếm"></input>
                    </div>
                    <ButtonComponent outline small>
                        Lưu bộ lọc
                    </ButtonComponent>
                    <ButtonComponent normal small leftIcon={<img src={images.businessFilter2} />}></ButtonComponent>
                </div>
            </div>
            <div className={cx('list-transport')}>
                <div className={cx('table')}>
                    <input type="checkbox" name="" id="" />
                    <div className={cx('code')}>Mã</div>
                    <div className={cx('create')}>Ngày tạo</div>
                    <div className={cx('customer')}>Khách hàng</div>
                    <div className={cx('pay')}>Thanh toán</div>
                    <div className={cx('delivery')}>Giao hàng</div>
                    <div className={cx('cod')}>COD</div>
                    <div className={cx('total')}>Tống tiền</div>
                    <div className={cx('chanel')}>Kênh</div>
                </div>
                <ListTransport />
            </div>
        </div>
    );
};

export default TransportManage;
