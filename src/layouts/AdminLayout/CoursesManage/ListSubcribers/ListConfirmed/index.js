import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ListConfirmed.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { confirmUser, deleteUser, getListConfirm } from '~/store/Course/courseSlice';
import { Button, Popconfirm, Skeleton, Space, Spin, Table } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

const ListConfirmed = ({ activeComp }) => {
    const dispatch = useDispatch();
    const [selectedForm, setSelectedForm] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { id } = useParams();

    const { listUserConfirm, loading } = useSelector((state) => state.courseReducer);

    console.log('listUserConfirm', listUserConfirm);

    useEffect(() => {
        dispatch(
            getListConfirm({
                status: activeComp === 'confirm' ? 1 : 0,
                course_id: id,
            }),
        );
    }, [dispatch, activeComp]);

    const handleConfirmUser = async (value) => {
        dispatch(
            confirmUser({
                data: {
                    id: [value],
                },
                course_id: id,
            }),
        );
    };

    const handleDeleteUser = async (value) => {
        dispatch(
            deleteUser({
                id: value,
                course_id: id,
            }),
        );
    };

    const columns = [
        {
            key: 'id',
            title: 'STT',
            dataIndex: 'id',
            align: 'center',
            width: '6%',
            render: (text, record, index) => index + 1,
        },
        {
            key: 'contact_name',
            title: 'Họ và tên',
            dataIndex: 'contact_name',
            width: '20%',
            align: 'center',
            // ...getColumnSearchProps('user_name'),
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            align: 'center',
            width: '20%',
            // ...getColumnSearchProps('name'),
        },
        {
            key: 'address',
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '30%',
            align: 'center',
            // ...getColumnSearchProps('address'),
            // render: (text, record, index) => (
            //     <Space size="middle">
            //         {text === 'Hoạt động' ? (
            //             <Button type="primary" size="small">
            //                 {text}
            //             </Button>
            //         ) : (
            //             <Button type="primary" size="small" danger>
            //                 {text}
            //             </Button>
            //         )}
            //     </Space>
            // ),
        },
        {
            key: 'phone',
            title: 'Số điện thoại',
            dataIndex: 'phone',
            width: '15%',
            align: 'center',
            // ...getColumnSearchProps('mobile'),
        },
        {
            key: 'action',
            title: 'Trạng thái',
            dataIndex: 'action',
            width: '15%',
            align: 'center',
            // ...getColumnSearchProps('email'),
            render: (text, record, index) => (
                <Space size="middle">
                    {activeComp === 'confirm' ? (
                        <Button type="primary" size="small">
                            Đã duyệt
                        </Button>
                    ) : (
                        <>
                            <CheckCircleOutlined
                                style={{
                                    color: '#369313',
                                }}
                                onClick={() => handleConfirmUser(record.id)}
                                className={cx('comfirm')}
                            />
                            <Popconfirm
                                title="Bạn có chắc muốn xóa không?"
                                onConfirm={() => handleDeleteUser(record.id)}
                            >
                                <CloseCircleOutlined
                                    style={{
                                        color: '#fb2525',
                                    }}
                                    // onClick={() => handleDeleteUser(item.id)}
                                    className={cx('uncomfirm')}
                                />
                            </Popconfirm>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const handleSelectForm = (selectedForm) => {
        setSelectedForm(selectedForm);
    };

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div className={cx('main-content')}>
            {/* <div className={cx('main-content')}>
                <Spin spinning={loading}>
                    {listUserConfirm?.map((item) => {
                        return (
                            <div className={cx('post-group')}>
                                <div className={cx('post-avatar')}>{item.contact_name}</div>
                                <div className={cx('post-time')}>
                                    <span className={cx('date')}>{item.email}</span>
                                </div>
                                <div className={cx('post-title')}>
                                    <span>{item.address}</span>
                                </div>
                                <div className={cx('post-type')}>
                                    <span>{item.phone}</span>
                                </div>
                                <div className={cx('post-status')}>
                                    <div className={cx('confirmed-status')}>Đã duyệt</div>
                                </div>
                            </div>
                        );
                    })}
                </Spin>
            </div> */}
            <Table
                size="small"
                loading={loading}
                scroll={{ x: 500 }}
                columns={columns}
                dataSource={listUserConfirm}
                bordered
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                pagination={{
                    defaultPageSize: 10,
                    hideOnSinglePage: true,
                    pageSizeOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                }}
            />
        </div>
    );
};

export default ListConfirmed;
