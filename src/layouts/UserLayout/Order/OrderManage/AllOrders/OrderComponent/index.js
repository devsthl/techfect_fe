import { faBan, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './OrderComponent.scss';

const OrderComponent = ({ removed }) => {
    const { t } = useTranslation();
    return (
        <div className="order-item" id="order-item-user">
            {removed ? (
                <div className="top-order">
                    <FontAwesomeIcon icon={faBan} />
                    <span>{t('text.Canceled')}</span>
                </div>
            ) : (
                <div className="top-order">
                    <FontAwesomeIcon icon={faTruck} />
                    <span>{t('text.Deliver_succeeded')}</span>
                </div>
            )}
            <div className="main-order">
                <div className="list-products">
                    <div className="product-item">
                        <img
                            src="https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg"
                            alt=""
                        />
                        <div className="product-details">
                            <span className="product-title">Rau củ tươi sạch</span>
                            <span className="product-quantity">Số lượng: 02</span>
                        </div>
                        <div className="product-price">120.000 VNĐ</div>
                    </div>

                    <div className="product-item">
                        <img
                            src="https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg"
                            alt=""
                        />
                        <div className="product-details">
                            <span className="product-title">Rau củ tươi sạch</span>
                            <span className="product-quantity">Số lượng: 02</span>
                        </div>
                        <div className="product-price">120.000 VNĐ</div>
                    </div>
                </div>
            </div>
            <div className="bottom-order">
                <div className="action-left">
                    <button className="buy-again">{t('text.Purchase_again')}</button>
                    <button className="check-order">{t('text.Track_order')}</button>
                </div>
                <div className="action-right">
                    <label>{t('text.total')} :</label>
                    <span>960.000 VNĐ</span>
                </div>
            </div>
        </div>
    );
};

export default OrderComponent;
