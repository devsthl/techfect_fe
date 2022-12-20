import React from 'react';
import './InvestmentFund.scss';
const InvestmentFund = () => {
    return (
        <div className="investment-fund-item">
            <div className="image-group">
                <img src="https://giagocchudautu.com/wp-content/uploads/2021/02/logo-vinacapital.jpg" alt="" />
            </div>
            <div className="investment-detail">
                <h2>VinaCapital</h2>
                <span>
                    Công ty Quản lý Quỹ VinaCapital (“VCFM”) là một trong những công ty đầu ngành trong lĩnh vực đầu tư
                    tài chính ở Việt Nam. Được thành lập bởi Tập đoàn VinaCapital từ năm 2012 và hoạt động dưới tên Công
                    ty Cổ phần Quản lý Quỹ VinaWealth cho đến trước tháng 07 năm 2017, VCFM được cấp giấy phép bởi Ủy
                    Ban Chứng Khoán Nhà Nước để thành lập và quản lý các quỹ đầu tư, quản lý danh mục đầu tư và cung cấp
                    dịch vụ tư vấn đầu tư.
                </span>
                <a href="#">Trang chủ quỹ</a>
            </div>
        </div>
    );
};

export default InvestmentFund;
