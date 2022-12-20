import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListGroup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/home/header';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const ListGroup = () => {
    const {t} = useTranslation()
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.group')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.list_groups')}</span>
                    </div>
                    <div className={cx('header-search')}>
                        <div className={cx('search-input')}>
                            <label htmlFor="search-business"></label>
                            <input id={cx('search-business')} placeholder={t('formsearch.btnsearch')}></input>
                        </div>
                        <button className={cx('btn-search')}>{t('formsearch.btnsearch')}</button>
                    </div>
                    <div className={cx('header-create-group')}>
                        <button className={cx('btn-create-group')}>
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <span>{t('text.add_group')}</span>
                        </button>
                    </div>
                </div>

                <div className={cx('main-content')}>
                    <div className={cx('group-group')}>
                        <div className={cx('business-avatar')}>
                            <img src={images.businessAvatar} alt="Group" />
                        </div>
                        <div className={cx('group-info')}>
                            <div className={cx('group-details')}>
                                <div className={cx('group-details-top')}>
                                    <span className={cx('group-name')}>Cộng đồng khởi nghiệp Việt Nam</span>
                                    <span className={cx('group-member')}>119.412 Thành viên - 4 bài viết/tuần</span>
                                </div>
                                <div className={cx('group-desc')}>
                                    <span>
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                                        officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
                                        nostrud amet.
                                    </span>
                                </div>
                            </div>
                            <button className={cx('btn-participation')}>{t('home.login')}</button>
                        </div>
                    </div>

                    <div className={cx('group-group')}>
                        <div className={cx('business-avatar')}>
                            <img src={images.businessAvatar} alt="Group" />
                        </div>
                        <div className={cx('group-info')}>
                            <div className={cx('group-details')}>
                                <div className={cx('group-details-top')}>
                                    <span className={cx('group-name')}>Cộng đồng khởi nghiệp Việt Nam</span>
                                    <span className={cx('group-member')}>119.412 Thành viên - 4 bài viết/tuần</span>
                                </div>
                                <div className={cx('group-desc')}>
                                    <span>
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                                        officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
                                        nostrud amet.
                                    </span>
                                </div>
                            </div>
                            <button className={cx('btn-participation')}>{t('home.login')}</button>
                        </div>
                    </div>

                    <div className={cx('group-group')}>
                        <div className={cx('business-avatar')}>
                            <img src={images.businessAvatar} alt="Group" />
                        </div>
                        <div className={cx('group-info')}>
                            <div className={cx('group-details')}>
                                <div className={cx('group-details-top')}>
                                    <span className={cx('group-name')}>Cộng đồng khởi nghiệp Việt Nam</span>
                                    <span className={cx('group-member')}>119.412 Thành viên - 4 bài viết/tuần</span>
                                </div>
                                <div className={cx('group-desc')}>
                                    <span>
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                                        officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
                                        nostrud amet.
                                    </span>
                                </div>
                            </div>
                            <button className={cx('btn-participation')}>{t('home.login')}</button>
                        </div>
                    </div>

                    <div className={cx('pagination')}></div>
                </div>
            </div>
        </div>
    );
};

export default ListGroup;
