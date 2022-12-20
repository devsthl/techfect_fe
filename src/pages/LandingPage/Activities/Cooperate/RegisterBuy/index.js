import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartApi from '~/api/Cart/cartApi';
import images from '~/assets/images/home/header';
import { getAllCities, getDistrictsById, getWardsById, setDataWard } from '~/store/CustomerProfile/customerSlice';
import './RegisterBuy.scss';

const { Option } = Select;

const RegisterBuy = () => {
    const dispatch = useDispatch();
    const { allCities, listDistricts, listWards, addressById, message } = useSelector((state) => state.customerReducer);

    const [form] = Form.useForm();
    const [paymentData, setPaymentData] = useState({
        contact_name: '',
        address: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        dispatch(getAllCities());
    }, [dispatch]);

    const [paymentMethod, setPaymentMethod] = useState('');

    const handleChangePaymentData = (e) => {
        setPaymentData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmitPayment = () => {};

    const validateMessages = {
        required: '${label} không được để trống!',
        types: {
            email: '${label} không đúng định dạng!',
            number: '${label} không đúng định dạng!',
        },
    };

    const handleChangeCity = (value, record) => {
        dispatch(getDistrictsById(value));
        form.setFieldValue('district', undefined);
        form.setFieldValue('ward', undefined);
        dispatch(setDataWard());
    };

    const handleChangeDistrict = (value, record) => {
        dispatch(getWardsById(value));
        form.setFieldValue('ward', undefined);
    };

    console.log('ward', listWards);

    return (
        <div className="payment-package-wrapper" id="payment-package">
            <div className="inner">
                <div className="content-main">
                    <div className="content-top">
                        <div className="left-content">
                            <h2>Thông tin người đăng ký</h2>
                            <Form form={form} onFinish={handleSubmitPayment} validateMessages={validateMessages}>
                                <Form.Item
                                    name="name"
                                    label="Họ tên"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập tên" />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        { type: 'email' },
                                    ]}
                                >
                                    <Input placeholder="Nhập email" />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[
                                        {
                                            required: true,
                                            // whitespace: true,
                                            // type: 'number',
                                        },
                                        {
                                            pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                                            message: 'Số điện thoại không đúng định dạng',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập số điện thoại" />
                                </Form.Item>

                                <Form.Item
                                    name="address-details"
                                    label="Địa chỉ cụ thể"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input className="input-7" placeholder="Nhập địa chỉ cụ thể " />
                                </Form.Item>

                                <Form.Item
                                    name="cities"
                                    label="Tỉnh/Thành phố"
                                    rules={[
                                        {
                                            required: true,
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

                                <Form.Item
                                    name="district"
                                    label="Quận/Huyện"
                                    rules={[
                                        {
                                            required: true,
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

                                <Form.Item
                                    name="ward"
                                    label="Xã/Phường"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Select className="select-group" placeholder="Xã/Phường">
                                        {listWards.map((item) => (
                                            <Option key={item.id} value={item.id} ghn_id={item.ghn_id}>
                                                {item.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Thanh toán
                                </Button>
                            </Form>
                        </div>
                        <div className="right-content">
                            <div className="course-details">
                                <h2>Thông tin gói hợp tác</h2>
                                <div className="image-title">
                                    <img src="https://www.w3schools.com/w3css/img_lights.jpg" alt="" />
                                    <div className="right-group">
                                        <span className="course-name">
                                            Đào tạo Luật sư tranh chấp thương mại điện tử, hành chính, cao cấp
                                        </span>
                                        <span className="course-title">1.500.000 VNĐ</span>
                                    </div>
                                </div>
                                <ul>
                                    Quyền lợi:
                                    <li>Đăng khóa học</li>
                                    <li>Giao dịch sản phẩm không giới hạn</li>
                                </ul>
                            </div>
                            <div className="payment-method">
                                <h2>Phương thức thanh toán</h2>
                                <div className="payment-card" onClick={() => setPaymentMethod('credit-card')}>
                                    <div className="payment-card__left">
                                        <img src={images.card} alt="" />
                                        <span>Thanh toán bằng thẻ Tín dụng/Ghi nợ</span>
                                    </div>
                                    {paymentMethod === 'credit-card' ? (
                                        <FontAwesomeIcon color="red" icon={faCheck} />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="payment-card" onClick={() => setPaymentMethod('onepay')}>
                                    <div className="payment-card__left">
                                        <img src={images.onePay} alt="" />
                                        <span>Thanh toán OnePay</span>
                                    </div>
                                    {paymentMethod === 'onepay' ? (
                                        <FontAwesomeIcon color="red" icon={faCheck} />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="content-bottom">
                        <button type="submit">Thanh toán</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default RegisterBuy;
