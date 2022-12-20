import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './AllOrders.scss';
import OrderComponent from './OrderComponent';

const AllOrders = () => {
    const { t } = useTranslation();

    return (
        <div className="all-order-wrapper">
            <div className="search-group">
                <div className="search-wrapper">
                    <input placeholder={t('text.Search_ID_or_product_name')} />
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            <div className="list-orders">
                <OrderComponent />
                <OrderComponent removed />
            </div>
        </div>
    );
};

export default AllOrders;
