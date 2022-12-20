import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images/home/header';
import './MarketingChannel.scss';

const MarketingChannel = () => {
    const navigate = useNavigate();

    const marketingItem = [
        {
            id: 1,
            image: images.adsIcon,
            title: 'Quảng cáo của tôi',
            des: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            href: '/my-program',
        },
        {
            id: 2,
            image: images.programIcon,
            title: 'Chương trình của tôi',
            des: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            href: '/my-program',
        },
        {
            id: 3,
            image: images.strongboxIcon,
            title: 'Chương trình của Tecfest',
            des: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            href: '/my-program',
        },
        {
            id: 4,
            image: images.productsIcon,
            title: 'Top sản phẩm bán chạy',
            des: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            href: '/my-program',
        },
    ];

    return (
        <div className="marketing-wrapper">
            <div className="inner">
                <div className="header-main">
                    <div className="header-title">
                        <span>Quản lý sản phẩm</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Kênh marketing</span>
                    </div>
                </div>
                <div className="content-main">
                    <div className="list-marketing">
                        {marketingItem.map((item) => {
                            return (
                                <div className="marketing-item">
                                    <div
                                        className="icon-group"
                                        onClick={() => {
                                            navigate(item.href);
                                        }}
                                    >
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <span
                                        className="advertise"
                                        onClick={() => {
                                            navigate(item.href);
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                    <span className="desc">{item.des}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingChannel;
