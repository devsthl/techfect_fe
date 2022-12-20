import { Button, Space, Table } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPackage } from '~/store/Package/packageSlice';
import formatCash from '~/utils/formatCash';
import './PackageManage.scss';

const PackageManage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { listPackage } = useSelector((state) => state.packageReducer);

    useEffect(() => {
        dispatch(getAllPackage());
    }, [dispatch]);
    const data = [
        {
            id: '1',
            name: 'Tập đoàn Hòa Phát',
            package: 'Gói dịch vụ 1 tháng',
            status: 'Hoạt động',
            cycle: '2022-12-01',
            price: '5000000',
        },
        {
            id: '2',
            name: 'Tập đoàn Smiletech',
            package: 'Gói dịch vụ 6 tháng',
            status: 'Tạm Hoãn',
            cycle: '2023-05-01',
            price: '10000000',
        },
    ];

    const getColumnSearchProps = (dataIndex) => ({
        render: (text, record, index) => {
            if (dataIndex === 'price') {
                return formatCash(record.price.toString());
            }
            if (dataIndex === 'service') {
                return '';
            }
            if (dataIndex === 'cycle') {
                return record.end_date;
            }
        },
    });

    const columns = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
            render: (text, record, index) => index + 1,
        },
        {
            key: 'name',
            title: t('text.company_name'),
            dataIndex: 'name',
            width: '30%',
            align: 'center',
            // ...getColumnSearchProps('user_name'),
        },
        {
            key: 'service',
            title: t('text.Service_Information'),
            dataIndex: 'service',
            align: 'center',
            width: '30%',
            ...getColumnSearchProps('service'),
        },
        {
            key: 'status',
            title: t('text.status'),
            dataIndex: 'status',
            width: '10%',
            align: 'center',
            // ...getColumnSearchProps('address'),
            render: (text, record, index) => (
                <Space size="middle">
                    {text === 'Hoạt động' ? (
                        <Button type="primary" size="small">
                            Active
                        </Button>
                    ) : (
                        <Button type="primary" size="small" danger>
                            Active
                        </Button>
                    )}
                </Space>
            ),
        },
        {
            key: 'cycle',
            title: t('text.Next_payment_period'),
            dataIndex: 'cycle',
            width: '10%',
            align: 'center',
            ...getColumnSearchProps('cycle'),
        },
        {
            key: 'price',
            title: t('text.Price'),
            dataIndex: 'price',
            width: '15%',
            align: 'center',
            ...getColumnSearchProps('price'),
        },

        // {
        //     key: 'action',
        //     align: 'center',
        //     // title: <SyncOutlined onClick={() => dispatch(getAllAccountsList())}/>,
        //     width: '8%',
        //     render: (text, record, index) => (
        //         <Space size="middle">
        //             <EditOutlined onClick={() => handleEditForm(record)} />
        //             <Popconfirm
        //                 placement="topRight"
        //                 title={
        //                     record.id === currentUser.id
        //                         ? translate('Day_la_tai_khoan_cua_ban')
        //                         : `${translate('Ban_muon_xoa')} ${record.name} ?`
        //                 }
        //                 onConfirm={() => handleDelete(record.id)}
        //                 okText={translate('Xoa')}
        //                 cancelText={translate('Huy')}
        //             >
        //                 <DeleteOutlined />
        //             </Popconfirm>
        //         </Space>
        //     ),
        // },
    ];

    return (
        <div className="package-manage">
            <Table
                scroll={{ x: 1098 }}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={listPackage}
                bordered
                pagination={{
                    defaultPageSize: 50,
                    hideOnSinglePage: true,
                    pageSizeOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                }}
            />
        </div>
    );
};

export default PackageManage;
