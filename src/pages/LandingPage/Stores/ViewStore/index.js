import classNames from 'classnames/bind';
import Creator from './components/Creator';
import styles from './ViewStore.module.scss';
import { List, Pagination } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import storeApi from '~/api/StoreApi/storeApi';
import ListProduct from './components/ListProduct';

const cx = classNames.bind(styles);

function ViewStore() {
    const { id } = useParams();
    const [listStores, setListStores] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        const getAllStoreByField = async () => {
            if (id !== undefined) {
                const result = await storeApi.getAllStoreByField(id);
                setListStores(result);
            }
        };
        getAllStoreByField();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('container-video')}>
                    <iframe
                        width="100%"
                        height="700"
                        src="https://www.youtube.com/embed/3beiUvff8vM"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
                <div className={cx('container-des')}>
                    <div className={cx('container-des-detail')}>
                        <p>
                            Ngành An toàn Thông tin của Việt Nam những năm gần đây đã đạt đến sự phát triển rất mạnh mẽ
                            và gặt hái được rất nhiều thành tựu trên trường quốc tế. Theo báo cáo xếp hạng toàn cầu
                            (GCI) năm 2020 do ITU công bố, Việt Nam đang xếp hạng thứ 25 trong các quốc gia dẫn đầu về
                            Chỉ số an toàn thông tin quốc tế. TECHFEST VIETNAM 2021 chính thức ra mắt Làng Công nghệ An
                            toàn Không Gian Mạng, nhằm kết nối các Bộ/Ngành, doanh nghiệp và tổ chức với các đơn vị hoạt
                            động trong lĩnh vực bảo mật tại Việt Nam, xóa bỏ những rào cản vô hình khiến doanh nghiệp
                            gặp khó khăn khi muốn tìm hiểu về ATTT, như những lo ngại về chi phí, nguồn thông tin hay
                            lượng kiến thức phức tạp; xây dựng nền tảng và tạo động lực phát triển bền vững Công nghệ An
                            toàn Không gian mạng Việt Nam. Làng Công nghệ An toàn Không Gian Mạng hướng tới mục tiêu
                            thúc đẩy tinh thần khởi nghiệp và hỗ trợ các startup trong lĩnh vực ATTT có cơ hội được phát
                            triển và làm giàu cho hệ sinh thái ATTT Việt Nam.
                        </p>
                    </div>
                </div>
                <div className={cx('container-ceo')}>
                    <div className={cx('container-ceo-detail')}>
                        <div className={cx('ceo-detail-1')}>
                            <p className={cx('ceo-creator')}>Người sáng lập</p>
                            <Creator />
                        </div>
                        <p className={cx('ceo-creator2')}>Đồng sáng lập</p>
                        <div className={cx('ceo-detail-2')}>
                            <Creator />
                            <Creator />
                        </div>
                    </div>
                </div>
                <div className={cx('container-listcompany')}>
                    <div className={cx('container-list-detail')}>
                        <div className={cx('list-title')}>Danh sách gian hàng trưng bày</div>
                        {listStores?.data?.length === 0 ? (
                            <h2>Chưa có doanh nghiệp nào trong gian hàng này</h2>
                        ) : (
                            listStores?.data?.map((item) => {
                                return <ListProduct key={item.id} item={item} />;
                            })
                        )}
                    </div>
                </div>
                {/* <Pagination defaultCurrent={1} total={150} /> */}
            </div>
        </div>
    );
}

export default ViewStore;
