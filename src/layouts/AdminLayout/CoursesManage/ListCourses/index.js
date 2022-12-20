import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListCourses.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBan, faCheck, faTrash, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/home/header';
import { Link, useNavigate } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import { useEffect } from 'react';
import coursesApi from '~/api/CourseApi/coursesApi';
import { useState } from 'react';
import { Skeleton, Spin, Tooltip } from 'antd';
import formatCash from '~/utils/formatCash';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

const ListCourses = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [listCourses, setListCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllCourse = async () => {
            setLoading(true);
            const res = await coursesApi.getAllCourses(1, 30);
            setListCourses(res.data);
            setLoading(false);
        };
        getAllCourse();
    }, []);

    const getDateString = (num) => {
        let result = '';
        switch (num) {
            case 0:
                result = 'Thứ Hai';
                break;
            case 1:
                result = 'Thứ Ba';
                break;
            case 2:
                result = 'Thứ Tư';
                break;
            case 3:
                result = 'Thứ Năm';
                break;
            case 4:
                result = 'Thứ Sáu';
                break;
            case 5:
                result = 'Thứ Bảy';
                break;
            case 6:
                result = 'Chủ Nhật';
                break;
            default:
                break;
        }
        return result;
    };

    return (
        <div className={cx('wrapper')}>
            {/* <Spin spinning={loading} /> */}
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.Courses')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.courses_list')}</span>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    {listCourses.map((item) => {
                        return (
                            <Skeleton loading={loading}>
                                <div className={cx('course-group')}>
                                    <div className={cx('course-image')}>
                                        <img
                                            src={
                                                item.image_url === undefined
                                                    ? 'https://iabm.edu.vn/wp-content/uploads/2019/07/ke-toan-doanh-nghiep.jpg'
                                                    : `${process.env.REACT_APP_API_URL}${item.image_url[0].url}`
                                            }
                                            alt="Course"
                                        />
                                    </div>
                                    <Link to={`/coursesmanage/coursedetails/${item.id}`} className={cx('course-name')}>
                                        {item.name}
                                    </Link>
                                    <div className={cx('course-details')}>
                                        <div className={cx('course-details-item')}>
                                            <img src={''} alt="User" />
                                            <span>
                                                Đối tượng: Nữ {item.start_age} - {item.end_age} tuổi{' '}
                                            </span>
                                        </div>
                                        <div className={cx('course-details-item')}>
                                            <img src={images.timer} alt="Timer" />
                                            <span>
                                                Thời gian học: {getDateString(item.start_date)} đến{' '}
                                                {getDateString(item.end_date)}{' '}
                                            </span>
                                        </div>
                                        <div className={cx('course-details-item')}>
                                            <img src={images.people} alt="Quantity" />
                                            <span>Số lượng: 8 - 10 người.</span>
                                        </div>
                                        <div className={cx('course-details-item')}>
                                            <img src={images.location} alt="location" />
                                            <span>{item.address}</span>
                                        </div>
                                    </div>
                                    <div className={cx('course-price')}>
                                        <span>{formatCash(item?.price?.toString())}đ/khoá</span>
                                        <div className="icon-group">
                                            <Tooltip placement="topLeft" title="Xem danh sách người đăng ký">
                                                <FontAwesomeIcon
                                                    onClick={() =>
                                                        navigate(`/coursesmanage/list-subcribers/${item.id}`)
                                                    }
                                                    className={cx('group')}
                                                    icon={faUserGroup}
                                                />
                                            </Tooltip>
                                            <FontAwesomeIcon className={cx('delete')} icon={faTrash} />
                                        </div>
                                    </div>
                                </div>
                            </Skeleton>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ListCourses;
