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
            title: '???nh',
            width: '6%',
            dataIndex: 'image',
            align: 'center',
            ...getColumnSearchProps('image'),
        },
        {
            key: 'name',
            title: 'T??n s???n ph???m',
            dataIndex: 'name',
            width: '40%',
        },
        {
            key: 'quantity',
            title: 'S??? l?????ng',
            dataIndex: 'quantity',
            width: '10%',
        },
        {
            key: 'price',
            title: 'Gi?? b??n',
            dataIndex: 'price',
            width: '10%',
            ...getColumnSearchProps('price'),
        },
        {
            key: 'original_price',
            title: 'Gi?? g???c',
            dataIndex: 'original_price',
            width: '9%',
            ...getColumnSearchProps('original_price'),
        },
        {
            key: 'type',
            title: 'Lo???i',
            dataIndex: 'type',
            align: 'center',
            width: '10%',
            ...getColumnSearchProps('type'),
        },
        {
            key: 'supplier',
            title: 'Nh?? cung c???p',
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
                            title={'B???n c?? mu???n x??a s???n ph???m n??y?'}
                            onConfirm={() => handleConfirm(record)}
                            okText={'X??a'}
                            cancelText={'H???y'}
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
                        <span>Qu???n l?? s???n ph???m</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>T???t c??? ????n h??ng</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <div className={cx('content-top')}>
                        <div className={cx('group-title')}>
                            <span className={cx('title')}>T???t c??? s???n ph???m</span>
                            <div className={cx('action-group')}>
                                <button className={cx('btn-delete')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span>X??a s???n ph???m</span>
                                </button>
                                <button className={cx('btn-order')} onClick={handleCreateOrder}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>T???o s???n ph???m</span>
                                </button>
                            </div>
                        </div>
                        <div className={cx('filter-search-group')}>
                            <div className={cx('filter')}>
                                <FontAwesomeIcon icon={faFilter} />
                                <span>Th??m ??i???u ki???n l???c</span>
                            </div>
                            <div className={cx('search')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <input type="text" placeholder="T??m ki???m" />
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
