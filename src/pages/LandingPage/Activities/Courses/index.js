import { faCirclePlus, faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message, Skeleton } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import coursesApi from '~/api/CourseApi/coursesApi';
import images from '~/assets/images/home/header';
import { dateCommon } from '~/utils/dateCommon';
import formatCash from '~/utils/formatCash';
import './Courses.scss';

const Courses = () => {
    const [statusSidebar, setStatusSidebar] = useState(2);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [coursesData, setCoursesData] = useState();
    const [loading, setLoading] = useState(false);
    const { isAuth } = useSelector((state) => state.userReducer);

    useEffect(() => {
        setLoading(true);
        const getAllCourses = async () => {
            const res = await coursesApi.getAllCourses(1, 15);
            setCoursesData(res.data);
            setLoading(false);
        };
        getAllCourses();
    }, []);

    const itemSidebar = [
        {
            id: 1,
            title: t('text.Startup_training_videos'),
        },
        {
            id: 2,
            title: t('text.Startup_training_posts'),
        },
    ];

    const handleLikeCourse = async (value) => {
        const res = await coursesApi.loveCourse({
            course_id: value,
        });

        if (res.noti.type === 0) {
            message.success(t('text.Add_to_favorite_courses'));
        }
        if (res.noti.type === 1) {
            message.success(t('text.Removed_from_favorite_courses'));
        }
        if (res.message === 'error') {
            message.error(t('text.Add_to_favorite_courses_failed'));
        }
    };

    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

    return (
        <div className="courses-wrapper">
            <div className="train-post">
                {/* <FontAwesomeIcon icon={faCirclePlus} /> */}
                {/* <span>Thêm bài viết đào tạo</span> */}
            </div>
            <div className="train-courses">
                <div className="train-courses__left">
                    <div className="train-courses__left-top">
                        <span>{t('text.Startup_training_courses')}</span>
                    </div>
                    <div className="train-courses__left-bottom">
                        {itemSidebar.map((item) => {
                            return (
                                <li
                                    className={statusSidebar === item.id ? 'active' : ''}
                                    key={item.id}
                                    onClick={() => setStatusSidebar(item.id)}
                                >
                                    {item.title}
                                </li>
                            );
                        })}
                    </div>
                </div>
                <div className="train-courses__right">
                    <div className="train-courses__list">
                        <Skeleton loading={loading}>
                            {coursesData?.map((item) => {
                                return (
                                    <div className="train-courses__item">
                                        <img
                                            onClick={() => {
                                                !user
                                                    ? message.info(t('text.Login_required'))
                                                    : navigate(`/course-register/${item.id}`);
                                            }}
                                            src={
                                                item.image_url === undefined
                                                    ? 'https://iabm.edu.vn/wp-content/uploads/2019/07/ke-toan-doanh-nghiep.jpg'
                                                    : `${process.env.REACT_APP_API_URL}${item.image_url[0].url}`
                                            }
                                            alt="Avatar"
                                        />
                                        <div className="tranin-courses_details">
                                            <div className="train-course_name-group">
                                                <span
                                                    className="train-course__name"
                                                    onClick={() => {
                                                        user === null
                                                            ? message.info(t('text.Login_required'))
                                                            : navigate(`/course-register/${item.id}`);
                                                    }}
                                                >
                                                    {item.name}
                                                </span>
                                                <FontAwesomeIcon
                                                    onClick={() => handleLikeCourse(item.id)}
                                                    className="heart-icon"
                                                    style={{
                                                        color: '#e91794',
                                                    }}
                                                    icon={faHeart}
                                                />
                                            </div>
                                            <div className="train-course__bottom">
                                                <div className="left-group">
                                                    <span className="train-course__price">
                                                        {item.course_type === 1
                                                            ? formatCash(item.price.toString())
                                                            : 'Miễn phí'}
                                                    </span>
                                                    <span className="train-course__location">
                                                        <FontAwesomeIcon icon={faLocationDot} /> {item.address}
                                                    </span>
                                                </div>
                                                <div className="date-group">
                                                    <div className="date-month">
                                                        {t('text.Month')}{' '}
                                                        {item.begin_date === undefined
                                                            ? ''
                                                            : item.begin_date.substring(5, 7)}
                                                    </div>
                                                    <div className="date-detail">
                                                        <div className="date-num">
                                                            {item.begin_date === undefined
                                                                ? ''
                                                                : item.begin_date.substring(8, 10)}
                                                        </div>
                                                        <div className="date-day">{dateCommon[item.start_date]}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Skeleton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;
