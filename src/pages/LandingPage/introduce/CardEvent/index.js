import React from 'react';
import './CardEvent.scss';

const CardEvent = () => {
    return (
        <div className="card-event-item">
            <div className="image-group">
                <img
                    src="https://api.ecommerce.smiletech.vn/upload/uploads/1668084900187VirtualInternshipsstartupedtechcotrusotaiVietNamhuydongthanhcong143trieuUSD9.png"
                    alt=""
                />
                <div className="area">Hồ Chí Minh</div>
            </div>
            <div className="card-event-content">
                <div className="title">RA QUYẾT ĐỊNH được rõ ràng và không xung đột.</div>
                <div className="date-group">
                    <div className="price">Miễn phí</div>
                    <div className="date-time">18/11/2022</div>
                </div>
                <div className="category-group">
                    <div className="category">Hội thảo</div>
                    <div className="action-btn">
                        <button>Đăng ký ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardEvent;
