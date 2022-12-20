import React from 'react';
import './Purpose.scss';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const Purpose = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div className="purpose-inner">
            <div className="jet-timeline"></div>
            <div className="timeline-content">
                <div className="cooperate-group">
                    <div data-aos="fade-right" className="cooperate-content">
                        <h2>Thúc đẩy sáng kiến về công nghệ</h2>
                        <span>
                            Nền tảng giúp các doanh nghiệp kết nối với các nhà đầu tư. GIúp các nhà đầu tư tìm được
                            doanh nghiệp phù hợp. Cùng nhau mang tới các sản phẩm, các sáng kiến phục vụ tối đa tới
                            người tiêu dùng
                        </span>
                    </div>
                    <div className="cooperate-title">
                        <span>Kết nối cùng phát triển</span>
                    </div>
                </div>
                <div className="knowledge-group">
                    <div className="knowledge-title">
                        <span>Kiến thức là sức mạnh</span>
                    </div>
                    <div data-aos="fade-left" className="knowledge-content">
                        <h2>Kiến thức thực tiễn</h2>
                        <span>
                            Bên cạnh kết nối, nền tảng còn cung cấp các khoá học, kiến thức giúp cho các doanh nghiệp có
                            thể hoà nhập tốt hơn vào
                        </span>
                    </div>
                </div>
                <div className="activity-group">
                    <div data-aos="fade-right" className="activity-content">
                        <h2>Quảng bá sản phẩm </h2>
                        <span>
                            Nền tảng giúp các doanh nghiệp đưa các sản phẩm, ý tưởng tới các trung tâm Thương Mại, hội
                            chợ doanh nghiệp. <br />
                            Các hoạt động, events thu hút các nhà đầu tư
                        </span>
                    </div>
                    <div className="activity-title">
                        <span>Hoạt động</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purpose;
