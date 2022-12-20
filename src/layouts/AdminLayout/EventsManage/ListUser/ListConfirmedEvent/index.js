import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ListConfirmedEvent.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getListEventConfirmm } from '~/store/Categories/eventSlice';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

const ListConfirmedEvent = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { listEventConfirm, loadingEvent } = useSelector((state) => state.eventsReducer);

    useEffect(() => {
        dispatch(getListEventConfirmm({
            status: 1,
            page_index: 1,
            page_size: 6,
            type: 3,
            event_id: id,
        }));
        console.log("list", listEventConfirm);
    }, []);

    return (
        <div>
            <div className={cx('main-content')}>
                <Spin spinning={loadingEvent}>
                    {listEventConfirm.map((item, index) => {
                        return (
                            <div className={cx('post-group')} key={index}>
                                <div className={cx('post-avatar')}>{item.contact_name}</div>
                                <div className={cx('post-time')}>
                                    <span className={cx('date')}>{item.email}</span>
                                </div>
                                <div className={cx('post-title')}>
                                    <span>{item.address}</span>
                                </div>
                                <div className={cx('post-type')}>
                                    <span>{item.phone}</span>
                                </div>
                                <div className={cx('post-status')}>
                                    <div className={cx('confirmed-status')}>Đã duyệt</div>
                                </div>
                            </div>
                        );
                    })}
                </Spin>
            </div>
        </div>
    );
};

export default ListConfirmedEvent;
