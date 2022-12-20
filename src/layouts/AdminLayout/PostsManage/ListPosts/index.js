import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListPosts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/home/header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryNews, getAllNews } from '~/store/News/newsSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const ListPosts = () => {
    const {t} = useTranslation()
    const { listNews } = useSelector((state) => state.newsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllNews({ index: 1, size: 5 }));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.posts')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.post_list')}</span>
                    </div>
                    <div className={cx('header-search')}>
                        <div className={cx('search-input')}>
                            <label htmlFor="search-business"></label>
                            <input id={cx('search-business')} placeholder={t('formsearch.btnsearch')}></input>
                        </div>
                        <button className={cx('btn-search')}>{t('formsearch.btnsearch')}</button>
                    </div>
                    <div className={cx('header-create-group')}>
                        <ul>
                            <li className={cx('image')}>{t('text.Avatar')}</li>
                            <li className={cx('time')}>{t('text.Time')}</li>
                            <li className={cx('title')}>{t('text.title')}</li>
                            <li className={cx('type')}>{t('text.type')}</li>
                            <li className={cx('status')}>{t('text.status')}</li>
                        </ul>
                    </div>
                </div>

                <div className={cx('main-content')}>
                    {listNews?.map((item) => {
                        return (
                            <div key={item.id} className={cx('post-group')}>
                                <div className={cx('post-avatar')}>
                                    <img
                                        src={
                                            item?.image_url === undefined || item?.image_url.length === 0
                                                ? ''
                                                : `${process.env.REACT_APP_API_URL}${item?.image_url[0].url}`
                                        }
                                        alt="Error"
                                    />
                                </div>
                                <div className={cx('post-time')}>
                                    <span className={cx('date')}>Ngày: {item?.created_date.substring(0, 10)}</span>
                                    {/* <span className={cx('to-hour')}>16:00 đến 22:00</span> */}
                                </div>
                                <div className={cx('post-title')}>
                                    <span>{item?.name}</span>
                                </div>
                                <div className={cx('post-type')}>
                                    <span>{item?.news_categories?.name}</span>
                                </div>
                                <div className={cx('post-status')}>
                                    <button className={cx('comfirmed')}>{t('text.reviewed')}</button>
                                    <button
                                        className={cx('edit')}
                                        onClick={() => {
                                            navigate(`/postsmanage/edit-post/${item.id}`);
                                        }}
                                    >
                                        {t('text.edit')}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ListPosts;
