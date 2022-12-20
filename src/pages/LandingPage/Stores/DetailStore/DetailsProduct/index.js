import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailsBusiness.module.scss';
import CardProduct from '~/components/layouts/components/CardProduct';
import productsApi from '~/api/ProductsApi/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '~/store/Products/productsSlice';
import { message, Skeleton, Spin } from 'antd';
import { useState } from 'react';
import { useMemo } from 'react';
import { Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faRegistered, faShop, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const DetailsBusiness = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        const getAllProduct = async () => {
            const result = await productsApi.getAll();
            setProductList(result);
        };
        getAllProduct();
        setLoading(false);
    }, []);

    return (
        <div className={cx('details-business-wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('details-group')}>
                    <div className={cx('details-left')}>
                        <div className={cx('product-quantity')}>
                            <FontAwesomeIcon icon={faShop} /> Số lượng sản phẩm: <span>233</span>
                        </div>
                        <div className={cx('store-follow')}>
                            <FontAwesomeIcon icon={faUser} /> Số người theo dõi: <span>23</span> người
                        </div>
                    </div>
                    <div className={cx('details-right')}>
                        {/* <button>Theo dõi</button> */}
                        {/* <button className={cx('followed')}>Đã theo dõi</button> */}
                    </div>
                </div>
                <div className={cx('action-group')}>
                    <span className={cx('desc')}>
                        Ngành An toàn Thông tin của Việt Nam những năm gần đây đã đạt đến sự phát triển rất mạnh mẽ và
                        gặt hái được rất nhiều thành tựu trên trường quốc tế. Theo báo cáo xếp hạng toàn cầu (GCI) năm
                        2020 do ITU công bố, Việt Nam đang xếp hạng thứ 25 trong các quốc gia dẫn đầu về Chỉ số an toàn
                        thông tin quốc tế. TECHFEST VIETNAM 2021 chính thức ra mắt Làng Công nghệ An toàn Không Gian
                        Mạng, nhằm kết nối các Bộ/Ngành, doanh nghiệp và tổ chức với các đơn vị hoạt động trong lĩnh vực
                        bảo mật tại Việt Nam, xóa bỏ những rào cản vô hình khiến doanh nghiệp gặp khó khăn khi muốn tìm
                        hiểu về ATTT, như những lo ngại về chi phí, nguồn thông tin hay lượng kiến thức phức tạp; xây
                        dựng nền tảng và tạo động lực phát triển bền vững Công nghệ An toàn Không gian mạng Việt Nam.
                        Làng Công nghệ An toàn Không Gian Mạng hướng tới mục tiêu thúc đẩy tinh thần khởi nghiệp và hỗ
                        trợ các startup trong lĩnh vực ATTT có cơ hội được phát triển và làm giàu cho hệ sinh thái ATTT
                        Việt Nam.
                    </span>
                    <div className={cx('btn-group')}>
                        <button className={cx('btn-follow')}>
                            <FontAwesomeIcon icon={faUserPlus} /> Theo dõi
                        </button>
                        <button className={cx('btn-follow')}>
                            <FontAwesomeIcon icon={faRegistered} /> Đăng ký tham gia
                        </button>
                        <button className={cx('btn-follow')}>
                            <FontAwesomeIcon icon={faMessage} /> Chat Ngay
                        </button>
                    </div>
                </div>
                <div className={cx('product-group')}>
                    <div className={cx('new-product-group')}>
                        <div className={cx('new-product-title')}>
                            <h2>Sản phẩm mới</h2>
                        </div>

                        <div className={cx('product-list')}>
                            <Skeleton loading={loading}>
                                {productList.map((item) => {
                                    return <CardProduct item={item} />;
                                })}
                            </Skeleton>
                        </div>
                    </div>

                    <div className={cx('popular-product-group')}>
                        <div className={cx('popular-product-title')}>
                            <h2>Sản phẩm bán chạy</h2>
                        </div>
                        <Skeleton loading={loading}>
                            <div className={cx('product-list')}>
                                {productList.map((item) => {
                                    return <CardProduct item={item} />;
                                })}
                            </div>
                        </Skeleton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsBusiness;
