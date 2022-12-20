import React from 'react';
import './PackageDetails.scss';

const PackageDetails = () => {
    return (
        <div className="package-details">
            <div className="top-content">
                <h1 className="package-title">Thông tin gói</h1>
            </div>
            <div className="bottom-content">
                <div className="row">
                    <label>Gói phí</label>
                    <div className="content-row">
                        <span>Gói dịch vụ 1 tháng</span>
                    </div>
                </div>
                <div className="row">
                    <label>Thông tin gói</label>
                    <div className="content-row">
                        <ul>
                            <li>Có thể đăng khóa học</li>
                            <li>Đăng sản phẩm lên cửa hàng</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <label>Thông tin gói</label>
                    <div className="content-row">
                        <span className="status">Đang hoạt động</span>
                    </div>
                </div>
                <div className="row">
                    <label>Giá tiền</label>
                    <div className="content-row">
                        <span>Miễn phí</span>
                    </div>
                </div>
                <div className="row">
                    <label>Thao tác</label>
                    <div className="content-row">
                        <button>Đổi gói</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
