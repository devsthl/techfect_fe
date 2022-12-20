import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, Upload, message, Space, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import newsApi from '~/api/NewsApi/newsApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCategoryNews } from '~/store/News/newsSlice';
import { useTranslation } from 'react-i18next';

const { Dragger } = Upload;
const { Option } = Select;

const cx = classNames.bind(styles);

const CreatePost = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { listCategoryNews } = useSelector((state) => state.newsReducer);

    const [newsData, setNewsData] = useState({
        name: '',
        description: '',
        content: '',
        image_url: [],
        news_category_id: '',
        ecommerce_id: 69,
    });

    const [newsImage, setNewsImage] = useState([]);

    useEffect(() => {
        dispatch(getAllCategoryNews());
    }, []);

    const handleChangeData = (e) => {
        setNewsData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    let formData = new FormData();

    const handleUploadImage = async (e) => {
        formData.append('files', e.file);

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData);

        if (res.status === 200) {
            const tpArray = [];
            tpArray.push(res.data.url[0]);

            setNewsImage(tpArray);
        }
    };

    const handleSubmit = async (value) => {
        console.log(123123, value);
        const data = {
            name: value.name,
            description: value.description,
            content: value.content,
            image_url: newsImage,
            news_category_id: value.news_category_id,
            ecommerce_id: 69,
        };

        const res = await newsApi.createNews(data);
        if (res.message === 'error') {
            message.error('Đăng bài viết lỗi');
        } else {
            message.success('Đăng bài viết thành công');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.posts')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.create_post')}</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <div className={cx('content-main-wrapper')}>
                        <div className={cx('create-post-form')}>
                            <Form onFinish={handleSubmit}>
                                <div className={cx('form-wrapper')}>
                                    <div className={cx('form-group-wrapper')}>
                                        <label htmlFor="name">{t('text.title')}</label>
                                        <Form.Item
                                            className={cx('form-group')}
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tiêu đề không được để trống',
                                                },
                                            ]}
                                        >
                                            <Input
                                                // className={cx('input-10')}
                                                // id="title"
                                                // name="name"

                                                placeholder={t('text.enter_title')}
                                                value={newsData.name}
                                                onChange={(e) => handleChangeData(e)}
                                            />
                                        </Form.Item>
                                    </div>
                                    {/* <div className={cx('select-group-wrapper')}> */}
                                    <div>
                                        <label htmlFor="select-group">{t('text.category')}</label>
                                        <Form.Item
                                            style={{ width: '300px' }}
                                            name="news_category_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tiêu đề không được để trống',
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder={t('text.category')}
                                                onChange={(value) => {
                                                    setNewsData({
                                                        ...newsData,
                                                        news_category_id: parseInt(value),
                                                    });
                                                }}
                                            >
                                                {listCategoryNews.map((item) => {
                                                    return <Option value={item.id}>{item.name}</Option>;
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className={cx('form-group-wrapper')}>
                                        <label htmlFor="description">{t('text.description')}</label>
                                        <Form.Item
                                            className={cx('form-group')}
                                            name="description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Mô tả không được để trống',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea
                                                style={{
                                                    minHeight: '100px',
                                                }}
                                                // className={cx('input-textarea')}
                                                // id="description"
                                                // name="description"
                                                placeholder={t('text.content')}
                                                value={newsData.description}
                                                onChange={(e) => handleChangeData(e)}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('form-group-wrapper')}>
                                        <label htmlFor="">{t('text.content')}</label>
                                        <Form.Item
                                            name="content"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nội dung không được để trống',
                                                },
                                            ]}
                                        >
                                            <JoditEditor
                                                className="content"
                                                name="content"
                                                value={newsData.content}
                                                onChange={(value) => setNewsData({ ...newsData, content: value })}
                                            />
                                        </Form.Item>
                                    </div>
                                    {/* <div className={cx('select-status-group')}> */}
                                    <div>
                                        <label htmlFor="select-group">{t('text.status')}</label>
                                        <Form.Item
                                            name="status"
                                            style={{
                                                width: '260px',
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Trạng thái không được để trống',
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder={t('text.status')}
                                                onChange={(value) => {
                                                    setNewsData({
                                                        ...newsData,
                                                        status: parseInt(value),
                                                    });
                                                }}
                                            >
                                                <Option value="0">{t('text.waiting_for_approval')}</Option>
                                                <Option value="1">{t('text.reviewed')}</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className={cx('upload-images')}>
                                        <h3>{t('text.picture')}</h3>
                                        <Form.Item
                                            name="image_url"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Ảnh không được để trống',
                                                },
                                            ]}
                                        >
                                            <Space
                                                direction="vertical"
                                                style={{
                                                    width: '100%',
                                                }}
                                                size="large"
                                            >
                                                <Upload
                                                    multiple
                                                    listType="picture"
                                                    showUploadList={{ showRemoveIcon: true }}
                                                    accept=".png,.jpg"
                                                    maxCount={1}
                                                    onChange={handleUploadImage}
                                                    beforeUpload={(file) => {
                                                        console.log({ file });
                                                        return false;
                                                    }}
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload Images</Button>
                                                </Upload>
                                            </Space>
                                        </Form.Item>
                                    </div>
                                    <div className={cx('action-submit')}>
                                        <button className={cx('btn-submit')}>{t('text.post')}</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
