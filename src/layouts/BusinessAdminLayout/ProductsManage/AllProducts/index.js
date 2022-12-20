import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AllProducts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faEdit, faFilter, faMagnifyingGlass, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { message, Popconfirm, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import productsApi from '~/api/ProductsApi/productsApi';
import storeApi from '~/api/StoreApi/storeApi';
import formatCash from '~/utils/formatCash';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '~/store/Products/productsSlice';

const cx = classNames.bind(styles);

const AllProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getAllProducts = async () => {
            const resStore = await storeApi.getMyStore();
            if (resStore.message !== 'error') {
                const res = await productsApi.getProductByStore(resStore.id);
                setDataSource(res.data);
                setLoading(false);
            }
        };
        getAllProducts();
    }, []);

    const getColumnSearchProps = (dataIndex) => ({
        render: (text, record, index) => {
            if (dataIndex === 'type') {
                return record.category.name;
            }
            if (dataIndex === 'supplier') {
                return record.store.name;
            }
            if (dataIndex === 'price') {
                return formatCash(record.price.toString());
            }
            if (dataIndex === 'original_price') {
                return formatCash(record.original_price.toString());
            }
            if (dataIndex === 'image') {
                return <img width={'100%'} src={`${process.env.REACT_APP_API_URL}${record.image_url[0].url}`} alt="" />;
            }
        },
    });

    const handleConfirm = (record) => {
        dispatch(deleteProduct(record.id));
    };

    const columns = [
        {
            key: 'image',
            title: 'Ảnh',
            width: '6%',
            dataIndex: 'image',
            align: 'center',
            ...getColumnSearchProps('image'),
        },
        {
            key: 'name',
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            width: '40%',
        },
        {
            key: 'quantity',
            title: 'Số lượng',
            dataIndex: 'quantity',
            width: '10%',
        },
        {
            key: 'price',
            title: 'Giá bán',
            dataIndex: 'price',
            width: '10%',
            ...getColumnSearchProps('price'),
        },
        {
            key: 'original_price',
            title: 'Giá gốc',
            dataIndex: 'original_price',
            width: '9%',
            ...getColumnSearchProps('original_price'),
        },
        {
            key: 'type',
            title: 'Loại',
            dataIndex: 'type',
            align: 'center',
            width: '10%',
            ...getColumnSearchProps('type'),
        },
        {
            key: 'supplier',
            title: 'Nhà cung cấp',
            dataIndex: 'supplier',
            align: 'center',
            width: '10%',
            ...getColumnSearchProps('supplier'),
        },
        {
            key: 'action',
            title: '',
            dataIndex: 'action',
            align: 'center',
            width: '10%',
            render: (text, record, id) => {
                return (
                    <>
                        <FontAwesomeIcon
                            className={cx('edit-icon')}
                            style={{
                                color: 'rgb(66, 133, 244)',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                            onClick={() => {
                                navigate(`/edit-product/${record.id}`);
                            }}
                            icon={faEdit}
                        />
                        <Popconfirm
                            placement="topRight"
                            title={'Bạn có muốn xóa sản phẩm này?'}
                            onConfirm={() => handleConfirm(record)}
                            okText={'Xóa'}
                            cancelText={'Hủy'}
                        >
                            <FontAwesomeIcon
                                className={cx('trash-icon')}
                                style={{
                                    marginLeft: 8,
                                    color: '#fb2525',
                                }}
                                onClick={() => {}}
                                icon={faTrash}
                            />
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    const handleCreateOrder = () => {
        navigate('/businessadmin/create-order');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Quản lý sản phẩm</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Tất cả đơn hàng</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <div className={cx('content-top')}>
                        <div className={cx('group-title')}>
                            <span className={cx('title')}>Tất cả sản phẩm</span>
                            <div className={cx('action-group')}>
                                <button className={cx('btn-delete')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span>Xóa sản phẩm</span>
                                </button>
                                <button className={cx('btn-order')} onClick={handleCreateOrder}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Tạo sản phẩm</span>
                                </button>
                            </div>
                        </div>
                        <div className={cx('filter-search-group')}>
                            <div className={cx('filter')}>
                                <FontAwesomeIcon icon={faFilter} />
                                <span>Thêm điều kiện lọc</span>
                            </div>
                            <div className={cx('search')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <input type="text" placeholder="Tìm kiếm" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-bottom')}>
                        <Table
                            scroll={{ x: 500 }}
                            style={{
                                minHeight: '400px',
                            }}
                            loading={loading}
                            rowKey={(record) => record.id}
                            columns={columns}
                            dataSource={dataSource}
                            bordered
                            rowSelection={{
                                type: 'checkbox',
                            }}
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
    );
};

export default AllProducts;
