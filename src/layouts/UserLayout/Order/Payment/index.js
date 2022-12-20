import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input, Select } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import images from '~/assets/images/home/header';
import './Payment.scss';

const { Option } = Select;

const Payment = () => {
    const { t } = useTranslation();
    const [paymentData, setPaymentData] = useState({
        contact_name: '',
        address: '',
        email: '',
        phone: '',
    });

    const handleChangePaymentData = (e) => {
        setPaymentData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmitPayment = () => {};

    return (
        <div className="wrapper" id="payment-wrapper">
            <div className="inner">
                <div className="header-main">
                    <div className="header-title">
                        <span>{t('text.Order')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Khóa học đã tham gia</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Thanh toán</span>
                    </div>
                </div>
                <div className="content-main">
                    <div className="content-top">
                        <div className="left-content">
                            <h2>{t('text.Register_information')}</h2>
                            <form onSubmit={handleSubmitPayment}>
                                <div className="form-left-group">
                                    <label htmlFor="name">Họ và tên</label>
                                    <Form.Item className="form-group" name="group-name">
                                        <Input
                                            className="input-7"
                                            id="name"
                                            name="contact_name"
                                            placeholder="Nhập tên"
                                            onChange={handleChangePaymentData}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-left-group">
                                    <label htmlFor="email">Email</label>
                                    <Form.Item className="form-group" name="email">
                                        <Input
                                            className="input-7"
                                            id="email"
                                            name="email"
                                            placeholder="Nhập email"
                                            onChange={handleChangePaymentData}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-left-group">
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <Form.Item className="form-group" name="phone">
                                        <Input
                                            className="input-7"
                                            id="phone"
                                            name="phone"
                                            placeholder="Nhập số điện thoại"
                                            onChange={handleChangePaymentData}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-left-group ">
                                    <label htmlFor="address">Địa chỉ cụ thế</label>
                                    <Form.Item className="form-group" name="group-name">
                                        <Input
                                            className="input-7"
                                            id="address"
                                            placeholder="Nhập địa chỉ cụ thể "
                                            onChange={handleChangePaymentData}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-right-group first">
                                    <label htmlFor="address-input">Tỉnh/Thành phố</label>
                                    <Form.Item className="form-group" name="phone">
                                        <Select
                                            className="select-group"
                                            placeholder="Tỉnh/Thành phố"
                                            // onChange={handleChange}
                                        >
                                            <Option value="jack">Hà Nội</Option>
                                            <Option value="lucy">Hải phòng</Option>
                                        </Select>
                                    </Form.Item>
                                </div>

                                <div className="form-right-group">
                                    <label htmlFor="address-input">Quận/Huyện</label>
                                    <Form.Item className="form-group" name="phone">
                                        <Select
                                            className="select-group"
                                            placeholder="Quận/Huyện"
                                            // onChange={handleChange}
                                        >
                                            <Option value="jack">Quận Tây Hồ</Option>
                                            <Option value="lucy">Quận Đống Đa</Option>
                                        </Select>
                                    </Form.Item>
                                </div>

                                <div className="form-right-group">
                                    <label htmlFor="address-input">Xã/Phường</label>
                                    <Form.Item className="form-group" name="phone">
                                        <Select
                                            className="select-group"
                                            placeholder="Xã/Phường"
                                            // onChange={handleChange}
                                        >
                                            <Option value="jack">Xuân La</Option>
                                            <Option value="lucy">Láng Hạ</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </form>
                        </div>
                        <div className="right-content">
                            <div className="course-details">
                                <h2>Thông tin khóa học</h2>
                                <div className="image-title">
                                    <img src="https://www.w3schools.com/w3css/img_lights.jpg" alt="" />
                                    <div className="right-group">
                                        <span className="course-name">
                                            Đào tạo Luật sư tranh chấp thương mại điện tử, hành chính, cao cấp
                                        </span>
                                        <span className="course-title">1.500.000 VNĐ</span>
                                    </div>
                                </div>
                                <p className="post-date">
                                    <label>Ngày đăng: </label>
                                    <span>05/09/2022</span>
                                </p>
                                <p className="object">
                                    <label>Đối tượng: </label>
                                    <span>Nam, nữ</span>
                                </p>
                                <p className="post-date">
                                    <label>Thời gian học: </label>
                                    <span>6 tháng</span>
                                </p>
                                <p className="post-date">
                                    <label>Thành viên: </label>
                                    <span>8-10</span>
                                </p>
                            </div>
                            <div className="payment-method">
                                <h2>Phương thức thanh toán</h2>
                                <div className="payment-card">
                                    <img src={images.card} alt="" />
                                    <span>Thanh toán bằng thẻ Tín dụng/Ghi nợ</span>
                                </div>
                                <div className="payment-card">
                                    <img src={images.onePay} alt="" />
                                    <span>Thanh toán OnePay</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-bottom">
                        <button>Thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
