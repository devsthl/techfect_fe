import React, { useEffect, useState } from 'react';
import { Form, Input, message, Select } from 'antd';
import './Edit.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    createAddress,
    editAddress,
    getAddressById,
    getAllCities,
    getDistrictsById,
    getWardsById,
    setDataWard,
} from '~/store/CustomerProfile/customerSlice';

const { Option } = Select;

const EditAddress = ({ isEdit, idEdit, setEditAddressModal }) => {
    const { allCities, listDistricts, listWards, addressById, message } = useSelector((state) => state.customerReducer);
    const dispatch = useDispatch();
    const [dataCity, setDataCity] = useState({});
    const [dataDistrict, setDataDistrict] = useState({});
    const [dataWards, setDataWards] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [formEdit] = Form.useForm();

    useEffect(() => {
        dispatch(getAllCities());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAddressById(idEdit));
    }, [idEdit]);

    useEffect(() => {
        if (!isEdit) {
            dispatch(getDistrictsById(dataCity.value));
            dispatch(getWardsById(dataDistrict.value));
        }
    }, [dataCity, dataDistrict, isEdit]);

    const handleChangeCity = (value, record) => {
        setDataCity({
            ...record,
            name: record.children,
            id: record.value,
        });
        formEdit.setFieldValue('district', undefined);
        formEdit.setFieldValue('ward', undefined);
        dispatch(getDistrictsById(value));
        setDataDistrict({});
        setDataWards({});
        dispatch(setDataWard());
    };

    const handleChangeDistrict = (value, record) => {
        setDataDistrict({
            ...record,
            name: record.children,
            id: record.value,
        });
        dispatch(getWardsById(value));
        formEdit.setFieldValue('ward', undefined);
        setDataWards({});
    };

    const handleChangeWards = (value, record) => {
        setDataWards({
            ...record,
            name: record.children,
            id: record.value,
        });
    };

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    }

    const handleCheckDefaultValue = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        if (isEdit) {
            dispatch(getDistrictsById(idEdit.address_detail.city.id));
            dispatch(getWardsById(idEdit.address_detail.district.id));
            const editFormValue = {
                name: idEdit.name,
                phone: idEdit.phone,
                address: idEdit.street,
                default_address: idEdit.default_address,
                city: idEdit.address_detail.city.id,
                district: idEdit.address_detail.district.id,
                ward: idEdit.address_detail.ward.id,
            };
            console.log('editFormValue', editFormValue);
            formEdit.setFieldsValue(editFormValue);
            setDataCity({
                id: idEdit.address_detail.city.id,
                name: idEdit.address_detail.city.name,
                ghn_id: idEdit.address_detail.city.ghn_id,
            });
            setDataDistrict({
                id: idEdit.address_detail.district.id,
                name: idEdit.address_detail.district.name,
                ghn_id: idEdit.address_detail.district.ghn_id,
            });
            setDataWards({
                id: idEdit.address_detail.ward.id,
                name: idEdit.address_detail.ward.name,
                ghn_id: idEdit.address_detail.ward.ghn_id,
            });
            if (idEdit.default_address === 0) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        } else {
            formEdit.resetFields();
        }
    }, [idEdit, isEdit]);

    const handleSubmit = async (value) => {
        if (!isEdit) {
            const data = {
                name: value.name,
                phone: value.phone,
                street: value.address,
                default_address: isChecked ? 0 : 1,
                address_detail: {
                    city: {
                        id: dataCity.id,
                        name: dataCity.name,
                        ghn_id: dataCity.ghn_id,
                    },
                    district: {
                        id: dataDistrict.id,
                        name: dataDistrict.name,
                        ghn_id: dataDistrict.ghn_id,
                    },
                    ward: {
                        id: dataWards.id,
                        name: dataWards.name,
                        ghn_id: dataWards.ghn_id,
                    },
                },
            };
            dispatch(createAddress(data));
            setEditAddressModal(false);
            formEdit.resetFields();
            message.success('Thêm địa chỉ thành công');
        } else {
            const data = {
                name: value.name,
                phone: value.phone,
                street: value.address,
                default_address: isChecked ? 0 : 1,
                address_detail: {
                    city: {
                        id: dataCity.id,
                        name: dataCity.name,
                        ghn_id: dataCity.ghn_id,
                    },
                    district: {
                        id: dataDistrict.id,
                        name: dataDistrict.name,
                        ghn_id: dataDistrict.ghn_id,
                    },
                    ward: {
                        id: dataWards.id,
                        name: dataWards.name,
                        ghn_id: dataWards.ghn_id,
                    },
                },
            };

            dispatch(
                editAddress({
                    data,
                    id: idEdit.id,
                }),
            );
            setEditAddressModal(false);
        }
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    return (
        <div className="edit-address-wrapper" id="edit-address">
            <div className="inner">
                <div className="title">
                    <h3>Chỉnh sửa địa chỉ</h3>
                </div>
                <div className="form-edit">
                    <Form
                        name={isEdit ? 'form-address-edit' : 'form-address'}
                        form={formEdit}
                        onFinish={handleSubmit}
                        validateMessages={validateMessages}
                    >
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="name">Tên</label>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tên không được để trống',
                                        },
                                    ]}
                                >
                                    <Input type="text" placeholder="Nhập họ và tên" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Số điện thoại không được để trống',
                                    },
                                    {
                                        pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                                        message: 'Số điện thoại không đúng định dạng',
                                    },
                                ]}
                            >
                                <Input type="text" placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </div>
                        <div className="group-select">
                            <div className="form-group-select">
                                <label htmlFor="">Tỉnh/Thành phố</label>
                                <Form.Item
                                    name="city"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tỉnh/Thành phố không được để trống',
                                        },
                                    ]}
                                >
                                    <Select
                                        className="select-group"
                                        placeholder="Tỉnh/Thành phố"
                                        onChange={handleChangeCity}
                                    >
                                        {allCities.map((item) => (
                                            <Option key={item.id} value={item.id} ghn_id={item.ghn_id}>
                                                {item.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="form-group-select">
                                <label htmlFor="">Quận/Huyện</label>
                                <Form.Item
                                    name="district"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Quận/Huyện không được để trống',
                                        },
                                    ]}
                                >
                                    <Select
                                        className="select-group"
                                        placeholder="Quận/Huyện"
                                        onChange={handleChangeDistrict}
                                    >
                                        {listDistricts.map((item) => (
                                            <Option key={item.id} value={item.id} ghn_id={item.ghn_id}>
                                                {item.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="form-group-select">
                                <label htmlFor="">Phường/Xã</label>
                                <Form.Item
                                    name="ward"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Phường/Xã không được để trống',
                                        },
                                    ]}
                                >
                                    <Select
                                        className="select-group"
                                        placeholder="Phường/Xã"
                                        onChange={handleChangeWards}
                                    >
                                        {listWards.map((item) => (
                                            <Option key={item.id} value={item.id} ghn_id={item.ghn_id}>
                                                {item.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <label htmlFor="street">Địa chỉ cụ thể</label>
                                <Form.Item
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Địa chỉ không được để trống',
                                        },
                                    ]}
                                >
                                    <Input type="text" placeholder="Nhập địa chỉ cụ thể" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="default-address">
                            <input
                                type="checkbox"
                                name="default-address"
                                checked={isChecked}
                                onChange={handleCheckDefaultValue}
                            />
                            <span>Đặt làm địa chỉ mặc định</span>
                        </div>
                        <div className="actions-button">
                            <button className="btn-back">Trở lại</button>
                            <button className="btn-submit" type="submit">
                                Hoàn thành
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditAddress;
