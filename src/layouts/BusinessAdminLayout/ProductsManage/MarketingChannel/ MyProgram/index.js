import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'antd';
import React from 'react';
import './MyProgram.scss';

const MyProgram = () => {
    const columns = [
        {
            key: 'name',
            title: 'Tên chương trình',
            width: '20%',
            dataIndex: 'name',
            align: 'left ',
        },
        {
            key: 'product_name',
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            width: '20%',
            align: 'left ',
        },
        {
            key: 'status',
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'left ',
            width: '10%',
        },
        {
            key: 'time',
            title: 'Thời gian',
            dataIndex: 'time',
            align: 'left ',
            width: '10%',
        },
        {
            key: 'manipulation',
            title: 'Thao tác',
            dataIndex: 'manipulation',
            align: 'left ',
            width: '9%',
        },
    ];

    const data = [
        {
            id: 1,
            name: 'Chương trình techfest',
            product_name: 'Techfest',
            status: 'Hoàn thành',
            time: '10:01 14/08/2022',
            manipulation: 'Sao chép',
        },
        {
            id: 2,
            name: 'Chương trình techfest',
            product_name: 'Techfest',
            status: 'Hoàn thành',
            time: '10:01 14/08/2022',
            manipulation: 'Sao chép',
        },
        {
            id: 3,
            name: 'Chương trình techfest',
            product_name: 'Techfest',
            status: 'Hoàn thành',
            time: '10:01 14/08/2022',
            manipulation: 'Sao chép',
        },
        {
            id: 4,
            name: 'Chương trình techfest',
            product_name: 'Techfest',
            status: 'Hoàn thành',
            time: '10:01 14/08/2022',
            manipulation: 'Sao chép',
        },
    ];

    return (
        <div className="my-program-wrapper">
            <div className="inner">
                <div className="header-main">
                    <div className="header-title">
                        <span>Quản lý sản phẩm</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Kênh marketing</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Chương trình của tôi</span>
                    </div>
                </div>
                <div className="content-main">
                    <div className="index-group">
                        <h3 className="title">Chỉ số quan trọng</h3>
                        <div className="list-index">
                            <div className="index-item">
                                <span className="title">Doanh số</span>
                                <span className="number">0 đ</span>
                            </div>
                            <div className="index-item">
                                <span className="title">Đơn hàng</span>
                                <span className="number">0</span>
                            </div>
                            <div className="index-item">
                                <span className="title">Số lượng đã bán</span>
                                <span className="number">0</span>
                            </div>
                            <div className="index-item">
                                <span className="title">Người mua</span>
                                <span className="number">0</span>
                            </div>
                        </div>
                    </div>
                    <div className="program-group">
                        <h2 className="program-title">Danh sách chương trình</h2>
                        <div className="search-group">
                            <div className="search-input">
                                <label htmlFor="search-business"></label>
                                <input id="search-business" placeholder="Tìm kiếm"></input>
                            </div>
                            <button className="btn-search">Tìm kiếm</button>
                        </div>
                        <div className="program-table">
                            <Table
                                scroll={{ x: 500 }}
                                style={{
                                    minHeight: '400px',
                                }}
                                rowKey={(record) => record.id}
                                columns={columns}
                                dataSource={data}
                                bordered
                                size="small"
                                pagination={{
                                    defaultPageSize: 10,
                                    hideOnSinglePage: true,
                                    pageSizeOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProgram;
