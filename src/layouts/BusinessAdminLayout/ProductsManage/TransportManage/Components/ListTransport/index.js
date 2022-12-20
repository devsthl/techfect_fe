import classNames from 'classnames/bind';
import styles from './ListTransport.module.scss';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';

const cx = classNames.bind(styles);
function ListTransport() {
    const MENU_LIST = [
        {
            id: 'SMT1102',
            create: '1/10/2022',
            customer: 'Nguyen Van A',
            pay: 'Đã thanh toán',
            delivery: 'Chờ lấy hàng',
            cod: 'Không thu',
            total: '68000đ',
            chanel: 'youtube.com',
        },
        {
            id: 'SMT1102',
            create: '1/10/2022',
            customer: 'Nguyen Van A',
            pay: 'Chưa thanh toán',
            delivery: 'Chờ lấy hàng',
            cod: 'Không thu',
            total: '68000đ',
            chanel: 'youtube.com',
        },
        {
            id: 'SMT1102',
            create: '1/10/2022',
            customer: 'Nguyen Van A',
            pay: 'Đã thanh toán',
            delivery: 'Chờ lấy hàng',
            cod: 'Không thu',
            total: '68000đ',
            chanel: 'youtube.com',
        },
        {
            id: 'SMT1102',
            create: '1/10/2022',
            customer: 'Nguyen Van A',
            pay: 'Đã thanh toán',
            delivery: 'Đã lấy hàng',
            cod: 'Không thu',
            total: '79000đ',
            chanel: 'youtube.com',
        },
        {
            id: 'SMT1102',
            create: '1/10/2022',
            customer: 'Nguyen Van A',
            pay: 'Đã thanh toán',
            delivery: 'Chờ lấy hàng',
            cod: 'Không thu',
            total: '68000đ',
            chanel: 'youtube.com',
        },
        {
            id: 'SMT1102',
            create: '1/10/2022',
            customer: 'Nguyen Van A',
            pay: 'Đã thanh toán',
            delivery: 'Chờ lấy hàng',
            cod: 'Không thu',
            total: '68000đ',
            chanel: 'youtube.com',
        },
        {
            id: 'SMT1102',
            create: '1/10/2022',
            customer: 'Nguyen Van A',
            pay: 'Đã thanh toán',
            delivery: 'Chờ lấy hàng',
            cod: 'Không thu',
            total: '68000đ',
            chanel: 'youtube.com',
        },
    ];
    const list = MENU_LIST.map((item, index) => {
        return (
            <div className={cx('table12')} key={index}>
                <Link to="/transport-manage/detail" className={cx('table')}>
                    <input type="checkbox" name="" id="" />
                    <div className={cx('code')}>{item.id}</div>
                    <div className={cx('create')}>{item.create}</div>
                    <div className={cx('customer')}>{item.customer}</div>
                    <div className={cx('pay')}>{item.pay}</div>
                    <div className={cx('delivery')}>{item.delivery}</div>
                    <div className={cx('cod')}>{item.cod}</div>
                    <div className={cx('total')}>{item.total}</div>
                    <div className={cx('chanel')}>{item.chanel}</div>
                </Link>
            </div>
        );
    });
    return (
        <div className={cx('wrapper')}>
            <div>{list}</div>
            <Pagination defaultCurrent={1} total={50} />
        </div>
    );
}

export default ListTransport;
