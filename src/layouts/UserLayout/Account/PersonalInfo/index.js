import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PersonalInfo.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import images from '~/assets/images/home/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Select, DatePicker, Form, Input, Spin } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { editMyProfile, getMyProfile } from '~/store/CustomerProfile/customerSlice';

const Option = { Select };

const cx = classNames.bind(styles);

const dateFormat = 'YYYY-MM-DD';

const PersonalInfo = () => {
    const dispatch = useDispatch();
    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(getMyProfile());
    }, [dispatch]);

    const { myProfile, loading } = useSelector((state) => state.customerReducer);

    const [dataProfile, setDataProfile] = useState({
        full_name: myProfile.full_name,
        date_of_birth: myProfile.date_of_birth,
        email: myProfile.email,
        phone: myProfile.phone,
        gender: myProfile.gender,
    });

    useEffect(() => {
        setDataProfile({
            full_name: myProfile.full_name,
            date_of_birth: myProfile.date_of_birth,
            email: myProfile.email,
            phone: myProfile.phone,
            gender: myProfile.gender,
        });
    }, [myProfile]);

    const getDataInput = (e) => {
        setDataProfile((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const [disableInput, setDisableInput] = useState({
        personalName: true,
        personalEmail: true,
        personalPhone: true,
    });

    const suffix = (value) => {
        return (
            <>
                <FontAwesomeIcon
                    onClick={() => {
                        setDisableInput((prevState) => {
                            return {
                                ...prevState,
                                [value]: false,
                            };
                        });
                    }}
                    icon={faPenToSquare}
                />
            </>
        );
    };

    const handleSubmit = async () => {
        dispatch(
            editMyProfile({
                id: user.id,
                data: dataProfile,
            }),
        );
    };

    return (
        <div className="wrapper" id="personal-info">
            <Spin spinning={loading}>
                <div className={cx('inner')}>
                    <div className={cx('title')}>
                        <span>Thông tin cá nhân</span>
                    </div>
                    <div className={cx('content-main')}>
                        <div className={cx('personal-avatar')}>
                            <div className={cx('avatar-group')}>
                                <img src={images.avatarUser} alt="Avatar" />
                                {/* <PlusCircleOutlined /> */}
                            </div>
                        </div>
                        <div className={cx('personal-form')}>
                            <Form>
                                <div className={cx('form-group')}>
                                    <label htmlFor="full_name">Họ tên:</label>
                                    <div className={cx('input-group')}>
                                        <Form.Item>
                                            <Input
                                                defaultValue={myProfile.full_name}
                                                key={myProfile.id}
                                                disabled={disableInput.personalName}
                                                id="full_name"
                                                name="full_name"
                                                placeholder="Nhập họ tên"
                                                type="text"
                                                suffix={suffix('personalName')}
                                                onChange={(e) => getDataInput(e)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="">Ngày sinh:</label>
                                    <DatePicker
                                        placeholder="Ngày sinh"
                                        format={dateFormat}
                                        defaultValue={
                                            myProfile.date_of_birth === undefined
                                                ? ''
                                                : moment(myProfile.date_of_birth, dateFormat)
                                        }
                                        key={myProfile.id}
                                        onChange={(date, dateString, id) => {
                                            setDataProfile((prevState) => {
                                                return {
                                                    ...prevState,
                                                    date_of_birth: dateString,
                                                };
                                            });
                                        }}
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="email">Email:</label>
                                    <div className={cx('input-group')}>
                                        <Form.Item>
                                            <Input
                                                key={myProfile.id}
                                                defaultValue={myProfile.email}
                                                disabled={disableInput.personalEmail}
                                                id="email"
                                                name="email"
                                                placeholder="Nhập email"
                                                type="text"
                                                suffix={suffix('personalEmail')}
                                                onChange={(e) => getDataInput(e)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="phone">Số điện thoại:</label>
                                    <div className={cx('input-group')}>
                                        <Form.Item>
                                            <Input
                                                key={myProfile.id}
                                                defaultValue={myProfile.phone}
                                                disabled={disableInput.personalPhone}
                                                id="phone"
                                                name="phone"
                                                placeholder="Nhập số điện thoại"
                                                type="text"
                                                suffix={suffix('personalPhone')}
                                                onChange={(e) => getDataInput(e)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="">Giới tính:</label>
                                    <Form.Item name="gender">
                                        <Select
                                            allowClear
                                            showSearch
                                            placeholder="Giới tính"
                                            defaultValue={myProfile.gender === undefined ? undefined : myProfile.gender}
                                            key={myProfile.id}
                                            onChange={(value) =>
                                                setDataProfile((prevState) => {
                                                    return {
                                                        ...prevState,
                                                        gender: value,
                                                    };
                                                })
                                            }
                                        >
                                            <Option key={1} value={1}>
                                                Nam
                                            </Option>
                                            <Option key={2} value={2}>
                                                Nữ
                                            </Option>
                                            <Option key={3} value={3}>
                                                Khác
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="submit-action">
                                    <button className="btn-submit" type="submit" onClick={handleSubmit}>
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default PersonalInfo;
