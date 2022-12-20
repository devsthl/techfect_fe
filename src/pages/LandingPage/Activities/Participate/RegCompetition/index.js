import React from 'react';
import './RegCompetition.scss';
import ButtonComponent from '~/components/layouts/components/Button';
import { useState } from 'react';
import { Form, Input, message } from 'antd';
import eventsApi from '~/api/eventsApi';
import { useTranslation } from 'react-i18next';

const RegCompetition = ({ visible, idCompetition }) => {
    const { t } = useTranslation();
    console.log('idCompetition', idCompetition);
    const [participate, setParticipate] = useState({
        contact_name: '',
        phone: '',
        email: '',
        address: '',
        type: 3,
    });

    const validateMessages = {
        required: '${label} không được để trống!',
        types: {
            email: '${label} không đúng định dạng!',
            number: '${label} không đúng định dạng!',
        },
    };

    const handleChangeParticipate = (e) => {
        setParticipate((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleExit = () => {
        visible(false);
    };

    const handleSubmitRegEvent = async () => {};

    const onFinish = async (values) => {
        console.log('values', values);
        const newData = {
            contact_name: values.contact_name.trim(),
            phone: values.phone.trim(),
            email: values.email.trim(),
            address: values.address.trim(),
            payment_method: '0',
            start_date: idCompetition.start_time,
            end_date: idCompetition.end_time,
            type: 5,
            list_details: [
                {
                    event_id: idCompetition.id,
                },
            ],
        };

        console.log('newData', newData);

        const res = await eventsApi.registerEvent(newData);
        if (res.message === 'error') {
            message.error(t('text.register_failed'));
        }
        if (res.message('error' && res.errors.message === 'MAIL_EXIST_YOU_JOINED')) {
            message.error(t('text.account_exists'));
        }
        if (res.message === 'Success') {
            message.success(t('text.registration_success'));
        }
    };

    return (
        <div className="reg-competition-wrap">
            <Form
                onFinish={onFinish}
                style={{
                    width: '100%',
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    className="detail-name"
                    name="contact_name"
                    label="Họ và tên"
                    rules={[
                        {
                            required: true,
                            message: 'Họ và tên không được để trống',
                        },
                    ]}
                    style={{
                        width: '100%',
                    }}
                >
                    {/* <Input id="name" name="contact_name" placeholder="Nhập tên" onChange={handleChangeParticipate} /> */}
                    <Input placeholder="Nhập tên" />
                </Form.Item>
                {/* <label htmlFor="phone">Số điện thoại</label> */}
                <Form.Item
                    className="detail-phone"
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            // type: 'number',
                        },
                        { pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g, message: 'Số điện thoại không đúng định dạng' },
                    ]}
                >
                    <Input
                        style={{
                            width: '100%',
                        }}
                        // id="phone"
                        // name="phone"
                        placeholder="Nhập số điện thoại"
                        // onChange={handleChangeParticipate}
                    />
                </Form.Item>
                <Form.Item
                    className="detail-phone"
                    name="address"
                    label="Địa chỉ"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        // id="address"
                        // name="address"
                        placeholder="Nhập địa chỉ"
                        // onChange={handleChangeParticipate}
                    />
                </Form.Item>
                <Form.Item
                    className="detail-phone"
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                        { type: 'email' },
                    ]}
                >
                    <Input
                        // name="email"
                        placeholder="Nhập địa chỉ E-mail"
                        // onChange={handleChangeParticipate}
                    />
                </Form.Item>
                <div className="register-btn">
                    <ButtonComponent outline small2 onClick={handleExit}>
                        Trở lại
                    </ButtonComponent>
                    <ButtonComponent primary small2 onClick={handleSubmitRegEvent}>
                        Đăng ký
                    </ButtonComponent>
                </div>
            </Form>
        </div>
    );
};

export default RegCompetition;
