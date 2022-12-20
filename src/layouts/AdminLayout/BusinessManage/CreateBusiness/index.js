import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateBusiness.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Input, message, Select, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import storeApi from '~/api/StoreApi/storeApi';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities, getDistrictsById, getWardsById, setDataWard } from '~/store/CustomerProfile/customerSlice';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const cx = classNames.bind(styles);
const CreateBusiness = () => {
    const { t } = useTranslation();
    const [fieldData, setFieldData] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [dataCity, setDataCity] = useState({});
    const [dataDistrict, setDataDistrict] = useState({});
    const [dataWards, setDataWards] = useState({});
    const [storeData, setStoreData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        image_url: '',
        des: '',
        website: '',
        personal_number: '',
    });
    const { allCities, listDistricts, listWards, addressById, message } = useSelector((state) => state.customerReducer);

    let formData = new FormData();

    useEffect(() => {
        setLoading(true);
        const getAllField = async () => {
            const result = await storeApi.getAllField();
            setFieldData(result);
        };
        getAllField();
        setLoading(false);
        dispatch(getAllCities());
    }, []);

    const handleChangeField = (value) => {
        setStoreData({
            ...storeData,
            field_id: value,
        });
    };

    const handleChangeStore = (e) => {
        setStoreData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleUploadImage = async (e) => {
        formData.append('files', e.file);

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData);

        setStoreData({
            ...storeData,
            image_url: res.data.url[0],
        });
    };

    const handleChangeCity = (value, record) => {
        dispatch(getDistrictsById(value));
        form.setFieldValue('district', undefined);
        form.setFieldValue('ward', undefined);
        setDataCity({
            ...record,
            name: record.children,
            id: record.value,
        });
        dispatch(setDataWard());
    };

    const handleChangeDistrict = (value, record) => {
        dispatch(getWardsById(value));
        form.setFieldValue('ward', undefined);
        setDataDistrict({
            ...record,
            name: record.children,
            id: record.value,
        });
    };

    const handleChangeWards = (value, record) => {
        setDataWards({
            ...record,
            name: record.children,
            id: record.value,
        });
    };

    const onSubmitStore = async (value) => {
        const data = {
            address: {
                address: value.address,
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
            des: value.des,
            email: value.email,
            name: value.name,
            personal_number: value.personal_number,
            phone: value.phone,
            website: value.website === undefined ? '' : value.website,
            ward_code: dataWards.ghn_id,
            district_id: dataDistrict.id,
        };

        const result = await storeApi.createStore(data);
        if (result.message === 'error') {
            message.error('Tạo cửa hàng không thành công');
        } else {
            message.success('Tạo cửa hàng thành công');
        }
    };

    return (
        <main className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.company')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.add_company')}</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <h3>{t('text.basic_information')}</h3>
                    <div className={cx('create-business-form')}>
                        <Form onFinish={onSubmitStore} form={form}>
                            <div className={cx('form-wrapper')}>
                                <div className={cx('form-top')}>
                                    <div className={cx('form-right')}>
                                        <div className={cx('form-right-group')}>
                                            <label htmlFor="name">{t('register.form1.nameenterprise')}</label>
                                            <Form.Item
                                                className={cx('form-group')}
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Tên doanh nghiệp không được để trống',
                                                    },
                                                ]}
                                            >
                                                <Input className={cx('input-7')} placeholder={t('text.enter_name')} />
                                            </Form.Item>
                                        </div>

                                        <div className={cx('form-right-group')}>
                                            <label htmlFor="email">Email</label>
                                            <Form.Item
                                                className={cx('form-group')}
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Email không được để trống',
                                                    },
                                                    {
                                                        type: 'email',
                                                        message: 'Email không đúng định dạng',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className={cx('input-7')}
                                                    placeholder={t('login.forgetpassword.detail')}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className={cx('form-right-group')}>
                                            <label htmlFor="address">{t('register.form1.address')}</label>
                                            <Form.Item
                                                className={cx('form-group')}
                                                name="address"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Địa chỉ không được để trống',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className={cx('input-7')}
                                                    placeholder={t('text.enter_address')}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className={cx('form-left')}>
                                        <div className={cx('form-left-group')}>
                                            <label htmlFor="phone">{t('register.form1.phone')}</label>
                                            <Form.Item
                                                className={cx('form-group')}
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
                                                <Input
                                                    className={cx('input-3')}
                                                    placeholder={t('text.enter_phone_number')}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={cx('form-left-group')}>
                                            <label htmlFor="website">{t('text.website_if')}</label>
                                            <Form.Item className={cx('form-group')} name="website">
                                                <Input
                                                    className={cx('input-3')}
                                                    placeholder={t('text.enter_website')}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className={cx('form-left-group')}>
                                            <label htmlFor="personal_number">{t('register.form1.tax')}</label>
                                            <Form.Item
                                                className={cx('form-group')}
                                                name="personal_number"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Mã số thuế không được để trống',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className={cx('input-3')}
                                                    placeholder={t('text.enter_tax_code')}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('stall-details')}>
                                    <h3>{t('text.Details')}</h3>
                                    <div className={cx('stall-form-item')}>
                                        <div className={cx('stall-form-item-top')}>
                                            <div className={cx('form-right')}></div>
                                            <div className={cx('form-left')}></div>
                                        </div>
                                        <div className={cx('stall-form-item-bottom')}>
                                            <div className={cx('form-bottom-group')}>
                                                <label htmlFor="des">{t('text.description')}</label>
                                                <Form.Item
                                                    className={cx('form-group')}
                                                    name="des"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Mô tả không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <Input.TextArea
                                                        className={cx('input-textarea')}
                                                        placeholder={t('text.enter_description')}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="cities"
                                                    // label="Tỉnh/Thành phố"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Tên Tỉnh/Thành phố không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        className={cx('select-group')}
                                                        placeholder={t('text.province/city')}
                                                        onChange={handleChangeCity}
                                                    >
                                                        {allCities.map((item) => (
                                                            <Option key={item.id} value={item.id} ghn_id={item.ghn_id}>
                                                                {item.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    name="district"
                                                    // label="Quận/Huyện"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Tên Quận/Huyện không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        className={cx('select-group')}
                                                        placeholder={t('text.district')}
                                                        onChange={handleChangeDistrict}
                                                    >
                                                        {listDistricts.map((item) => (
                                                            <Option key={item.id} value={item.id} ghn_id={item.ghn_id}>
                                                                {item.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    name="ward"
                                                    // label="Xã/Phường"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Tên Xã/Phường không được để trống',
                                                        },
                                                    ]}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Select
                                                        className={cx('select-group')}
                                                        placeholder={t('text.wards')}
                                                        onChange={handleChangeWards}
                                                    >
                                                        {listWards.map((item) => (
                                                            <Option
                                                                className={cx('option-address')}
                                                                key={item.id}
                                                                value={item.id}
                                                                ghn_id={item.ghn_id}
                                                            >
                                                                {item.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('image-desc')}>
                                    <span className={cx('title-image-desc')}>
                                        <Space
                                            direction="vertical"
                                            style={{
                                                width: '100%',
                                            }}
                                            size="large"
                                        >
                                            <Upload
                                                multiple
                                                listType="picture"
                                                showUploadList={{ showRemoveIcon: true }}
                                                accept=".png,.jpg"
                                                maxCount={1}
                                                onChange={handleUploadImage}
                                                beforeUpload={(file) => {
                                                    console.log({ file });
                                                    return false;
                                                }}
                                                onRemove={() =>
                                                    setStoreData({
                                                        ...storeData,
                                                        image_url: '',
                                                    })
                                                }
                                            >
                                                <Button icon={<UploadOutlined />}>Upload Images</Button>
                                            </Upload>
                                        </Space>
                                    </span>
                                </div>
                                <div className={cx('action-submit')}>
                                    <button type="submit">{t('text.create_store')}</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateBusiness;
