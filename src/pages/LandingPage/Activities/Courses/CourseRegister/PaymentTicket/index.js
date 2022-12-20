import { Radio, Space } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PaymentTicket.scss';

const PaymentTicket = ({ id, quantityRegis, courseData, setPaymentMethod, setInforReceiveTicket }) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleChangeInfor = (e) => {
        setInforReceiveTicket((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    if (searchParams.get('key') === 'payment' && quantityRegis === 0) {
        navigate(`/course-register/${id}`);
    }

    const handleChangePayment = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="payment-ticket">
            {/* <div className="ticket-recipient-group">
                <div className="payment-ticket__header">
                    <h2 className="payment-ticket__title">THÔNG TIN NGƯỜI NHẬN VÉ</h2>
                </div>
                <div className="payment-ticket__content">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="contact_name">
                                    Tên <span>*</span>
                                </label>
                                <input
                                    autoComplete="false"
                                    name="contact_name"
                                    placeholder="Nhập tên"
                                    onChange={handleChangeInfor}
                                ></input>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="address">
                                    Địa chỉ <span>*</span>
                                </label>
                                <input
                                    autoComplete="false"
                                    name="address"
                                    placeholder="Nhập họ"
                                    onChange={handleChangeInfor}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email <span>*</span>
                                </label>
                                <input
                                    autoComplete="false"
                                    name="email"
                                    placeholder="Nhập email"
                                    onChange={handleChangeInfor}
                                ></input>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="phone">
                                    Điện thoại <span>*</span>
                                </label>
                                <input
                                    autoComplete="false"
                                    name="phone"
                                    placeholder="Nhập số điện thoại"
                                    onChange={handleChangeInfor}
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="payment-method">
                <h3 className="title">HÌNH THỨC THANH TOÁN</h3>
                <div className="payment-detail">
                    <Radio.Group onChange={handleChangePayment} defaultValue={0}>
                        <Space direction="vertical">
                            {courseData.course_type !== 1 ? (
                                <Radio value={0}>
                                    <span>Miễn phí - Nhận vé qua email</span>
                                </Radio>
                            ) : (
                                <Radio value={1}>
                                    <span>Thanh toán qua ONEPAY</span>
                                </Radio>
                            )}
                        </Space>
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
};

export default PaymentTicket;
