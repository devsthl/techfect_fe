import React from 'react';
import './ShoppingMall.scss';

const ShoppingMall = () => {
    return (
        <div className="shopping-mall-item">
            <div className="image-group">
                <img
                    src="https://statics.vincom.com.vn/xu-huong/trung-tam-thuong-mai-lon-nhat-viet-nam/vincom-mega-mall-times-city.jpg"
                    alt=""
                />
            </div>
            <div className="shopping-mall-detail">
                <h3>Vincom Mega Mall Times City</h3>
                <ul>
                    <li>Địa chỉ: Số 458 Minh Khai, Quận Hai Bà Trưng, Hà Nội</li>
                    <li>Giờ mở cửa: 10:00 - 21:30</li>
                </ul>
            </div>
        </div>
    );
};

export default ShoppingMall;
