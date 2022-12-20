import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListUnconfirmed.module.scss';
import images from '~/assets/images/home/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { confirmUser, deleteUser, getListConfirm } from '~/store/Course/courseSlice';
import { Popconfirm, Skeleton, Spin } from 'antd';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const ListUnconfirmed = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { listUserConfirm, loading } = useSelector((state) => state.courseReducer);

    useEffect(() => {
        dispatch(
            getListConfirm({
                status: 0,
                course_id: id,
            }),
        );
    }, [dispatch]);

    const handleConfirmUser = async (value) => {
        dispatch(confirmUser(value));
    };

    const handleDeleteUser = async (value) => {
        dispatch(deleteUser(value));
    };

    return (
        <div>
            <div className={cx('main-content')}>
                <Spin spinning={loading}>
                    {listUserConfirm.map((item) => {
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

export default ListUnconfirmed;
