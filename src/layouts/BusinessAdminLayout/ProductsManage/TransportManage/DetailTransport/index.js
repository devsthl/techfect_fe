import classNames from 'classnames/bind';
import styles from './DetailTransport.module.scss';
import { Link } from 'react-router-dom';
import ButtonComponent from '~/components/layouts/components/Button';
import images from '~/assets/images/home/header';

const cx = classNames.bind(styles);
function DetailTransport() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('container-router')}>
                    <p>Quản lý sản phẩm </p>
                    <p>❯</p>
                    <Link to="/transport-manage">
                        <p> Quản lý vận chuyển</p>
                    </Link>
                    <p>❯</p>
                    <p>Chi tiết</p>
                </div>
                <div className={cx('contaier-status')}>
                    <div className={cx('status-left')}>
                        <div className={cx('left1')}>
                            <p>MÃ</p>
                            <span>SMT1102</span>
                        </div>
                        <div className={cx('left2')}>
                            <p>NGÀY TẠO</p>
                            <span>15/01/2022 08:57 SA</span>
                        </div>
                        <div className={cx('left3')}>
                            <p>TRẠNG THÁI</p>
                            <span>Chờ lấy hàng</span>
                        </div>

                        <div className={cx('left4')}>
                            <p>TRẠNG THÁI THU HỘ (COD)</p>
                            <span>Chưa nhận</span>
                        </div>
                        <div className={cx('left5')}>
                            <p>TRẠNG THÁI ĐỐI SOÁT</p>
                            <span>Chưa đối soát</span>
                        </div>
                    </div>
                    <div className={cx('status-right')}>
                        <ButtonComponent primary small>
                            Lưu trữ
                        </ButtonComponent>
                        <ButtonComponent outline small>
                            In
                        </ButtonComponent>
                    </div>
                </div>
                <div className={cx('contaier-btn')}>
                    <div className={cx('detail-left')}>
                        {/* delivery information */}
                        <div className={cx('detail-left1')}>
                            <div className={cx('detail-left1__title')}>Thông Tin Phiếu Vận Chuyển</div>
                            <hr />
                            <div className={cx('detail-left1__des')}>
                                <div className={cx('des-1')}>
                                    <p>Mã đơn hàng</p>
                                    <p>Mã vận đơn</p>
                                </div>
                                <div className={cx('des-2')}>
                                    <p>VNAUAT00364</p>
                                    <p>VNAUAT00364-912</p>
                                </div>
                                <div className={cx('des-3')}>
                                    <p>Nhà vận chuyển</p>
                                    <p>Gói dịch vụ</p>
                                </div>
                            </div>
                            <hr />

                            <div className={cx('detail-left1__des')}>
                                <div className={cx('des-1')}>
                                    <p>Tiền thu hộ</p>
                                    <p>Số điện thoại</p>
                                </div>
                                <div className={cx('des-2')}>
                                    <p>Nguyễn Văn A</p>
                                    <p>0969984428</p>
                                </div>
                                <div className={cx('des-3')}>
                                    <p>Phí vận chuyển</p>
                                    <p>Tổng khối lượng</p>
                                </div>
                            </div>
                        </div>
                        {/* user information  */}
                        <div className={cx('detail-left1')}>
                            <div className={cx('detail-left1__title')}>Thông Tin Người Mua</div>
                            <hr />
                            <div className={cx('detail-left1__des')}>
                                <div className={cx('des-1')}>
                                    <p>Tên</p>
                                    <p>Số điện thoại</p>
                                </div>
                                <div className={cx('des-2')}>
                                    <p>Nguyễn Văn B</p>
                                    <p>VNAUAT00364-912</p>
                                </div>
                                <div className={cx('des-3')}>
                                    <p>Email</p>
                                    <p>Địa chỉ</p>
                                </div>
                            </div>
                            <hr />

                            <div className={cx('detail-left1__des')}>
                                <div className={cx('des-1')}>
                                    <a href="https://www.google.com/maps/?hl=vi">
                                        <p>Xem bản đồ</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* product information  */}
                        <div className={cx('detail-left2')}>
                            <div className={cx('detail-left1__title')}>Thông Tin Sản Phẩm</div>
                            <hr />
                            <div className={cx('detail-left1__desproduct')}>
                                <div className={cx('des-1')}>
                                    <img src={images.advisor4} />
                                </div>
                                <div className={cx('des-2')}>
                                    <p>[Test] Combo quà Tết cán bộ công nhân viên Vietnam Airlines</p>
                                    <p>SKU: NS0029</p>
                                </div>
                                <div className={cx('des-3')}>
                                    <p>1x38,000 đ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('detail-right')}>
                        <div>
                            <p>Trạng thái thu hộ(COD)</p>
                        </div>
                        <hr />
                        <ButtonComponent primary large className={cx('btn')}>
                            Xác nhận đối soát
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailTransport;
