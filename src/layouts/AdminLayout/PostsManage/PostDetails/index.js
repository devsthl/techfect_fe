import React from 'react';
import classNames from 'classnames/bind';
import styles from './PostDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/home/header';

const cx = classNames.bind(styles);

const PostDetails = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Bài viết</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Danh sách bài viết</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Chi tiết bài viết</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <div className={cx('images-group')}>
                        <div class={cx('image-grid')}>
                            <img
                                class={cx('image-grid-col-2', 'image-grid-row-2')}
                                src={images.postImage}
                                alt="architecture"
                            />
                            <img src={images.postImage} alt="architecture" />
                            <img src={images.postImage} alt="architecture" />
                            <img src={images.postImage} alt="architecture" />
                            <img src={images.postImage} alt="architecture" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
