import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AllOrders from './AllOrders';
import './OrderManage.scss';

const OrderManage = () => {
    const { t } = useTranslation();
    return (
        <div className="order-manage" id="order-wrapper">
            <div className="inner">
                <div className="header-main">
                    <div className="header-title">
                        <span>Đơn hàng</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Khóa học đã tham gia</span>
                    </div>
                    <div className="action-header">
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab={t('text.All_Orders')} key="1">
                                <AllOrders />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={t('text.Waiting_for_payment')} key="2">
                                <AllOrders />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={t('text.Waiting_for_confirmation')} key="3">
                                <AllOrders />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={t('text.Delivering')} key="4">
                                <AllOrders />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={t('text.Delivered')} key="5">
                                <AllOrders />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={t('text.Canceled')} key="6">
                                <AllOrders />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManage;
