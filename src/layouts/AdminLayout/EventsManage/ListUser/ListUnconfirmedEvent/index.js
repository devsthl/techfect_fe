import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ListUnconfirmed.module.scss';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { confirmUser, deleteUser } from '~/store/Categories/eventSlice';
import { getListEventConfirmm } from '~/store/Categories/eventSlice';
import { Popconfirm, Skeleton, Spin } from 'antd';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

const ListUnconfirmedEvent = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { listEventConfirm, loadingEvent } = useSelector((state) => state.eventsReducer);

    useEffect(() => {
        dispatch(getListEventConfirmm({
            status: 0,
            page_index: 1,
            page_size: 16,
            type: 3,
            event_id: id,
        }));
    }, []);

    const handleConfirmUser = async (value) => {
        dispatch(confirmUser(value));
    };

    const handleDeleteUser = async (value) => {
        dispatch(deleteUser(value));
    };
    return (
        <div>
            <div className={cx('main-content')}>
                <Spin spinning={loadingEvent}>
                    {listEventConfirm.map((item) => {
                        return (
                            <div className={cx('post-group')}>
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
                                    <CheckCircleOutlined
                                        onClick={() => handleConfirmUser(item.id)}
                                        className={cx('comfirm')}
                                    />
                                    <Popconfirm
                                        title="Bạn có chắc muốn xóa không?"
                                        onConfirm={() => handleDeleteUser(item.id)}
                                    >
                                        <CloseCircleOutlined
                                            // onClick={() => handleDeleteUser(item.id)}
                                            className={cx('uncomfirm')}
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        );
                    })}
                </Spin>
            </div>
        </div>
    );
};

export default ListUnconfirmedEvent;
