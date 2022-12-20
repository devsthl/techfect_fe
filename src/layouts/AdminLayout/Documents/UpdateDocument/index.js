import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UpdateDocuments.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faAngleRight, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import ToastPopup, { notifyError, notifySuccess, notifyWarning } from '~/toast/toast';
import { isValid, validate } from '~/utils/validate';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import ButtonComponent from '~/components/layouts/components/Button';
import documentApi from '~/api/Document/documents.Api';
import Select from "react-select";
import axios from "axios";

const cx = classNames.bind(styles)
const UpdateDocuments = () => {
    const params = useParams();
    let formData = new FormData();
    const [, setFiles] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [documentData, setDocumentData] = useState({
        name: "",
        type: "",
        ecommerce_id: 69,
        image_url: [
        ],
    })
    const getData = useCallback(async () => {
        const res = await documentApi.get(params.id);
        setDocumentData(res)
        console.log("document", res);
    }, [params.id])
    useEffect(() => {
        getData();
    }, [getData])
    const TYPE = [
        {
            id: 1,
            title: "Ảnh"
        },
        {
            id: 2,
            title: "Video"
        },
        {
            id: 3,
            title: "Tài liệu (PDF, DOCS, EXCEL..)"
        },
    ]

    const handleSelectChangeType = (selectOption) => {
        {
            selectOption.value === 1 ?
                setDocumentData({
                    ...documentData,
                    type: 1
                })
                :
                setDocumentData({
                    ...documentData,
                    type: 2
                })
        }
        {
            selectOption.value === 2 ?
                setDocumentData({
                    ...documentData,
                    type: 2
                })
                :
                setDocumentData({
                    ...documentData,
                    type: 1
                })
        }
        {
            selectOption.value === 3 ?
                setDocumentData({
                    ...documentData,
                    type: 3
                })
                :
                setDocumentData({
                    ...documentData,
                    type: 1
                })
        }
    }
    const handleFilesChange = async (e) => {
        setFiles(e.target.files);
        for (const key of Object.keys(e.target.files)) {
            formData.append("files", e.target.files[key]);
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
            notifySuccess("Upload file thành công");
        } catch (error) {
            notifyError("Upload file không thành công");
        }
    };
    const isEmpty = (
        <div className="is-empty">
            <h3>Hiện tại chưa có tài liệu</h3>
            {/* <img src={emptyIcon} alt="empty" /> */}
            {/* <FontAwesomeIcon icon={faBatteryEmpty} alt="empty" /> */}
            <input
                type="file"
                multiple
                // accept="img/*"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFilesChange}
            />
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                Thêm tài liệu
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
                            <h4>Thêm tài liệu</h4>
                            {/* <img src={uploadIcon} alt="upload" /> */}
                        </label>
                    </div>
                </div>
            </div>
        );
    };
    const handleSave = async () => {
        try {
            const x = validate("enterprise", documentData);
            if (!isValid("enterprise", x)) {
                Object.values(x).forEach((error) => {
                    if (error) {
                        notifyError(error)
                    }
                })
            } else {
                const res = await documentApi.edit({
                    ...documentData,
                    name: documentData.name,
                    ecommerce_id: documentData.ecommerce_id,
                    image_url: documentData.image_url.map((item) => {
                        if (item.url) return item.url;
                        return item;
                    })
                })
                if (res.status === 400) {
                    notifyError("Sửa tài liệu không thành công")
                } else {
                    notifySuccess("Sửa tài liệu thành công")
                    setTimeout(() => {
                        navigate('/list-documents')
                    }, 3000)
                }
            }
        } catch (error) {
            notifyError(error)
        }
    }
    return (
        <div className={cx('wrapper')}>
            <ToastPopup />
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Tài liệu</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Sửa tài liệu</span>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('content')}>
                        <div className={cx('content-detail-1')}>
                            <label>Tên tài liệu</label>
                            <input
                                className={cx('input-7')}
                                placeholder="Nhập tên"
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
                            <label>Loại tài liệu</label>
                            <Select
                                value={TYPE.title}
                                options={TYPE.map((item, index) => {
                                    return {
                                        label: item.title,
                                        value: item.id
                                    }
                                })}
                                onChange={handleSelectChangeType}
                            />
                        </div>
                        <div className={cx('content-detail-2')}>
                            <label htmlFor='file-upload'
                                className={cx('file-upload')}
                                style={{
                                    color: 'red',
                                    cursor: "pointer"
                                }}>
                                {documentData.image_url === null || documentData.image_url?.length === 0
                                    ? isEmpty
                                    : isNotEmpty(documentData.image_url)
                                }
                            </label>
                        </div>
                        <ButtonComponent primary small onClick={handleSave}>Sửa tài liệu</ButtonComponent>
                    </div>
                </div>
            </div>
        </div>)
};

export default UpdateDocuments;
