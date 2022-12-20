import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListEvents.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Select } from 'antd';
import { Link, useSearchParams, Route, Routes, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllEventsWithPag2, getAllEvents } from '~/store/Categories/eventSlice';
import { Pagination, Modal } from 'antd';
import ToastPopup, { notifyError, notifySuccess } from '~/toast/toast';
import eventsApi from '~/api/eventsApi';
import CreateEvents from '../CreateEvents';
import ButtonComponent from '~/components/layouts/components/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);
const { Option } = Select;

const ListEvents = () => {
    const [dataEvent, setDataUser] = useState();
    const [isOpen, setOpen] = useState(false);
    const [id, setID] = useState();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { eventListPag, loadingEvent, total, eventListPag2 } = useSelector((state) => state.eventsReducer);
    const [search, setSearch] = useSearchParams({
        page_index: 1,
        page_size: 5,
    });
    useEffect(() => {
        dispatch(
            getAllEventsWithPag2({
                index: search.get('page_index'),
                size: search.get('page_size'),
            }),
        );
    }, [dispatch, search]);
    useEffect(() => {
        dispatch(getAllEvents());
    }, 1000);
    const handlePagination = async (page, pageSize) => {
        setSearch({ page_index: page, page_size: pageSize });
    };

    const handleDelete = async (id) => {
        console.log(dataEvent);
        try {
            const res = await eventsApi.delete(id);
            if (res.message === 'Success') {
                notifySuccess(t('text.delete_success'));
            } else {
                notifySuccess(t('text.delete_failed'));
            }
            dispatch(
                getAllEventsWithPag2({
                    index: search.get('page_index'),
                    size: search.get('page_size'),
                }),
            );
        } catch (err) {
            notifyError('Error');
        }
    };
    const handleOk = () => {
        handleDelete(id);
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const checkImage = (arrImage) => {
        if (arrImage === null) return null;
        else return process.env.REACT_APP_API_URL + arrImage[0]?.url;
    };
    return (
        <div className={cx('wrapper')}>
            <ToastPopup />
            {/* <button onClick={check}>click to check data</button> */}

            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.post')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.posts_list')}</span>
                    </div>
                    <div className={cx('header-search')}>
                        <div className={cx('search-input')}>
                            <label htmlFor="search-business"></label>
                            <input id={cx('search-business')} placeholder="Tìm kiếm"></input>
                        </div>
                        <button className={cx('btn-search')}>Tìm kiếm</button>
                    </div>
                    <div className={cx('filter')}>
                        <Select className="select-group" placeholder={t('text.select_event_type')}>
                            <Option>{t('text.WORKSHOPS')}</Option>
                            <Option>{t('text.Competition')}</Option>
                        </Select>
                    </div>
                    <div className={cx('header-create-group')}>
                        <ul>
                            <li className={cx('image')}>{t('text.Avatar')}</li>
                            <li className={cx('name')}>{t('text.register_name')}</li>
                            <li className={cx('time')}>{t('text.Time')}</li>
                            <li className={cx('program-name')}>{t('text.program_name')}</li>
                            <li className={cx('area')}>{t('formsearch.selectarea')}</li>
                            <li className={cx('status')}>{t('text.status')}</li>
                        </ul>
                    </div>
                </div>

                {eventListPag2.map((item, index) => {
                    return (
                        <div className={cx('main-content')}>
                            <div className={cx('event-group')}>
                                <div className={cx('event-avatar')}>
                                    <img src={checkImage(item.image_url)} alt="" />
                                </div>
                                <div className={cx('event-name')}>
                                    <span onClick={() => setDataUser(item)}>{item.name}</span>
                                    <ButtonComponent
                                        primary
                                        small
                                        onClick={() => navigate(`/list-events/list-users/${item.id}`)}
                                    >
                                        {t('text.event_list')}
                                    </ButtonComponent>
                                </div>
                                <div className={cx('event-time')}>
                                    <span>{item.start_time}</span>
                                </div>
                                <div className={cx('event-title')}>
                                    <span>{item.des}</span>
                                </div>
                                <div className={cx('event-type')}>
                                    <span>{item.address}</span>
                                </div>
                                <div className={cx('event-status')}>
                                    <Link
                                        to={`edit-events-id=${item.id}`}
                                        // mode="edit"
                                    >
                                        <button className={cx('uncomfirmed')} onClick={() => setDataUser(item)}>
                                            {t('text.edit')}
                                        </button>
                                    </Link>

                                    {/* <button className={cx('uncomfirmed')}
                                            onClick={() => setDataUser(item)}
                                        >Chỉnh sửa</button> */}
                                    <button
                                        onClick={() => {
                                            setOpen(true);
                                            setID(item.id);
                                        }}
                                        className={cx('edit')}
                                    >
                                        {t('text.delete')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Routes>
                <Route path="list-events/edit-events-id=:id" element={<CreateEvents mode="edit" />} />
            </Routes>
            <Pagination
                onChange={handlePagination}
                current={parseInt(search.get('page_index'))}
                pageSize={search.get('page_size')}
                total={total}
                showSizeChanger
            />
            <Modal title="XÁC NHẬN" visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn chắc chắn muốn xóa ?</p>
            </Modal>
        </div>
    );
};

export default ListEvents;
