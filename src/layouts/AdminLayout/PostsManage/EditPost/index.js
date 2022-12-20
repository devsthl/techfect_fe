import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, Upload, message, Space, Button, Select, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import newsApi from '~/api/NewsApi/newsApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryNews, getNewsById } from '~/store/News/newsSlice';

const { Dragger } = Upload;
const { Option } = Select;

const cx = classNames.bind(styles);

const EditPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { newsById, loading, listCategoryNews } = useSelector((state) => state.newsReducer);

    useEffect(() => {
        dispatch(getNewsById(id));
        dispatch(getAllCategoryNews());
    }, [id, dispatch]);

    const [newsData, setNewsData] = useState({
        name: newsById.name,
        des: newsById.des,
        content: newsById.content,
        image_url: [],
        news_category_id: newsById?.news_categories?.id,
        ecommerce_id: 69,
    });

    // useEffect(() => {
    //     setNewsData({
    //         name: newsById.name,
    //         des: newsById.des,
    //         content: newsById.content,
    //         image_url: newsById.image_url,
    //         news_category_id: newsById.news_categories,
    //         ecommerce_id: 69,
    //     });
    // }, [newsById]);

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

            setNewsData({
                ...newsData,
                image_url: tpArray,
            });
        }
    };

    const handleSubmit = async () => {
        const res = await newsApi.edit(id, newsData);

        if (res.message === 'error') {
            message.error('Có lỗi xảy ra');
        } else {
            message.success('Chỉnh sửa thành công');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Spin spinning={loading}>
                <div className={cx('inner')}>
                    <div className={cx('header-main')}>
                        <div className={cx('header-title')}>
                            <span>Bài viết</span>
                            <FontAwesomeIcon icon={faAngleRight} />
                            <span>Tạo bài viết</span>
                        </div>
                    </div>
                    <div className={cx('content-main')}>
                        <div className={cx('content-main-wrapper')}>
                            <div className={cx('create-post-form')}>
                                <Form onFinish={handleSubmit}>
                                    <div className={cx('form-wrapper')}>
                                        <div className={cx('form-group-wrapper')}>
                                            <label htmlFor="name">Tiêu đề</label>
                                            <Form.Item className={cx('form-group')} name="name">
                                                <Input
                                                    className={cx('input-10')}
                                                    id="name"
                                                    name="name"
                                                    placeholder="Nhập tiêu đề"
                                                    defaultValue={newsById.name}
                                                    key={newsById.id}
                                                    value={newsById.name}
                                                    onChange={(e) => handleChangeData(e)}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={cx('select-group-wrapper')}>
                                            <label htmlFor="select-group">Danh mục</label>
                                            <Select
                                                placeholder="Danh mục"
                                                defaultValue={newsById?.news_categories?.id}
                                                key={newsById.id}
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
                                        </div>
                                        <div className={cx('form-group-wrapper')}>
                                            <label htmlFor="description">Mô tả</label>
                                            <Form.Item className={cx('form-group')} name="description">
                                                <Input.TextArea
                                                    className={cx('input-textarea')}
                                                    id="description"
                                                    name="des"
                                                    placeholder="Nội dung"
                                                    defaultValue={newsById.des}
                                                    key={newsById.id}
                                                    value={newsData.des}
                                                    onChange={(e) => handleChangeData(e)}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={cx('form-group-wrapper')}>
                                            <label htmlFor="">Mô tả sản phẩm</label>
                                            <JoditEditor
                                                className="content"
                                                name="content"
                                                value={newsById.content}
                                                onChange={(value) => setNewsData({ ...newsData, content: value })}
                                            />
                                        </div>
                                        {/* <div className={cx('select-status-group')}>
                                            <label htmlFor="select-group">Trạng thái</label>
                                            <Select
                                                placeholder="Trạng thái"
                                                // defaultValue={newsById.}
                                                onChange={(value) => {
                                                    setNewsData({
                                                        ...newsData,
                                                        status: parseInt(value),
                                                    });
                                                }}
                                            >
                                                <Option value="0">Chờ xét duyệt</Option>
                                                <Option value="1">Đã xét duyệt</Option>
                                            </Select>
                                        </div> */}
                                        <div className={cx('upload-images')}>
                                            <h3>Hình ảnh</h3>
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
                                        </div>
                                        <div className={cx('action-submit')}>
                                            <button className={cx('btn-submit')}>Lưu</button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default EditPost;
