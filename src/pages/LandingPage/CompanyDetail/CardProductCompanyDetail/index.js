import { Rate } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import formatCash from '~/utils/formatCash';
import './CardProductCompanyDetail.scss';

const CardProductCompanyDetail = ({ item }) => {
    const navigate = useNavigate();
    console.log('itemmmm', item);
    const handleShowDetailsProduct = (item) => {
        navigate(`/stores/viewstore/detail-product/${item.id}`);
        window.scrollTo({ top: 570, left: 0, behavior: 'smooth' });
    };

    return (
        <div className="card-product-wrapper" id="company-detail">
            <div className="card-image" onClick={() => handleShowDetailsProduct(item)}>
                <img src={`${process.env.REACT_APP_API_URL}${item?.image_url[0].url}`} alt="Avatar" />
            </div>
            <div className="card-details">
                <span className="card-details-title" onClick={() => handleShowDetailsProduct(item)}>
                    {item?.name}
                </span>
                <div className="rating">
                    <Rate disabled defaultValue={4} />
                </div>
                <div className="price">
                    <span className="price-title">Price: </span>
                    <span className="price-number">{formatCash(item?.price.toString())} đ</span>
                </div>
            </div>
        </div>
    );
};

export default CardProductCompanyDetail;
