import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import './UserAddress.scss';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { message, Modal, Popconfirm, Spin } from 'antd';
import EditAddress from './EditAddress';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress, editAddress, getAllAddress } from '~/store/CustomerProfile/customerSlice';
import customersApi from '~/api/Customer/customerApi';

const UserAddress = () => {
    const dispatch = useDispatch();

    const { listAddress, loading, message } = useSelector((state) => state.customerReducer);

    const [editAddressModal, setEditAddressModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idEdit, setIdEdit] = useState();

    useEffect(() => {
        dispatch(getAllAddress());
    }, [dispatch]);

    const handleDeteleAddress = async (item) => {
        dispatch(
            deleteAddress({
                id: item.id,
            }),
        );

        message.success('Xóa địa chỉ thành công');
    };

    const handleSettingDefault = (item) => {
        const data = {
            ...item,
            default_address: 0,
        };

        dispatch(
            editAddress({
                data,
                id: item.id,
            }),
        );
    };

    return (
        <div className="user-address-wrapper">
            <Spin spinning={loading}>
                <div className="inner">
                    <div className="content-top">
                        <div className="title">
                            <span>Địa chỉ</span>
                        </div>
                        <button className="btn-add" onClick={() => setEditAddressModal(true)}>
                            <PlusCircleOutlined />
                            <span>Thêm địa chỉ</span>
                        </button>
                    </div>
                    <div className="content-bottom">
                        {listAddress.map((item) => {
                            const classes =
                                item.default_address === 1 ? 'address-group address-default' : 'address-group';

                            return (
                                <>
                                    <div className={classes}>
                                        <div className="address-details">
                                            <div className="address-details__group">
                                                <span className="label-name">Họ tên</span>
                                                <span className="address-info">{item.name}</span>
                                            </div>
                                            <div className="address-details__group">
                                                <span className="label-name">Số điện thoại</span>
                                                <span className="address-info">{item.phone}</span>
                                            </div>
                                            <div className="address-details__group">
                                                <span className="label-name">Địa chỉ</span>
                                                <span className="address-info">{item.street}</span>
                                            </div>
                                        </div>
                                        <div className="address-actions">
                                            <div className="actions-top">
                                                {item.default_address === 0 ? (
                                                    <>
                                                        <button>Mặc định</button>
                                                        <span>Đang là địa chỉ mặc định</span>
                                                    </>
                                                ) : (
                                                    <button onClick={() => handleSettingDefault(item)}>
                                                        Thiết lập mặc định
                                                    </button>
                                                )}
                                            </div>
                                            <div className="actions-bottom">
                                                <FontAwesomeIcon
                                                    onClick={() => {
                                                        setEditAddressModal(true);
                                                        setIsEdit(true);
                                                        setIdEdit(item);
                                                    }}
                                                    className="action-edit"
                                                    icon={faPenToSquare}
                                                />

                                                <Popconfirm
                                                    placement="topRight"
                                                    title={'Bạn có muốn xóa địa chỉ này?'}
                                                    onConfirm={() => handleDeteleAddress(item)}
                                                    okText={'Xóa'}
                                                    cancelText={'Hủy'}
                                                >
                                                    <FontAwesomeIcon className="action-delete" icon={faTrashCan} />
                                                </Popconfirm>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}

                        <Modal
                            wrapClassName="modal-cus modal-user-info"
                            centered
                            footer={null}
                            onCancel={() => {
                                setEditAddressModal(false);
                                setIsEdit(false);
                            }}
                            visible={editAddressModal}
                        >
                            <EditAddress isEdit={isEdit} idEdit={idEdit} setEditAddressModal={setEditAddressModal} />
                        </Modal>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default UserAddress;
