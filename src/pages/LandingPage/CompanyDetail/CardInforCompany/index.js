import React from 'react';
import './CardInforCompany.scss';

const CardInforCompany = () => {
    return (
        <div className="card-infor-company">
            <div className="image-group">
                <img src="https://haymora.com/upload/files/cong_nghe_thong_tin/hivetech/hivetech-logo.jpg" alt="" />
            </div>
            <div className="company-infor">
                <div>Công ty CP Công nghệ HiveTech Việt Nam</div>
                <span>Địa chỉ: 98 Hoàng Quốc Việt, Nghĩa Đô, Cầu Giấy, Hà Nội</span>
                <span>Số điện thoại: (+84) 24 6660 2612</span>
                <span>E-mail: contact@hivetech.vn</span>
                <span>Website: www.hivetech.vn</span>
                <span>Lĩnh vực: An toàn không gian mạng</span>
            </div>
        </div>
    );
};

export default CardInforCompany;
