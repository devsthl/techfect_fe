import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ParticipationCourse.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { HeartFilled } from '@ant-design/icons';
import images from '~/assets/images/home/header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import coursesApi from '~/api/CourseApi/coursesApi';

const cx = classNames.bind(styles);

const ParticipationCourse = () => {
    const navigate = useNavigate();
    const [statusLove, setStatusLove] = useState(false);
    const [dataFavoriteCourse, setDataFavoriteCourse] = useState();

    const classNotActive = cx('love-icon');
    const classesActive = cx('love-icon', 'active');

    useEffect(() => {
        const getFavoriteCourse = async () => {
            const res = await coursesApi.getFavoriteCourse();
            setDataFavoriteCourse(res);
        };
        getFavoriteCourse();
    }, []);

    const classesLoveIcon = statusLove ? classesActive : classNotActive;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Đơn hàng</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Khóa học đã mua</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <div className={cx('list-courses')}>
                        {dataFavoriteCourse?.map((item) => {
                            return (
                                <div key={item.id} className={cx('course-item')}>
                                    <div className={cx('course-image')}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}${item?.course?.image_url[0].url}`}
                                            alt="Course"
                                        />
                                    </div>
                                    <div className={cx('course-details')}>
                                        <div className={cx('left-content')}>
                                            <span className={cx('course-name')}>{item.course.name}</span>
                                            <div className={cx('row-group')}>
                                                <label>Đối tượng:</label>
                                                <span>Nữ</span>
                                            </div>
                                            <div className={cx('row-group')}>
                                                <label>Thời gian học:</label>
                                                <span>Thứ 2 đến CN</span>
                                            </div>
                                            <div className={cx('row-group')}>
                                                <label>Số lượng:</label>
                                                <span>8-10 người</span>
                                            </div>
                                        </div>
                                        <div className={cx('right-content')}>
                                            <div className={classesLoveIcon} onClick={() => setStatusLove(!statusLove)}>
                                                {/* <HeartFilled /> */}
                                            </div>
                                            <div className={cx('actions-group')}>
                                                <span>1.500.000 VNĐ</span>
                                                <div className={cx('btn-group')}>
                                                    <button
                                                        onClick={() => {
                                                            // navigate('/user/course-payment');
                                                            navigate(`/course-register/${item?.course?.id}`);
                                                        }}
                                                    >
                                                        Gia hạn
                                                    </button>
                                                    <button className={cx('delete-btn')}>Hủy bỏ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div className={cx('course-item')}>
                            <div className={cx('course-image')}>
                                <img src={images.courseImage} alt="Course" />
                            </div>
                            <div className={cx('course-details')}>
                                <div className={cx('left-content')}>
                                    <span className={cx('course-name')}>
                                        Đào tạo Luật sư tranh chấp thương mại điện tử, hành chính, cao cấp
                                    </span>
                                    <div className={cx('row-group')}>
                                        <label>Đối tượng:</label>
                                        <span>Nữ</span>
                                    </div>
                                    <div className={cx('row-group')}>
                                        <label>Thời gian học:</label>
                                        <span>Thứ 2 đến CN</span>
                                    </div>
                                    <div className={cx('row-group')}>
                                        <label>Số lượng:</label>
                                        <span>8-10 người</span>
                                    </div>
                                </div>
                                <div className={cx('right-content')}>
                                    <div className={classesLoveIcon} onClick={() => setStatusLove(!statusLove)}>
                                        <HeartFilled />
                                    </div>
                                    <div className={cx('actions-group')}>
                                        <span>1.500.000 VNĐ</span>
                                        <div className={cx('btn-group')}>
                                            <button
                                                onClick={() => {
                                                    navigate('/user/course-payment');
                                                }}
                                            >
                                                Gia hạn
                                            </button>
                                            <button className={cx('delete-btn')}>Hủy bỏ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('course-item')}>
                            <div className={cx('course-image')}>
                                <img src={images.courseImage} alt="Course" />
                            </div>
                            <div className={cx('course-details')}>
                                <div className={cx('left-content')}>
                                    <span className={cx('course-name')}>
                                        Đào tạo Luật sư tranh chấp thương mại điện tử, hành chính, cao cấp
                                    </span>
                                    <div className={cx('row-group')}>
                                        <label>Đối tượng:</label>
                                        <span>Nữ</span>
                                    </div>
                                    <div className={cx('row-group')}>
                                        <label>Thời gian học:</label>
                                        <span>Thứ 2 đến CN</span>
                                    </div>
                                    <div className={cx('row-group')}>
                                        <label>Số lượng:</label>
                                        <span>8-10 người</span>
                                    </div>
                                </div>
                                <div className={cx('right-content')}>
                                    <div className={classesLoveIcon} onClick={() => setStatusLove(!statusLove)}>
                                        <HeartFilled />
                                    </div>
                                    <div className={cx('actions-group')}>
                                        <span>1.500.000 VNĐ</span>
                                        <div className={cx('btn-group')}>
                                            <button
                                                onClick={() => {
                                                    navigate('/user/course-payment');
                                                }}
                                            >
                                                Gia hạn
                                            </button>
                                            <button className={cx('delete-btn')}>Hủy bỏ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipationCourse;
