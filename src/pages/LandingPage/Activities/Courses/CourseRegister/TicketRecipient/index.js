import { faEnvelope, faPhone, faUser, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import coursesApi from '~/api/CourseApi/coursesApi';
import onePayApi from '~/api/Onepay/onepay';
import formatCash from '~/utils/formatCash';
import './TicketRecipient.scss';

const TicketRecipient = ({ quantityRegis, listSubcribers, courseData, paymentMethod, inforReceiveTicket }) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));
    console.log('inforReceiveTicket', inforReceiveTicket);
    return (
        <div className="ticket-recipient">
            <div className="ticket-top">
                <div className="recipient-group">
                    <h3 className="title">THÔNG TIN NGƯỜI NHẬN VÉ</h3>
                    <div className="recipient-detail">
                        <div className="form-group">
                            <div className="left-detail">
                                <FontAwesomeIcon icon={faUser} />
                                <label>Họ tên</label>
                            </div>
                            <div className="right-detail">{user.full_name}</div>
                        </div>
                        <div className="form-group">
                            <div className="left-detail">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <label>Email</label>
                            </div>
                            <div className="right-detail">{user.email}</div>
                        </div>
                        <div className="form-group">
                            <div className="left-detail">
                                <FontAwesomeIcon icon={faPhone} />
                                <label>Số điện thoại</label>
                            </div>
                            <div className="right-detail">{user.phone}</div>
                        </div>
                    </div>
                </div>
                <div className="payment-method">
                    <h3 className="title">HÌNH THỨC THANH TOÁN</h3>
                    <div className="payment-detail">
                        <span>Miễn phí - Nhận vé qua email</span>
                    </div>
                </div>
                <div className="booking-detail">
                    <h3 className="title">THÔNG TIN ĐẶT VÉ</h3>
                    <div className="form-group">
                        <div className="left-detail">Loại vé</div>
                        <div className="right-detail">Số lượng</div>
                    </div>
                    <div className="form-detail">
                        <div className="left-detail">Vé mời tham gia (vé có giới hạn, vui lòng đăng ký sớm)</div>
                        <div className="right-detail">{quantityRegis}</div>
                    </div>
                </div>
            </div>
            <div className="total">
                <label>Tổng cộng</label>
                <span>{formatCash((courseData.price * quantityRegis).toString())} đ</span>
            </div>
            <div className="action-btn">
                <button
                    onClick={async () => {
                        if (searchParams.get('key') === null) {
                            setSearchParams('key=step-question-form');
                        }
                        if (searchParams.get('key') === 'step-question-form') {
                            setSearchParams('key=payment');
                        }
                        if (searchParams.get('key') === 'payment') {
                            const data = {
                                course_id: parseInt(courseData.id),
                                type: 4,
                                // phone: inforReceiveTicket.phone,
                                payment_method: paymentMethod,
                                // email: inforReceiveTicket.email,
                                // address: inforReceiveTicket.address,
                                total_price: courseData.price * quantityRegis,
                                list_details: listSubcribers.map((item) => {
                                    return {
                                        course_id: parseInt(courseData.id),
                                        contact_name: item.contact_name,
                                        address: item.address,
                                        email: item.email,
                                        phone: item.phone,
                                    };
                                }),
                            };

                            console.log('data cousrse', data);

                            const res = await coursesApi.registerForMultiPeople(data);
                            console.log('res', res);
                            // if (res.message === 'Error') {
                            //     message.error('Đăng ký không thành công');
                            // }
                            // if (res?.status?.message === 'MAIL_EXIST_YOU_JOINED') {
                            //     message.error('Mail đã được đăng ký');
                            // }
                            if (res.id !== undefined) {
                                if (paymentMethod === 1 && res.id !== undefined) {
                                    const dataCheckout = {
                                        order: {
                                            Id: res?.id.toString(),
                                            amount: courseData.price * quantityRegis,
                                            customerId: user.id.toString(),
                                            type: 4,
                                        },
                                        transactionType: 'domestic',
                                    };
                                    const resOnepay = await onePayApi.checkoutOnePay(dataCheckout);
                                    console.log('resOnepay', resOnepay);
                                    if (resOnepay.message === 'error') {
                                        message.error(t('text.Payment_failed'));
                                    } else {
                                        window.location.href = resOnepay.url;
                                    }
                                }
                            }
                        }
                    }}
                >
                    Tiếp tục
                </button>
            </div>
        </div>
    );
};

export default TicketRecipient;
