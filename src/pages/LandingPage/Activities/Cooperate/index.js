import { message, Modal, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import onePayApi from '~/api/Onepay/onepay';
import packageApi from '~/api/Package/packageApi';
import { getAllPackage } from '~/store/Package/packageSlice';
import formatCash from '~/utils/formatCash';
import './Cooperate.scss';
import RegisterBuy from './RegisterBuy';

const Cooperate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [colorYear, setColorYear] = useState(false);
    const [showModalRegisterBuy, setShowModalRegisterBuy] = useState(false);
    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

    const packageDetail = localStorage.getItem('package') === null ? null : JSON.parse(localStorage.getItem('package'));

    console.log('packageDetail', packageDetail === 'Bạn chưa đăng kí gói nào');
    const { listPackage } = useSelector((state) => state.packageReducer);

    useEffect(() => {
        dispatch(getAllPackage());
    }, [dispatch]);

    const handleRegPackage = async (item, used) => {
        console.log('used', used);
        if (used === undefined) {
            if (packageDetail === 'Bạn chưa đăng kí gói nào') {
                const data = {
                    cooperation_package_id: item.id,
                };
                const res = await packageApi.registerPackage(data);
                console.log('res', res);
                if (res.id !== undefined) {
                    const dataCheckout = {
                        order: {
                            Id: res?.id.toString(),
                            amount: 30000,
                            customerId: user.id.toString(),
                            type: 2,
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
            } else {
                // const data = {
                //     cooperation_package_id: item.id,
                // };
                // const res = await packageApi.changePackage(data);
                // console.log('res change', res);
            }
        }
        if (used === 'used') {
            message.info('Bạn đang sử dụng gói này');
        }
    };

    return (
        <div className="cooperate-wrapper">
            <div className="inner">
                <div className="cooperate__content-main">
                    <div className="investment-funds-group">
                        <div className="cooperate__title">
                            <h1>{t('text.Connectup_Investment_Fund')}</h1>
                            <span>{t('text.Choose_a_product')}</span>
                        </div>

                        <div className="month-year-btn-group">
                            {/* <Tabs variant="unstyled">
                                <TabList>
                                    <Tab
                                        className="btn-month"
                                        style={colorYear ? { color: '#25aae1' } : {}}
                                        _selected={{ color: 'white', bg: '#25aae1' }}
                                        onClick={() => setColorYear(false)}
                                    >
                                        Tháng
                                    </Tab>
                                    <Tab
                                        className="btn-year"
                                        style={colorYear ? {} : { color: '#25aae1' }}
                                        _selected={{ color: 'white', bg: '#25aae1' }}
                                        onClick={() => setColorYear(true)}
                                    >
                                        Năm
                                    </Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <p>one!</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>two!</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs> */}
                        </div>

                        <div className="investments-list">
                            {listPackage.map((item, index) => {
                                if (index <= 2) {
                                    if (packageDetail === 'Bạn chưa đăng kí gói nào') {
                                        return (
                                            <div className="investments-item">
                                                <div className="investments-image">
                                                    <img
                                                        src="https://www.readitbro.com/wp-content/uploads/2020/06/types-of-technology.jpg"
                                                        alt="Avatar"
                                                    ></img>
                                                    <span className="investments-funds-name">
                                                        {t('text.Connectup_member_Service')}
                                                    </span>
                                                </div>
                                                <div className="investments-details">
                                                    <div className="investments-details__content">
                                                        <span className="investments-details__title">
                                                            {t('text.Special_Offers')}
                                                        </span>
                                                        <ul>
                                                            <li>{t('text.courses_manage')}</li>
                                                            <li>{t('text.Post_product_to_store')}</li>
                                                            <li>{t('text.Attract_investors')}</li>
                                                            <li>{t('text.Join_national_events')}</li>
                                                            <li>{t('text.Join_ConnectUp_training_courses')}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="investments-details__bottom">
                                                        {/* <div className="package-details">
                                                      <span>1 tháng</span>
                                                  </div> */}
                                                        <div className="investments-details__price">
                                                            <span>{formatCash(item?.price.toString())}</span>/
                                                            <span>
                                                                {item.time_limit === 30
                                                                    ? `1 ${t('text.month')}`
                                                                    : item.time_limit === 180
                                                                    ? `6 ${t('text.month')}`
                                                                    : `1 ${t('text.year')}`}
                                                            </span>
                                                        </div>
                                                        <div className="investments-details__actions">
                                                            <Popconfirm
                                                                title="Are you sure you want to sign up?"
                                                                onConfirm={() => handleRegPackage(item)}
                                                            >
                                                                <button className="register-now">
                                                                    {t('login.register')}
                                                                </button>
                                                            </Popconfirm>

                                                            {/* <button className="show-details">Xem chi tiết</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (packageDetail !== 'Bạn chưa đăng kí gói nào') {
                                        return (
                                            <div className="investments-item">
                                                <div className="investments-image">
                                                    <img
                                                        src="https://www.readitbro.com/wp-content/uploads/2020/06/types-of-technology.jpg"
                                                        alt="Avatar"
                                                    ></img>
                                                    <span className="investments-funds-name">
                                                        {t('text.Connectup_member_Service')}
                                                    </span>
                                                </div>
                                                <div className="investments-details">
                                                    <div className="investments-details__content">
                                                        <span className="investments-details__title">
                                                            {t('text.Special_Offers')}
                                                        </span>
                                                        <ul>
                                                            <li>{t('text.courses_manage')}</li>
                                                            <li>{t('text.Post_product_to_store')}</li>
                                                            <li>{t('text.Attract_investors')}</li>
                                                            <li>{t('text.Join_national_events')}</li>
                                                            <li>{t('text.Join_ConnectUp_training_courses')}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="investments-details__bottom">
                                                        {/* <div className="package-details">
                                                      <span>1 tháng</span>
                                                  </div> */}
                                                        <div className="investments-details__price">
                                                            <span>{formatCash(item?.price.toString())}</span>/
                                                            <span>
                                                                {item.time_limit === 30
                                                                    ? `1 ${t('text.month')}`
                                                                    : item.time_limit === 180
                                                                    ? `6 ${t('text.month')}`
                                                                    : `1 ${t('text.year')}`}
                                                            </span>
                                                        </div>
                                                        <div className="investments-details__actions">
                                                            {item.id === packageDetail?.cooperation_package_id ? (
                                                                <>
                                                                    <Popconfirm
                                                                        disabled
                                                                        title="Are you sure you want to sign up?"
                                                                        onConfirm={() => handleRegPackage(item, 'used')}
                                                                    >
                                                                        <button disabled className="register-now">
                                                                            Registered
                                                                        </button>
                                                                    </Popconfirm>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Popconfirm
                                                                        title="Are you sure you want to sign up?"
                                                                        onConfirm={() => handleRegPackage(item)}
                                                                    >
                                                                        <button className="register-now">
                                                                            Upgrade
                                                                        </button>
                                                                    </Popconfirm>
                                                                </>
                                                            )}

                                                            {/* <button className="show-details">Xem chi tiết</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                } else {
                                    return <></>;
                                }
                            })}

                            {/* <div className="investments-item">
                                <div className="investments-image">
                                    <img
                                        src="https://www.readitbro.com/wp-content/uploads/2020/06/types-of-technology.jpg"
                                        alt="Avatar"
                                    ></img>
                                    <span className="investments-funds-name">Gói dịch vụ member Techfest</span>
                                </div>
                                <div className="investments-details">
                                    <div className="investments-details__content">
                                        <span className="investments-details__title">Ưu đãi</span>
                                        <ul>
                                            <li>Thêm/ sửa/ xóa bài viết</li>
                                            <li>Đăng sản phẩm lên gian hàng</li>
                                            <li>Thêm/ sửa/ xóa các khóa học đào tạo</li>
                                        </ul>
                                    </div>
                                    <div className="investments-details__bottom">
                                        <div className="investments-details__price">
                                            <span>10.000.000 VNĐ</span>/<span>6 Tháng</span>
                                        </div>
                                        <div className="investments-details__actions">
                                            <button
                                                className="register-now"
                                                onClick={() => navigate('/activities/cooperate/register')}
                                            >
                                                Đăng ký ngay
                                            </button>
                                            <button className="show-details">Xem chi tiết</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="investments-item">
                                <div className="investments-image">
                                    <img
                                        src="https://www.readitbro.com/wp-content/uploads/2020/06/types-of-technology.jpg"
                                        alt="Avatar"
                                    ></img>
                                    <span className="investments-funds-name">Gói dịch vụ member Techfest</span>
                                </div>
                                <div className="investments-details">
                                    <div className="investments-details__content">
                                        <span className="investments-details__title">Ưu đãi</span>
                                        <ul>
                                            <li>Thêm/ sửa/ xóa bài viết</li>
                                            <li>Đăng sản phẩm lên gian hàng</li>
                                            <li>Thêm/ sửa/ xóa các khóa học đào tạo</li>
                                        </ul>
                                    </div>
                                    <div className="investments-details__bottom">
                                        <div className="investments-details__price">
                                            <span>20.000.000 VNĐ</span>/<span>1 Năm</span>
                                        </div>
                                        <div className="investments-details__actions">
                                            <button
                                                className="register-now"
                                                onClick={() => navigate('/activities/cooperate/register')}
                                            >
                                                Đăng ký ngay
                                            </button>
                                            <button className="show-details">Xem chi tiết</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div className="cooperate-documents">
                            <div className="cooperate-documents__title">
                                <span>{t('text.Relevant_material')}</span>
                            </div>
                            <div className="cooperate-documents__files">
                                <div className="documents">{t('text.Quotation')}</div>
                                <div className="documents">{t('text.User_Agreement')}</div>
                            </div>
                        </div>

                        {/* <Modal
                            wrapClassName="modal-cus modal-user-info"
                            title="Đăng ký mua"
                            centered
                            footer={null}
                            onCancel={() => setShowModalRegisterBuy(false)}
                            visible={showModalRegisterBuy}
                        >
                            <RegisterBuy />
                        </Modal> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cooperate;
