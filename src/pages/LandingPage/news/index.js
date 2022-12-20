import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Menu, Skeleton, Space, Spin } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import CategoriesApi from '~/api/CategoryApi/categoriesApi';
import newsApi from '~/api/NewsApi/newsApi';
import { getAllNews, getHotNews, getLikeNews } from '~/store/News/newsSlice';
import navNewsItem from '~/utils/navNews';
import CardNews from './CardNews';
import CardStory from './CardStory';
import './NewsHome.scss';

function News() {
    const dispatch = useDispatch();
    const [dataNews, setDataNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { listNews, popularEvent, story, investment, listHotNews, listLikeNews } = useSelector(
        (state) => state.newsReducer,
    );

    console.log('listLikeNews', listLikeNews);

    useEffect(() => {
        dispatch(getAllNews({ index: 1, size: 20 }));
        dispatch(getHotNews(3));
        dispatch(getLikeNews(5));
    }, [dispatch]);

    const menu = (
        <Menu
            items={[
                {
                    label: <a href="#">Cuộc thi</a>,
                    key: '0',
                },
                {
                    label: <a href="#">Kết nối đầu tư</a>,
                    key: '1',
                },
                {
                    label: 'Công nghệ tài chinh',
                    key: '3',
                },
                {
                    label: 'Công nghệ giáo dục',
                    key: '4',
                },
                {
                    label: 'Công nghệ Logitics',
                    key: '5',
                },
                {
                    label: 'Công nghệ giải trí và truyền thông',
                    key: '6',
                },
            ]}
        />
    );

    const newsItemClassName = 'nav-item';
    const newsItemClassNameActive = 'nav-item active';

    return (
        <div className="news-wrapper">
            <Skeleton loading={loading}>
                <div className="inner">
                    <div className="news-header">
                        <div className="nav-news">
                            {/* <Dropdown overlay={menu} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <div className="all-category">
                                            <FontAwesomeIcon icon={faBars} />
                                            <span>Tất cả</span>
                                        </div>
                                    </Space>
                                </a>
                            </Dropdown>
                            <div className="nav-list">
                                {navNewsItem.map((item) => {
                                    return (
                                        <NavLink
                                            key={item.id}
                                            className={({ isActive }) =>
                                                isActive ? newsItemClassNameActive : newsItemClassName
                                            }
                                            to={item.href}
                                        >
                                            {item.title}
                                        </NavLink>
                                    );
                                })}
                            </div> */}
                            <div></div>
                        </div>
                    </div>
                    <div className="news-content">
                        <div className="top-news-left">
                            <div className="new-news-wrapper">
                                <div className="title-category">
                                    <h1>{t('text.Latest_News')}</h1>
                                </div>
                                <div className="new-news-group">
                                    <div
                                        className="full-news"
                                        onClick={() => {
                                            navigate(`/news/${listHotNews[0]?.id}`);
                                        }}
                                    >
                                        <img
                                            src={
                                                listHotNews[0]?.image_url === undefined
                                                    ? ''
                                                    : `${process.env.REACT_APP_API_URL}${listHotNews[0]?.image_url[0].url}`
                                            }
                                            alt="Avatar"
                                        />
                                        <div className="news-details">
                                            <h3>{listHotNews[0]?.name}</h3>
                                            <span className="desc-news">{listHotNews[0]?.des}</span>
                                            <div className="category-time-group">
                                                <span className="category">
                                                    {listHotNews[0]?.news_categories?.name}
                                                </span>
                                                <span className="time">5 giờ trước</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="small-news">
                                        <div className="list-news">
                                            {listHotNews.map((item, index) => {
                                                if (index !== 0) {
                                                    return <CardNews item={item} />;
                                                } else {
                                                    return <></>;
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="event-outstanding">
                                <div className="title-category">
                                    <h1>{t('text.Highlight_events')}</h1>
                                </div>
                                <div className="event-group">
                                    <div className="group-3">
                                        <div className="list-event">
                                            {popularEvent.map((item, index) => {
                                                if (index <= 2) {
                                                    return (
                                                        <div className="event-item">
                                                            <div
                                                                className="event-image"
                                                                onClick={() => {
                                                                    navigate(`/news/${item?.id}`);
                                                                }}
                                                            >
                                                                <img
                                                                    src={
                                                                        item.image_url === undefined
                                                                            ? ''
                                                                            : `${process.env.REACT_APP_API_URL}${item.image_url[0].url}`
                                                                    }
                                                                    alt="Error"
                                                                />
                                                            </div>
                                                            <div className="event-details">
                                                                <span className="time">23 June 2020</span>
                                                                <h3
                                                                    onClick={() => {
                                                                        navigate(`/news/${item?.id}`);
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </h3>
                                                                <span className="desc">{item.des}</span>
                                                            </div>
                                                            <div className="read-more">
                                                                <button
                                                                    onClick={() => {
                                                                        navigate(`/news/${item?.id}`);
                                                                    }}
                                                                >
                                                                    {t('text.Read_more')}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                } else {
                                                    <></>;
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <div className="multi-event">
                                        <div className="list-event-small">
                                            {popularEvent.map((item, index) => {
                                                if (index <= 3) {
                                                    return <CardNews item={item} />;
                                                } else {
                                                    return <></>;
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-news-right">
                            <div className="advertise">
                                <img
                                    src="https://images.adsttc.com/media/images/5b08/b87c/f197/ccb5/4900/00bd/medium_jpg/The_S_02_filter_edit2_06.jpg?1527298139"
                                    alt=""
                                />
                            </div>
                            <div className="most-watch">
                                <h2>{t('text.Most_popular_post')}</h2>
                                <div className="list-news">
                                    {listLikeNews.map((itemNews) => {
                                        return (
                                            <div className="news-item">
                                                <span
                                                    className="news-title"
                                                    onClick={() => {
                                                        navigate(`/news/${itemNews?.id}`);
                                                    }}
                                                >
                                                    {itemNews?.name}
                                                </span>
                                                <div className="bottom">
                                                    <span className="category">
                                                        {itemNews?.news_categories === undefined
                                                            ? ''
                                                            : itemNews?.news_categories.name}
                                                    </span>
                                                    <span className="time">
                                                        {/* {itemNews.created_date.substring(12, 16)}{' '} */}
                                                        {itemNews.created_date.substring(0, 10)}
                                                    </span>
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
                    </div>
                    <div className="success-story-content">
                        <div className="title">
                            <h2>{t('text.Success_stories')}</h2>
                        </div>
                        <div className="story-group">
                            <div className="list-story">
                                {story.map((item) => {
                                    return <CardStory item={item} />;
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="investment-connection">
                        <div className="title">
                            <h2>{t('text.Connect_to_invest')}</h2>
                        </div>
                        <div className="investment-group">
                            <div className="list-card">
                                {investment.map((item) => {
                                    return <CardStory key={item.id} item={item} />;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Skeleton>
        </div>
    );
}

export default News;
