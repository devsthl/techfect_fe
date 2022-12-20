import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CourseDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/home/header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '~/store/Course/courseSlice';
import { dateCommon } from '~/utils/dateCommon';
import formatCash from '~/utils/formatCash';
import parse from 'html-react-parser';

const cx = classNames.bind(styles);

const CourseDetails = () => {
    const { id } = useParams();
    const { courseById } = useSelector((state) => state.courseReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourseById(id));
    }, [dispatch]);

    console.log('courseById', courseById);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Khóa học</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Danh sách khóa học</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Chi tiết khóa học</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <div className={cx('content-top')}>
                        <div className={cx('course-details')}>
                            <div className={cx('course-images')}>
                                <img
                                    src={
                                        courseById?.image_url === undefined
                                            ? ''
                                            : `${process.env.REACT_APP_API_URL}${courseById?.image_url[0].url}`
                                    }
                                    alt="Error"
                                />
                            </div>
                            <div className={cx('course-info')}>
                                <div className={cx('course-info-top')}>
                                    <span className={cx('course-title')}>{courseById.name}</span>
                                    <div className={cx('course-info-list')}>
                                        <div className={cx('course-details-item')}>
                                            <img src={images.user} alt="User" />
                                            <span>Đối tượng: Nữ {courseById.start_age} - 40 tuổi </span>
                                        </div>
                                        <div className={cx('course-details-item')}>
                                            <img src={images.timer} alt="Timer" />
                                            <span>
                                                Thời gian học:{' '}
                                                {courseById.start_date === ''
                                                    ? 'Thứ Hai'
                                                    : dateCommon[courseById.start_date]}{' '}
                                                đến{' '}
                                                {courseById.end_date === ''
                                                    ? 'Thứ Sáu'
                                                    : dateCommon[courseById.end_date]}{' '}
                                            </span>
                                        </div>
                                        <div className={cx('course-details-item')}>
                                            {/* <img src={images.timer} alt="Timer" /> */}
                                            {/* <span>Chủ khóa học: Công ty ABC </span> */}
                                        </div>
                                        <div className={cx('course-details-item')}>
                                            <img src={images.people} alt="Quantity" />
                                            <span>Số lượng: 8 - 10 người.</span>
                                        </div>
                                        <div className={cx('course-details-item')}>
                                            <img src={images.location} alt="location" />
                                            <span>{courseById?.address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('course-info-bottom')}>
                                    <span className={cx('course-price')}>
                                        {formatCash(courseById?.price?.toString())}đ/khoá
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('action')}>
                            <div className={cx('action-delete')}>
                                <FontAwesomeIcon icon={faTrashCan} />
                                <span>Xóa</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-bottom')}>
                        <h3>Mô tả khóa học</h3>
                        <div className={cx('course-video')}>
                            {/* <iframe width="100%" height="700" src="https://www.youtube.com/embed/XGSy3_Czz8k"></iframe> */}
                        </div>
                        <span className={cx('course-desc')}>
                            {courseById.content === undefined ? '' : parse(`${courseById.content}`)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
