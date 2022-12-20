import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListBusiness.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/home/header';
import { useEffect } from 'react';
import storeApi from '~/api/StoreApi/storeApi';
import { useState } from 'react';
import { message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const ListBusiness = () => {
    const {t} = useTranslation()
    const [listStores, setListStores] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        setLoading(true);
        const getAllStore = async () => {
            const result = await storeApi.getAllStore();
            if (result.message === 'error') {
            } else {
                setListStores(result);
                setLoading(false);
            }
        };
        getAllStore();
    }, []);

    return (
        <div className={cx('content-wrapper')}>
            <Spin spinning={loading}>
                <div className={cx('content-inner')}>
                    <div className={cx('header-main')}>
                        <div className={cx('header-title')}>
                            <span>{t('text.company')}</span>
                            <FontAwesomeIcon icon={faAngleRight} />
                            <span>{t('text.company_list')}</span>
                        </div>
                        <div className={cx('header-search')}>
                            <div className={cx('search-input')}>
                                <label htmlFor="search-business"></label>
                                <input id={cx('search-business')} placeholder={t('formsearch.btnsearch')}></input>
                            </div>
                            <button className={cx('btn-search')}>{t('formsearch.btnsearch')}</button>
                        </div>
                        {/* <div className={cx('header-create-group')}>
                            <button className={cx('btn-create-group')}>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <span>{t('text.add_company')}</span>
                            </button>
                        </div> */}
                    </div>
                    <div className={cx('main-content')}>
                        {listStores?.map((item) => {
                            return (
                                <div key={item.id} className={cx('business-group')}>
                                    <div className={cx('business-avatar')}>
                                        <img
                                            src={
                                                item.image_url.length === 0
                                                    ? ''
                                                    : `${process.env.REACT_APP_API_URL}${item.image_url[0].url}`
                                            }
                                            alt="Avatar"
                                        ></img>
                                    </div>
                                    <div className={cx('business-info')}>
                                        <div className={cx('business-details')}>
                                            <span className={cx('business-name')}>{item.name}</span>
                                            <span className={cx('business-address')}>{item?.address?.address}</span>
                                            <span className={cx('business-website')}>http://www.dksh.com.vn</span>
                                            <span className={cx('business-email')}>{item.email}</span>
                                        </div>
                                        <div className={cx('business-action')}>
                                            <div className={cx('action-delete')}>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                                <span>{t('text.delete')}</span>
                                            </div>
                                            <div className={cx('business-phone')}>
                                                <img src={images.phoneIcon} alt="Phone" />
                                                <span>{item.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div className={cx('pagination')}></div>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default ListBusiness;
