import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateConsultant.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, Select } from 'antd';
import { getAllEnterprise } from '~/store/Enterprise/enterpriseSlice';
import enterpriseApi from '~/api/Enterprise/EnterpriseApi';
import { useDispatch } from 'react-redux';
import ToastPopup, { notifyError, notifySuccess, notifyWarning } from '~/toast/toast';
import { isValid, validate } from '~/utils/validate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAllCities } from '~/store/CustomerProfile/customerSlice';
import { getAllField } from '~/store/Store/storeSlice';
const cx = classNames.bind(styles);
const CreateConsultant = () => {
    const { t } = useTranslation();
    let formData = new FormData();
    const [, setFiles] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allCities } = useSelector((state) => state.customerReducer)
    const { listField } = useSelector((state) => state.storesReducer)
    const [enterpriseData, setEnterpriseData] = useState({
        name: '',
        phone: '',
        address: '',
        tax_code: '',
        address_register: '',
        image_url: [],
        city_id: '',
        field_id: ''
    });
    useEffect(() => {
        dispatch(getAllEnterprise());
        dispatch(getAllCities())
        dispatch(getAllField())
    }, 5000);
    const handleSelectChange = (selectOption) => {
        // console.log(selectOption);
        setEnterpriseData({
            ...enterpriseData,
            city_id: selectOption
        });
        console.log("city: ", enterpriseData);
        console.log("city2: ", selectOption);
    };
    const handleSelectChangeFiedls = (selectOption) => {
        setEnterpriseData({
            ...enterpriseData,
            field_id: selectOption
        })
        console.log("field: ", enterpriseData);
        console.log("field2: ", selectOption);

    }
    const handleFilesChange = async (e) => {
        setFiles(e.target.files);
        for (const key of Object.keys(e.target.files)) {
            formData.append('files', e.target.files[key]);
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData);
            setFiles([]);
            setEnterpriseData({
                ...enterpriseData,
                image_url: enterpriseData.image_url.concat(
                    res.data.url.map((image) => {
                        return {
                            url: image,
                        };
                    }),
                ),
            });
            notifySuccess('Upload file thành công');
        } catch (error) {
            notifyError('Upload file không thành công');
        }
    };
    const isEmpty = (
        <div className="is-empty">
            <h3>Hiện tại chưa có ảnh</h3>
            <input
                type="file"
                multiple
                // accept="img/*"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFilesChange}
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                {t('register.form1.uploadimage')}
            </label>
        </div>
    );
    const removeImage = (position) => {
        setEnterpriseData({
            ...enterpriseData,
            image_url: enterpriseData.image_url.filter((_, index) => position !== index),
        });
    };
    const isNotEmpty = (arr) => {
        return (
            <div className="image-container">
                <div className="big-image">
                    <div className="delete-image" onClick={() => removeImage(0)}>
                        X
                    </div>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${arr[0].url}`}
                        alt="big"
                        style={{ width: '240px', height: '240px' }}
                    />
                </div>
                <div className="small-image-container">
                    {arr.map((item, index) => {
                        if (index !== 0) {
                            return (
                                <div
                                    className="small-image"
                                    key={item.url}
                                    style={{
                                        backgroundImage: `url(${process.env.REACT_APP_API_URL}/${item.url})`,
                                    }}
                                >
                                    <div className="delete-image" onClick={() => removeImage(index)}>
                                        X
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div className="small-image upload">
                        <input
                            className="item__input"
                            type="file"
                            id="file-upload"
                            multiple
                            accept="image/*"
                            onChange={handleFilesChange}
                        />
                        <label htmlFor="file-upload">
                            <h4>Thêm ảnh</h4>
                        </label>
                    </div>
                </div>
            </div>
        );
    };
    const handleSave = async () => {
        try {
            const x = validate('enterprise', enterpriseData);
            if (!isValid('enterprise', x)) {
                Object.values(x).forEach((error) => {
                    if (error) {
                        notifyError(error);
                    }
                });
            } else {
                await enterpriseApi.create({
                    ...enterpriseData,
                    name: enterpriseData.name,
                    phone: enterpriseData.phone,
                    address: enterpriseData.address,
                    city_id: enterpriseData.city_id,
                    field_id: enterpriseData.field_id,
                    image_url: enterpriseData.image_url.map((item) => {
                        if (item.url) return item.url;
                        return item;
                    }),
                });
                notifySuccess('Thêm nhà tư vấn thành công');
                setTimeout(() => {
                    navigate('/consultant/list-consultant');
                }, 2000);
            }
        } catch (error) {
            notifyError(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <ToastPopup />
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.consultant')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.create_consultant')}</span>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('form-wrapper')}>
                        <div className={cx('upload-avatar')}></div>
                        <Form className={cx('form-inner')}>
                            <div className={cx('bottom-form')}>
                                <div className={cx('form-left')}>
                                    <div className={cx('form-left-group')}>
                                        <label htmlFor="name-input">{t('text.Consultant_name')}</label>
                                        <Form.Item className={cx('form-group')} name="group-name">
                                            <Input
                                                className={cx('input-7')}
                                                id="name-input"
                                                placeholder={t('text.enter_name')}
                                                onChange={(e) =>
                                                    setEnterpriseData({
                                                        ...enterpriseData,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('form-left-group')}>
                                        <label htmlFor="phone-input">{t('register.form1.phone')}</label>
                                        <Form.Item className={cx('form-group')} name="phone">
                                            <Input
                                                className={cx('input-7')}
                                                id="phone-input"
                                                placeholder={t('text.enter_phone_number')}
                                                onChange={(e) =>
                                                    setEnterpriseData({
                                                        ...enterpriseData,
                                                        phone: e.target.value,
                                                    })
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('form-left-group')}>
                                        <label htmlFor="address-input">{t('text.specific_address')}</label>
                                        <Form.Item className={cx('form-group')} name="address">
                                            <Input
                                                className={cx('input-7')}
                                                id="address-input"
                                                placeholder={t('text.enter_address')}
                                                onChange={(e) =>
                                                    setEnterpriseData({
                                                        ...enterpriseData,
                                                        address: e.target.value,
                                                    })
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={cx('form-right')}>
                                    <div className={cx('form-right-group')}>
                                        <label htmlFor="address-input">{t('register.form1.tax')}</label>
                                        <Form.Item className={cx('form-group')} name="tax_code">
                                            <Input
                                                className={cx('input-3')}
                                                id="tax-input"
                                                placeholder={t('text.enter_tax_code')}
                                                onChange={(e) =>
                                                    setEnterpriseData({
                                                        ...enterpriseData,
                                                        tax_code: e.target.value,
                                                    })
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('form-right-group')}>
                                        <label htmlFor="website-input">{t('text.Tax_code_registration_address')}</label>
                                        <Form.Item className={cx('form-group')} name="website">
                                            <Input
                                                className={cx('input-3')}
                                                id="website-input"
                                                placeholder={t('text.enter_address')}
                                                onChange={(e) =>
                                                    setEnterpriseData({
                                                        ...enterpriseData,
                                                        address_register: e.target.value,
                                                    })
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('choose-city-fields')}>
                                        <div className="city">
                                            <label className="item__label" htmlFor="">
                                                Thành phố
                                            </label>
                                            <br />

                                            <Select
                                                value={allCities.store}
                                                placeholder="Chọn thành phố"
                                                options={allCities.map((item, index) => {
                                                    return {
                                                        value: item.id,
                                                        label: item.name,
                                                    };
                                                })}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                        <div className="fields">
                                            <label className="item__label" htmlFor="">
                                                Lĩnh vực
                                            </label>
                                            <br />
                                            <Select
                                                value={listField.store}
                                                placeholder="Chọn lĩnh vực"
                                                options={listField.map((item, index) => {
                                                    return {
                                                        value: item.id,
                                                        label: item.name,
                                                    };
                                                })}
                                                onChange={handleSelectChangeFiedls}
                                            />
                                        </div>
                                    </div>
                                    <label
                                        htmlFor="file-upload"
                                        className={cx('file-upload')}
                                        style={{
                                            color: 'red',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {enterpriseData.image_url === null || enterpriseData.image_url?.length === 0
                                            ? isEmpty
                                            : isNotEmpty(enterpriseData.image_url)}
                                    </label>
                                </div>
                            </div>
                            <div className={cx('action-submit')}>
                                <button className={cx('btn-submit')} type="submit" onClick={handleSave}>
                                    {t('text.create_consultant')}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateConsultant;
