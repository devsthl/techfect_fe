import React from 'react';
import classNames from 'classnames/bind';
import styles from './CreateCourse.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Button, DatePicker, Form, Input, message, Select, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import moment from 'moment';
import coursesApi from '~/api/CourseApi/coursesApi';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const cx = classNames.bind(styles);

const CreateCourse = () => {
    const { RangePicker } = DatePicker;
    const { t } = useTranslation();
    const [formAdd] = Form.useForm();

    const [dataCourse, setDataCourse] = useState({
        name: '',
        type: 2,
        gender: '',
        introduce: '',
        start_age: '',
        end_age: '',
        start_date: '',
        end_date: '',
        amount_min: '',
        amount_max: '',
        address: '',
        price: 0,
        image_url: '',
        course_type: 0,
        content: '',
        begin_date: '',
        over_date: '',
    });
    const formData = new FormData();

    const onChangeDataCourse = (e) => {
        setDataCourse((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleUploadImage = async (e) => {
        if (e.file.status === 'removed') {
            message.success('Xóa thành công');
        } else {
            formData.append('files', e.file);

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData);

            if (res.status === 200) {
                message.success('Upload ảnh thành công');
                setDataCourse({
                    ...dataCourse,
                    image_url: res.data.url[0],
                });
            }
        }
    };

    const handleSubmit = async (value) => {
        const dataSubmit = {
            name: value.name,
            type: 2,
            gender: parseInt(value.gender),
            introduce: value.introduce,
            start_age: parseInt(value.start_age),
            end_age: parseInt(value.end_age),
            start_date: parseInt(value.start_date),
            end_date: parseInt(value.end_date),
            amount_min: parseInt(value.amount_min),
            amount_max: parseInt(value.amount_min),
            address: value.address,
            price: parseInt(value.price),
            image_url: dataCourse.image_url,
            course_type: 0,
            content: parseInt(value.course_type),
            begin_date: dataCourse.begin_date,
            over_date: dataCourse.over_date,
        };

        formAdd.resetFields();

        // const res = await coursesApi.createCourse(dataCourse);
        // if (res.id !== undefined) {
        //     message.success('Tạo khóa học thành công');
        //     setDataCourse({
        //         name: '',
        //         type: 2,
        //         gender: '',
        //         introduce: '',
        //         start_age: '',
        //         end_age: '',
        //         start_date: '',
        //         end_date: '',
        //         amount_min: '',
        //         amount_max: '',
        //         address: '',
        //         price: 0,
        //         image_url: '',
        //         course_type: 0,
        //         content: '',
        //         begin_date: '',
        //         over_date: '',
        //     });
        // } else {
        //     message.error('Tạo khóa học không thành công');
        // }
    };

    return (
        <div className="create-course-wrapper">
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.Courses')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.add_courses')}</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <h3>{t('text.basic_information')}</h3>
                    <div className={cx('create-course-form')}>
                        <Form name="form-create-course" onFinish={handleSubmit} form={formAdd}>
                            <div className={cx('form-wrapper')}>
                                <div className={cx('form-top')}>
                                    <div className={cx('form-top-left')}>
                                        <div className={cx('form-top-left-group')}>
                                            <label htmlFor="name">{t('text.Course_name')}</label>
                                            <Form.Item
                                                className={cx('form-group')}
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Tên khóa học không được để trống',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className={cx('input-7')}
                                                    // id="name"
                                                    // name="name"
                                                    placeholder={t('text.enter_name')}
                                                    onChange={onChangeDataCourse}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={cx('form-top-left-group')}>
                                            <label htmlFor="address">{t('register.form1.address')}</label>
                                            <Form.Item
                                                className={cx('form-group')}
                                                name="address"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Địa chỉ không được để trống',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className={cx('input-7')}
                                                    // id="address"
                                                    // name="address"
                                                    onChange={onChangeDataCourse}
                                                    placeholder={t('login.forgetpassword.detail')}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={cx('group-left')}>
                                            <div className={cx('start-date')}>
                                                <div className={cx('form-top-left-group')}>
                                                    <label htmlFor="start-date">{t('text.Study_from')}</label>
                                                    <Form.Item
                                                        className={cx('form-group')}
                                                        name="start_date"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Ngày học không được để trống',
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            className={cx('select-group')}
                                                            placeholder={t('text.Study_from')}
                                                            onChange={(value) => {
                                                                setDataCourse({
                                                                    ...dataCourse,
                                                                    start_date: value,
                                                                });
                                                            }}
                                                        >
                                                            <Option value="1">Thứ Hai</Option>
                                                            <Option value="2">Thứ Ba</Option>
                                                            <Option value="3">Thứ Tư</Option>
                                                            <Option value="4">Thứ Năm</Option>
                                                            <Option value="5">Thứ Sáu</Option>
                                                            <Option value="6">Thứ Bảy</Option>
                                                            <Option value="7">Chủ Nhật</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className={cx('end-date')}>
                                                <div className={cx('form-top-left-group')}>
                                                    <label htmlFor="end-date">{t('text.to')}</label>
                                                    <Form.Item
                                                        className={cx('form-group')}
                                                        name="end_date"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Ngày học không được để trống',
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            className={cx('select-group')}
                                                            placeholder={t('text.to')}
                                                            onChange={(value) => {
                                                                setDataCourse({
                                                                    ...dataCourse,
                                                                    end_date: value,
                                                                });
                                                            }}
                                                        >
                                                            <Option value="1">Thứ Hai</Option>
                                                            <Option value="2">Thứ Ba</Option>
                                                            <Option value="3">Thứ Tư</Option>
                                                            <Option value="4">Thứ Năm</Option>
                                                            <Option value="5">Thứ Sáu</Option>
                                                            <Option value="6">Thứ Bảy</Option>
                                                            <Option value="0">Chủ Nhật</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('group-left')}>
                                            <div className={cx('start-date')}>
                                                <div className={cx('form-top-left-group')}>
                                                    <label htmlFor="start-age">{t('text.Start_Age')}</label>
                                                    <Form.Item
                                                        className={cx('form-group')}
                                                        name="start_age"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Tuổi bắt đầu không được để trống',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            className={cx('input-7')}
                                                            id="start_age"
                                                            name="start_age"
                                                            onChange={onChangeDataCourse}
                                                            placeholder={t('text.Start_Age')}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className={cx('end-date')}>
                                                <div className={cx('form-top-left-group')}>
                                                    <label htmlFor="end-age">{t('text.End Age')}</label>
                                                    <Form.Item
                                                        className={cx('form-group')}
                                                        name="end_age"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Tuổi kết thúc không được để trống',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            className={cx('input-7')}
                                                            id="end_age"
                                                            name="end_age"
                                                            onChange={onChangeDataCourse}
                                                            placeholder={t('text.End Age')}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-top-right')}>
                                        <div className={cx('form-top-right-group')}>
                                            <label htmlFor="amount">{t('text.Start_End_date')}</label>

                                            <Form.Item
                                                name="start_end_date"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Ngày bắt đầu/kết thúc không được để trống',
                                                    },
                                                ]}
                                            >
                                                <RangePicker
                                                    className={cx('range-picker')}
                                                    // locale={locale_vi}
                                                    format="YYYY-MM-DD"
                                                    disabledDate={(currentDate) => {
                                                        return currentDate && currentDate < moment().startOf('day');
                                                        //không được chọn ngày trước ngày hôm nay
                                                    }}
                                                    onChange={(date, dateString) => {
                                                        setDataCourse({
                                                            ...dataCourse,
                                                            begin_date: dateString[0],
                                                            over_date: dateString[1],
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className={cx('form-top-right-group')}>
                                            <label htmlFor="website-input">{t('register.form1.gender')}</label>
                                            <Form.Item
                                                className={cx('form-group')}
                                                name="gender"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Giới tính không được để trống',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    className={cx('select-group')}
                                                    placeholder={t('register.form1.male/female')}
                                                    onChange={(value) => {
                                                        setDataCourse({
                                                            ...dataCourse,
                                                            gender: value,
                                                        });
                                                    }}
                                                >
                                                    <Option value="0">{t('register.form1.male')}</Option>
                                                    <Option value="1">{t('register.form1.female')}</Option>
                                                    <Option value="2">{t('text.other')}</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>

                                        <div className={cx('form-top-right-group')}>
                                            <label htmlFor="website-input">{t('text.Course_type')}</label>
                                            <Form.Item
                                                className={cx('form-group')}
                                                name="course_type"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Loại khóa học không được để trống',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    className={cx('select-group')}
                                                    placeholder={t('text.Course_type')}
                                                    onChange={(value) => {
                                                        setDataCourse({
                                                            ...dataCourse,
                                                            course_type: parseInt(value),
                                                        });
                                                    }}
                                                >
                                                    <Option value="0">Miễn phí</Option>
                                                    <Option value="1">Có phí</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>

                                        <div className={cx('form-top-right-group')}>
                                            <label htmlFor="website-input">{t('text.Price_if')} </label>
                                            <Form.Item className={cx('form-group')} name="price">
                                                <Input
                                                    className={cx('input-3')}
                                                    // id="price"
                                                    // type="number"
                                                    // name="price"
                                                    onChange={onChangeDataCourse}
                                                    placeholder={t('text.enter_price')}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('participate-group')}>
                                    <div className={cx('participate')}>
                                        <label htmlFor="amount_max">{t('text.Number_of_participants_from')}</label>
                                        <Form.Item
                                            className={cx('form-group')}
                                            name="amount-max"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Số người tham gia không được để trống',
                                                },
                                            ]}
                                        >
                                            <Input
                                                className={cx('input-3')}
                                                // id="amount_max"
                                                // name="amount_max"
                                                onChange={onChangeDataCourse}
                                                placeholder={t('text.Number_of_participants_from')}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('participate')}>
                                        <label htmlFor="amount_min">{t('text.to')}</label>
                                        <Form.Item
                                            className={cx('form-group')}
                                            name="amount_min"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Số người tham gia không được để trống',
                                                },
                                            ]}
                                        >
                                            <Input
                                                className={cx('input-3')}
                                                // id="amount_min"
                                                // name="amount_min"
                                                onChange={onChangeDataCourse}
                                                placeholder={t('text.enter_number_of_participants')}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={cx('form-bottom')}>
                                    <div className={cx('form-bottom-group')}>
                                        <label htmlFor={cx('introduce')}>{t('text.description')}</label>
                                        <Form.Item
                                            className={cx('form-group')}
                                            name="introduce"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Mô tả không được để trống',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea
                                                className={cx('input-textarea')}
                                                id="introduce"
                                                onChange={onChangeDataCourse}
                                                name="introduce"
                                                placeholder={t('text.enter_description')}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('content')}>
                                        <label htmlFor="">{t('text.Course_content')}</label>
                                        <Form.Item
                                            name="content"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nội dung khóa học không được để trống',
                                                },
                                            ]}
                                        >
                                            <JoditEditor
                                                className="content"
                                                name="content"
                                                value={dataCourse.content}
                                                onChange={(value) => setDataCourse({ ...dataCourse, content: value })}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            name="image_url"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Ảnh khóa học không được để trống',
                                                },
                                            ]}
                                        >
                                            <Space
                                                direction="vertical"
                                                style={{
                                                    width: '100%',
                                                    marginTop: '30px',
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
                                                    onRemove={() =>
                                                        setDataCourse({
                                                            ...dataCourse,
                                                            image_url: '',
                                                        })
                                                    }
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload Images</Button>
                                                </Upload>
                                            </Space>
                                        </Form.Item>
                                    </div>
                                    <div className={cx('action-submit')}>
                                        <button>{t('text.add_courses')}</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
