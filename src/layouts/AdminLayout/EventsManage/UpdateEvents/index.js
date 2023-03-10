import axios from 'axios';
import './UpdateEvents.scss';
import ToastPopup, { notifyError, notifySuccess } from '~/toast/toast';
import Select from 'react-select';
import eventsApi from '~/api/eventsApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import moment from 'moment';
import { isValid, validate } from '~/utils/validate';
import images from '~/assets/images/home/header';
import { getAllEvents } from '~/store/Categories/eventSlice';
import { t } from 'i18next';

const UpdateEvents = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { listEcommerce } = useSelector((state) => state.ecommerReducer)
    const [eventData, setEventData] = useState({
        name: '',
        content: '',
        cost: '',
        des: '',
        ecommerce_id: 69,
        image_url: [],
        start_time: '',
        end_time: '',
        address: '',
        type: '',
    });
    const TYPE = [
        {
            id: 1,
            title: t('text.WORKSHOPS'),
        },
        {
            id: 2,
            title: t('text.Competition'),
        },
    ];
    const [, setFiles] = useState([]);

    let formData = new FormData();

    const getEventData = useCallback(async () => {
        const res = await eventsApi.get(params.id);
        setEventData(res);
    }, [params.id]);

    useEffect(() => {
        getEventData();
    }, [getEventData]);
    const formatDate = (date) => {
        return moment(date).format('yyyy-MM-DD');
    };
    const handleSelectChangeType = (selectOption) => {
        {
            selectOption.value === 1
                ? setEventData({
                      ...eventData,
                      type: 4,
                  })
                : setEventData({
                      ...eventData,
                      type: 3,
                  });
        }
        {
            selectOption.value === 2
                ? setEventData({
                      ...eventData,
                      type: 3,
                  })
                : setEventData({
                      ...eventData,
                      type: 4,
                  });
        }
    };
    const removeImage = (position) => {
        setEventData({
            ...eventData,
            image_url: eventData.image_url.filter((_, index) => position !== index),
        });
    };
    const handleFilesChange = async (e) => {
        setFiles(e.target.files);

        for (const key of Object.keys(e.target.files)) {
            formData.append('files', e.target.files[key]);
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData);
            setFiles([]);

            setEventData({
                ...eventData,
                image_url: eventData.image_url.concat(
                    res.data.url.map((image) => {
                        return {
                            url: image,
                        };
                    }),
                ),
            });
            notifySuccess('Upload ???nh th??nh c??ng');
        } catch (error) {
            notifyError('Upload ???nh kh??ng th??nh c??ng');
        }
    };
    const isEmpty = (
        <div className="is-empty">
            <h3>Hi???n t???i ch??a c?? ???nh</h3>
            {/* <img alt="empty" /> */}
            <input
                type="file"
                multiple
                accept="img/*"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFilesChange}
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                Th??m ???nh
            </label>
        </div>
    );
    const isNotEmpty = (arr) => {
        return (
            <div className="image-container">
                <div className="big-image">
                    <div className="delete-image" onClick={() => removeImage(0)}>
                        X
                    </div>
                    <img src={`${process.env.REACT_APP_API_URL}/${arr[0].url}`} alt="big" />
                </div>
                <div className="small-image-container">
                    {arr.map((item, index) => {
                        if (index !== 0) {
                            return (
                                <div
                                    className="small-image"
                                    key={item.url}
                                    style={{
                                        backgroundImage: `url(${process.env.REACT_APP_API_URL}/${item.url})`,
                                    }}
                                >
                                    <div className="delete-image" onClick={() => removeImage(index)}>
                                        X
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div className="small-image upload">
                        <input
                            className="item__input"
                            type="file"
                            id="file-upload"
                            multiple
                            accept="image/*"
                            onChange={handleFilesChange}
                        />
                        <label htmlFor="file-upload">
                            <h4>Th??m ???nh</h4>
                            <img src={images.postImage} alt="upload" />
                        </label>
                    </div>
                </div>
            </div>
        );
    };
    const handleSave = async () => {
        try {
            const x = validate('event', eventData);
            if (!isValid('event', x)) {
                Object.values(x).forEach((error) => {
                    if (error) {
                        notifyError(error);
                    }
                });
            } else {
                const res = await eventsApi.edit({
                    ...eventData,
                    ecommerce_id: eventData.ecommerce_id,
                    description: eventData.des,
                    image_url: eventData.image_url.map((item) => {
                        if (item.url) return item.url;
                        return item;
                    }),
                });
                if (res.status === 400) {
                    notifyError('Thay ?????i s??? ki???n kh??ng th??nh c??ng');
                } else {
                    notifySuccess('Thay ?????i th??ng tin s??? ki???n th??nh c??ng');
                    setTimeout(() => {
                        navigate('/list-events');
                        // getEventData();
                    }, 1000);
                }
            }
        } catch (error) {
            notifyError(error);
        }
    };

    return (
        <div className="eventForm">
            <ToastPopup />
            <h3 className="eventForm__title">{eventData.name}</h3>
            <div className="main-form">
                <div className="main-form__title">
                    <p>Th??ng tin chung</p>
                </div>
                <div className="main-form__item w100">
                    <label htmlFor="" className="item__label">
                        T??n s?? ki???n<span className="warning">*</span>
                    </label>
                    <input
                        name=""
                        id=""
                        value={eventData.name}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                name: e.target.value,
                            })
                        }
                        className="item__input"
                    />
                </div>
                <div className="main-form__item w50">
                    <label htmlFor="" className="item__label">
                        Gi?? v??
                    </label>
                    <input
                        type="number"
                        name=""
                        id=""
                        min={0}
                        value={eventData.cost}
                        onChange={(e) => {
                            setEventData({
                                ...eventData,
                                cost: e.target.value,
                            });
                        }}
                        className="item__input"
                    />
                </div>
                <div className="main-form__item w50">
                    <label htmlFor="" className="item__label">
                        ?????a ch??? chi ti???t
                    </label>
                    <input
                        type="text"
                        name=""
                        id=""
                        value={eventData.address}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                address: e.target.value,
                            })
                        }
                        className="item__input"
                    />
                </div>
                <div className="main-form__item w50">
                    <label htmlFor="" className="item__label">
                        B???t ?????u
                    </label>
                    <input
                        type="date"
                        name=""
                        id=""
                        className="team__input"
                        value={formatDate(eventData.start_time)}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                start_time: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="main-form__item w50">
                    <label htmlFor="" className="item__label">
                        K???t th??c
                    </label>
                    <input
                        type="date"
                        name=""
                        id=""
                        className="item__input"
                        value={formatDate(eventData.end_time)}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                end_time: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="main-form__item w100">
                    <label htmlFor="" className="item__label">
                        M?? t???
                    </label>
                    <input
                        type="text"
                        name=""
                        id=""
                        value={eventData.des}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                des: e.target.value,
                            })
                        }
                        className="item__input"
                    />
                </div>
                <div className="main-form__item w50">
                    <label htmlFor="" className="item__label">
                        Lo???i s??? ki???n
                    </label>
                    <Select
                        // value={}
                        // defaultValue={ }
                        placeholder="Ch???n lo???i s??? ki???n"
                        options={TYPE.map((item, index) => {
                            return {
                                label: item.title,
                                value: item.id,
                            };
                        })}
                        onChange={handleSelectChangeType}
                    />
                </div>
                <div className="main-form__item w100">
                    <label htmlFor="" className="item__label">
                        M?? t??? chi ti???t
                    </label>
                    <input
                        type="text"
                        name=""
                        id=""
                        value={eventData.content}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                content: e.target.value,
                            })
                        }
                    />
                </div>
            </div>

            <div className="main-form">
                <div className="main-form__title">
                    <p>H??nh ???nh s??? ki???n</p>
                </div>
                <div className="main-form_item w100">
                    {eventData.image_url === null || eventData.image_url?.length === 0
                        ? isEmpty
                        : isNotEmpty(eventData.image_url)}
                </div>
            </div>
            <div className="button-action-container">
                {/* {checkAddOrEditForm(params) && ( */}
                {/* <button className="button-action-delete">
                    <img src={images.CODImage} alt="icon" />
                    <p>X??a</p>
                </button> */}
                {/* )} */}
                <button className="button-action-save" onClick={handleSave}>
                    <p>L??u</p>
                </button>
            </div>
        </div>
    );
};

export default UpdateEvents;
