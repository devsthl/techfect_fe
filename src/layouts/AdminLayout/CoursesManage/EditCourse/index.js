import React from 'react';
import classNames from 'classnames/bind';
import styles from './EditCourse.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Button, DatePicker, Form, Input, message, Select, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import moment from 'moment';
import coursesApi from '~/api/CourseApi/coursesApi';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCourseById } from '~/store/Course/courseSlice';

const { Option } = Select;

const cx = classNames.bind(styles);

const EditCourse = () => {
    const { RangePicker } = DatePicker;
    const formData = new FormData();
    const { id } = useParams();
    const { courseById } = useSelector((state) => state.courseReducer);
    const [formEdit] = Form.useForm();
    const dispatch = useDispatch();
    const dateFormat = 'YYYY-MM-DD';

    const [dataCourse, setDataCourse] = useState({
        name: '',
        // type: '',
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
        content: '',
        begin_date: '',
        over_date: '',
    });

    // const data = {
    //     name_course: courseById.name,
    //     // type: '',
    //     gender: courseById.gender,
    //     introduce: courseById.introduce,
    //     start_age: courseById.start_age,
    //     end_age: courseById.end_age,
    //     start_date: courseById.start_date,
    //     end_date: courseById.end_date,
    //     amount_min: courseById.amount_min,
    //     amount_max: courseById.amount_max,
    //     address: courseById.address,
    //     price: courseById.price,
    //     image_url: courseById.image_url,
    //     content: courseById.content,
    //     // begin_date: courseById.begin_date,
    //     // over_date: courseById.over_date,
    // };

    // formEdit.setFieldsValue(data);

    useEffect(() => {
        dispatch(getCourseById(id));
    }, []);

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
            message.success('X??a th??nh c??ng');
        } else {
            formData.append('files', e.file);

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData);

            if (res.status === 200) {
                message.success('Upload ???nh th??nh c??ng');
                setDataCourse({
                    ...dataCourse,
                    image_url: res.data.url[0],
                });
            }
        }
    };

    const handleSubmit = async () => {
        const res = await coursesApi.createCourse(dataCourse);
    };

    return (
        <div className="edit-course-wrapper">
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Kh??a h???c</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Th??m kh??a h???c</span>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <h3>Th??ng tin c?? b???n</h3>
                    <div className={cx('create-course-form')}>
                        <Form name="course-form" onFinish={handleSubmit} form={formEdit}>
                            <div className={cx('form-wrapper')}>
                                <div className={cx('form-top')}>
                                    <div className={cx('form-top-left')}>
                                        <div className={cx('form-top-left-group')}>
                                            <label htmlFor="name">T??n kh??a h???c</label>
                                            <Form.Item className={cx('form-group')} name="name">
                                                <Input
                                                    className={cx('input-7')}
                                                    id="name"
                                                    name="name"
                                                    defaultValue={courseById.name}
                                                    key={courseById.id}
                                                    placeholder="Nh???p t??n"
                                                    onChange={onChangeDataCourse}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={cx('form-top-left-group')}>
                                            <label htmlFor="address">?????a ch???</label>
                                            <Form.Item className={cx('form-group')} name="address">
                                                <Input
                                                    className={cx('input-7')}
                                                    id="address"
                                                    name="address"
                                                    defaultValue={courseById.address}
                                                    key={courseById.id}
                                                    onChange={onChangeDataCourse}
                                                    placeholder="Nh???p ?????a ch???"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={cx('group-left')}>
                                            <div className={cx('start-date')}>
                                                <div className={cx('form-top-left-group')}>
                                                    <label htmlFor="start_date">H???c t???</label>
                                                    <Form.Item className={cx('form-group')} name="start_date">
                                                        <Select
                                                            className={cx('select-group')}
                                                            placeholder="T??? ng??y"
                                                            defaultValue={courseById.start_date}
                                                            key={courseById.id}
                                                            onChange={(value) => {
                                                                setDataCourse({
                                                                    ...dataCourse,
                                                                    start_date: value,
                                                                });
                                                            }}
                                                        >
                                                            <Option value="1">Th??? Hai</Option>
                                                            <Option value="2">Th??? Ba</Option>
                                                            <Option value="3">Th??? T??</Option>
                                                            <Option value="4">Th??? N??m</Option>
                                                            <Option value="5">Th??? S??u</Option>
                                                            <Option value="6">Th??? B???y</Option>
                                                            <Option value="0">Ch??? Nh???t</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className={cx('end-date')}>
                                                <div className={cx('form-top-left-group')}>
                                                    <label htmlFor="end_date">?????n ng??y</label>
                                                    <Form.Item className={cx('form-group')} name="end_date">
                                                        <Select
                                                            className={cx('select-group')}
                                                            placeholder="?????n ng??y"
                                                            defaultValue={courseById.end_date}
                                                            key={courseById.id}
                                                            onChange={(value) => {
                                                                setDataCourse({
                                                                    ...dataCourse,
                                                                    end_date: value,
                                                                });
                                                            }}
                                                        >
                                                            <Option value="1">Th??? Hai</Option>
                                                            <Option value="2">Th??? Ba</Option>
                                                            <Option value="3">Th??? T??</Option>
                                                            <Option value="4">Th??? N??m</Option>
                                                            <Option value="5">Th??? S??u</Option>
                                                            <Option value="6">Th??? B???y</Option>
                                                            <Option value="0">Ch??? Nh???t</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('group-left')}>
                                            <div className={cx('start-date')}>
                                                <div className={cx('form-top-left-group')}>
                                                    <label htmlFor="start_age">Tu???i</label>
                                                    <Form.Item className={cx('form-group')} name="start_age">
                                                        <Input
                                                            className={cx('input-7')}
                                                            id="start_age"
                                                            name="start_age"
                                                            defaultValue={courseById.start_age}
                                                            key={courseById.id}
                                                            onChange={onChangeDataCourse}
                                                            placeholder="Nh???p tu???i t???"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className={cx('end-date')}>
                                                <div className={cx('form-top-left-group')}>
                                                    <label htmlFor="end_age">?????n tu???i</label>
                                                    <Form.Item className={cx('form-group')} name="end_age">
                                                        <Input
                                                            className={cx('input-7')}
                                                            id="end_age"
                                                            name="end_age"
                                                            defaultValue={courseById.end_age}
                                                            key={courseById.id}
                                                            onChange={onChangeDataCourse}
                                                            placeholder="?????n tu???i"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-top-right')}>
                                        <div className={cx('form-top-right-group')}>
                                            <label htmlFor="amount">Ng??y b???t ?????u/ k???t th??c</label>

                                            <Form.Item name="date">
                                                <RangePicker
                                                    className={cx('range-picker')}
                                                    // locale={locale_vi}
                                                    defaultValue={[
                                                        moment(courseById.over_date.substring, dateFormat),
                                                        moment(courseById.begin_date, dateFormat),
                                                    ]}
                                                    format="YYYY-MM-DD"
                                                    disabledDate={(currentDate) => {
                                                        return currentDate && currentDate < moment().startOf('day');
                                                        //kh??ng ???????c ch???n ng??y tr?????c ng??y h??m nay
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
                                            <label htmlFor="gender">?????i t?????ng c?? th??? tham gia</label>
                                            <Form.Item className={cx('form-group')} name="gender">
                                                <Select
                                                    className={cx('select-group')}
                                                    placeholder="Nam, N???"
                                                    defaultValue={courseById.gender}
                                                    key={courseById.id}
                                                    onChange={(value) => {
                                                        setDataCourse({
                                                            ...dataCourse,
                                                            gender: value,
                                                        });
                                                    }}
                                                >
                                                    <Option value={0}>Nam</Option>
                                                    <Option value={1}>N???</Option>
                                                    <Option value={2}>Kh??c</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('participate-group')}>
                                    <div className={cx('participate')}>
                                        <label htmlFor="amount_max">S??? ng?????i tham gia t???</label>
                                        <Form.Item className={cx('form-group')} name="amount_max">
                                            <Input
                                                className={cx('input-3')}
                                                id="amount_max"
                                                name="amount_max"
                                                key={courseById.id}
                                                defaultValue={courseById.amount_max}
                                                onChange={onChangeDataCourse}
                                                placeholder="Nh???p s??? ng?????i tham gia"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('participate')}>
                                        <label htmlFor="amount_min">?????n</label>
                                        <Form.Item className={cx('form-group')} name="amount_min">
                                            <Input
                                                className={cx('input-3')}
                                                id="amount_min"
                                                name="amount_min"
                                                key={courseById.id}
                                                defaultValue={courseById.amount_min}
                                                onChange={onChangeDataCourse}
                                                placeholder="Nh???p s??? ng?????i tham gia"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={cx('form-bottom')}>
                                    <div className={cx('form-bottom-group')}>
                                        <label htmlFor={cx('introduce')}>M?? t???</label>
                                        <Form.Item className={cx('form-group')} name="introduce">
                                            <Input.TextArea
                                                className={cx('input-textarea')}
                                                id="introduce"
                                                defaultValue={courseById.introduce}
                                                key={courseById.id}
                                                onChange={onChangeDataCourse}
                                                name="introduce"
                                                placeholder="Nh???p n???i dung m?? t???"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('content')}>
                                        <label htmlFor="">N???i dung kh??a h???c</label>
                                        <JoditEditor
                                            className="content"
                                            name="content"
                                            defaultValue={courseById.content}
                                            value={dataCourse.content}
                                            onChange={(value) => setDataCourse({ ...dataCourse, content: value })}
                                        />
                                    </div>
                                    <div>
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
                                    </div>
                                    <div className={cx('action-submit')}>
                                        <button>Th??m kh??a h???c</button>
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

export default EditCourse;
