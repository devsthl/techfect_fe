import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardNews.scss';
import parse from 'html-react-parser';

const CardNews = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div className="card-news-item">
            <div className="card-news-left">
                <h3
                    className="title"
                    onClick={() => {
                        navigate(`/news/${item?.id}`);
                    }}
                >
                    {item?.name}
                </h3>
                <span className="des">{item.des}</span>
                <div className="card-bottom">
                    <span className="category">{item?.news_categories?.name}</span>
                    <span className="time">5 giờ trước</span>
                </div>
            </div>
            <img
                onClick={() => {
                    navigate(`/news/${item?.id}`);
                }}
                src={`${process.env.REACT_APP_API_URL}${item.image_url[0]?.url}`}
                alt=""
            />
        </div>
    );
};

export default CardNews;
