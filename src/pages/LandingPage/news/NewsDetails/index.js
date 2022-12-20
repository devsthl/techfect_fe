import { faFacebook, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Spin } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getLikeNews, getNewsById } from '~/store/News/newsSlice';
import './NewDetails.scss';
import { useTranslation } from 'react-i18next';

const NewsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { newsById, listLikeNews, loading } = useSelector((state) => state.newsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNewsById(id));
        dispatch(getLikeNews(5));
    }, [dispatch, id]);

    console.log('newsById', newsById.length);

    return (
        <div className="news-details-wrapper">
            <Spin spinning={loading}>
                {newsById.length !== undefined ? (
                    <></>
                ) : (
                    <div className="inner">
                        <div className="social-network-group">
                            <FontAwesomeIcon icon={faFacebook} />
                            <FontAwesomeIcon icon={faTwitter} />
                            <FontAwesomeIcon icon={faLinkedinIn} />
                            <FontAwesomeIcon icon={faMessage} />
                        </div>
                        <div className="news-content">
                            <h1>{newsById.name}</h1>
                            <div className="news-category">{newsById?.news_categories?.name}</div>
                            <div className="image-wrapper">
                                <img src={`${process.env.REACT_APP_API_URL}${newsById?.image_url[0]?.url}`} alt="" />
                            </div>
                            <div className="desc">{newsById?.des}</div>
                            <div className="news-content">
                                {newsById.content === null ? '' : parse(newsById?.content)}
                            </div>
                            <div className="comment-group">
                                <h3>Add your comment</h3>
                                <Input.TextArea></Input.TextArea>
                                <button>Post Comment</button>
                            </div>
                        </div>
                        <div className="most-watch">
                            <h2>{t('text.Most_popular_post')}</h2>
                            <div className="list-news">
                                {listLikeNews.map((item) => {
                                    return (
                                        <div className="news-item">
                                            <span
                                                className="news-title"
                                                onClick={() => {
                                                    console.log(111111111);
                                                    navigate(`/news/${item?.id}`);
                                                }}
                                            >
                                                {item?.name}
                                            </span>
                                            <div className="bottom">
                                                <span className="category">
                                                    {item?.news_categories === undefined
                                                        ? ''
                                                        : item?.news_categories.name}
                                                </span>
                                                <span className="time"> {item.created_date.substring(0, 10)}</span>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* <div className="news-item">
                                    <span className="news-title">
                                        Bản tin luật quốc tế pháp lí về tranh chấp thương mại điện tử
                                    </span>
                                    <div className="bottom">
                                        <span className="category">ICTLAW</span>
                                        <span className="time">18:00 22/03/2022</span>
                                    </div>
                                </div>
    
                                <div className="news-item">
                                    <span className="news-title">
                                        Bản tin luật quốc tế pháp lí về tranh chấp thương mại điện tử
                                    </span>
                                    <div className="bottom">
                                        <span className="category">ICTLAW</span>
                                        <span className="time">18:00 22/03/2022</span>
                                    </div>
                                </div>
    
                                <div className="news-item">
                                    <span className="news-title">
                                        Bản tin luật quốc tế pháp lí về tranh chấp thương mại điện tử
                                    </span>
                                    <div className="bottom">
                                        <span className="category">ICTLAW</span>
                                        <span className="time">18:00 22/03/2022</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </Spin>
        </div>
    );
};

export default NewsDetails;
