import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateDocuments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import ToastPopup, { notifyError, notifySuccess, notifyWarning } from '~/toast/toast';
import { isValid, validate } from '~/utils/validate';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonComponent from '~/components/layouts/components/Button';
import documentApi from '~/api/Document/documents.Api';
import Select from 'react-select';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const CreateDocuments = () => {
    const params = useParams();
    let formData = new FormData();
    const [, setFiles] = useState([]);
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [documentData, setDocumentData] = useState({
        name: '',
        type: '',
        ecommerce_id: 69,
        image_url: [],
    });
    const TYPE = [
        {
            id: 1,
            title: 'Picture',
        },
        {
            id: 2,
            title: 'Video',
        },
        {
            id: 3,
            title: 'Material (PDF, DOCS, EXCEL..)',
        },
    ];

    const handleSelectChangeType = (selectOption) => {
        {
            selectOption.value === 1
                ? setDocumentData({
                      ...documentData,
                      type: 1,
                  })
                : setDocumentData({
                      ...documentData,
                      type: 2,
                  });
        }
        {
            selectOption.value === 2
                ? setDocumentData({
                      ...documentData,
                      type: 2,
                  })
                : setDocumentData({
                      ...documentData,
                      type: 1,
                  });
        }
        {
            selectOption.value === 3
                ? setDocumentData({
                      ...documentData,
                      type: 3,
                  })
                : setDocumentData({
                      ...documentData,
                      type: 1,
                  });
        }
    };
    const handleFilesChange = async (e) => {
        setFiles(e.target.files);
        for (const key of Object.keys(e.target.files)) {
            formData.append('files', e.target.files[key]);
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData);
            setFiles([]);
            setDocumentData({
                ...documentData,
                image_url: documentData.image_url.concat(
                    res.data.url.map((image) => {
                        return {
                            url: image,
                        };
                    }),
                ),
            });
            notifySuccess(t('text.upload_file_success'));
        } catch (error) {
            notifyError(t('text.upload_file_failed'));
        }
    };
    const isEmpty = (
        <div className="is-empty">
            <h3>{t('text.No_material_available')}</h3>
            {/* <img src={emptyIcon} alt="empty" /> */}
            {/* <FontAwesomeIcon icon={faBatteryEmpty} alt="empty" /> */}
            <input
                type="file"
                multiple
                // accept="img/*"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFilesChange}
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                {t('text.add_material')}
            </label>
        </div>
    );
    const removeImage = (position) => {
        setDocumentData({
            ...documentData,
            image_url: documentData.image_url.filter((_, index) => position !== index),
        });
    };
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
                            <h4>{t('text.add_material')}</h4>
                            {/* <img src={uploadIcon} alt="upload" /> */}
                        </label>
                    </div>
                </div>
            </div>
        );
    };
    const handleSave = async () => {
        console.log('test');
        try {
            const x = validate('enterprise', documentData);
            if (!isValid('enterprise', x)) {
                Object.values(x).forEach((error) => {
                    if (error) {
                        notifyError(error);
                    }
                });
            } else {
                const res = await documentApi.create({
                    ...documentData,
                    name: documentData.name,
                    ecommerce_id: documentData.ecommerce_id,
                    image_url: documentData.image_url.map((item) => {
                        if (item.url) return item.url;
                        return item;
                    }),
                });
                if (res.status === 400) {
                    notifyError(t('text.add_material_failed'));
                } else {
                    notifySuccess(t('text.add_material_success'));
                    setTimeout(() => {
                        navigate('/list-documents');
                    }, 3000);
                }
            }
        } catch (error) {
            notifyError(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <ToastPopup />
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.material')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.add_material')}</span>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('content')}>
                        <div className={cx('content-detail-1')}>
                            <label>{t('text.material_name')}</label>
                            <input
                                className={cx('input-7')}
                                placeholder="Input name"
                                name=""
                                id=""
                                value={documentData.name}
                                onChange={(e) =>
                                    setDocumentData({
                                        ...documentData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cx('content-detail-1')}>
                            <label>{t('text.material_type')}</label>
                            <Select
                                options={TYPE.map((item, index) => {
                                    return {
                                        label: item.title,
                                        value: item.id,
                                    };
                                })}
                                onChange={handleSelectChangeType}
                            />
                        </div>
                        <div className={cx('content-detail-2')}>
                            {/* <FontAwesomeIcon icon={faAdd} />
                            <input
                                // className={cx('input-7')}
                                type="file"
                                multiple
                                style={{
                                    display: 'none'
                                }}
                                id='file-upload'
                                onChange={handleFilesChange}
                            /> */}
                            <label
                                htmlFor="file-upload"
                                className={cx('file-upload')}
                                style={{
                                    color: 'red',
                                    cursor: 'pointer',
                                }}
                            >
                                {documentData.image_url === null || documentData.image_url?.length === 0
                                    ? isEmpty
                                    : isNotEmpty(documentData.image_url)}
                                {/* Thêm tài liệu */}
                            </label>
                        </div>
                        <button className={cx('btn-add')} onClick={handleSave}>
                            {t('text.add_material')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDocuments;
