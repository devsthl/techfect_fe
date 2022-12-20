import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardCompany.scss';

const CardCompany = ({ item }) => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                backgroundImage: `url(https://img.freepik.com/premium-photo/vertical-background-image-minimal-home-office-workplace-with-laptop-accessories-black-white-copy-space_236854-27485.jpg?w=2000)`,
                backgroundSize: 'cover',
            }}
            className="card-company-wrapper"
        >
            <div className="logo-title">
                <div className="image-group">
                    <img
                        src={
                            item?.image_url.length === 0 || item?.image_url === undefined
                                ? 'https://haymora.com/upload/files/cong_nghe_thong_tin/hivetech/hivetech-logo.jpg'
                                : `${process.env.REACT_APP_API_URL}${item?.image_url[0].url}`
                        }
                        alt=""
                    />
                </div>
                <div className="title-group">{item.name}</div>
            </div>
            <div className="company-detail">
                <div>Địa chỉ: 98 Hoàng Quốc Việt, Nghĩa Đô, Cầu Giấy, Hà Nội</div>
                <div>Số điện thoại: {item.phone}</div>
                <div>E-mail: {item.email}</div>
            </div>
            <div className="see-detail">
                <button
                    onClick={() => {
                        navigate('/company/282');
                    }}
                >
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
};

export default CardCompany;
