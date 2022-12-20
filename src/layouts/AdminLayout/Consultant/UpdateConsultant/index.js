import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UpdateConsultant.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, Select } from 'antd';
import { getAllEnterprise } from '~/store/Enterprise/enterpriseSlice';
import enterpriseApi from '~/api/Enterprise/EnterpriseApi';
import { useDispatch } from 'react-redux';
import ToastPopup, { notifyError, notifySuccess, notifyWarning } from '~/toast/toast';
import { isValid, validate } from '~/utils/validate';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import ButtonComponent from '~/components/layouts/components/Button';
import axios from 'axios';
const cx = classNames.bind(styles);
const UpdateConsultant = () => {
    let formData = new FormData();
    const [, setFiles] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [enterpriseData, setEnterpriseData] = useState({
        name: '',
        phone: '',
        address: '',
        tax_code: '',
        address_register: '',
        city_id: {
            id: '',
            name: ''
        },
        field_id: {
            id: '',
            name: ''
        }
    });
    const getData = useCallback(async () => {
        const res = await enterpriseApi.get(params.id);
        setEnterpriseData(res);
    }, [params.id]);
    useEffect(() => {
        getData();
    }, [getData]);
    // const handleFilesChange = async (e) => {
    //     setFiles(e.target.files);
    //     for (const key of Object.keys(e.target.files)) {
    //         formData.append("files", e.target.files[key]);
    //     }

    //     try {
    //         const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData);
    //         setFiles([]);
    //         setEnterpriseData({
    //             ...enterpriseData,
    //             image_url: enterpriseData.image_url.concat(
    //                 res.data.url.map((image) => {
    //                     return {
    //                         url: image,
    //                     };
    //                 }),
    //             ),
    //         });
    //         notifySuccess("Upload file thành công");
    //     } catch (error) {
    //         notifyError("Upload file không thành công");
    //     }
    // };
    // const isEmpty = (
    //     <div className="is-empty">
    //         <h3>Hiện tại chưa có ảnh</h3>
    //         <input
    //             type="file"
    //             multiple
    //             // accept="img/*"
    //             id="file-upload"
    //             style={{ display: "none" }}
    //             onChange={handleFilesChange}
    //         />
    //         <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
    //             Thêm ảnh
    //         </label>
    //     </div>
    // );
    // const removeImage = (position) => {
    //     setEnterpriseData({
    //         ...enterpriseData,
    //         image_url: enterpriseData.image_url.filter((_, index) => position !== index),
    //     });
    // };
    // const isNotEmpty = (arr) => {
    //     return (
    //         <div className="image-container">
    //             <div className="big-image">
    //                 <div className="delete-image" onClick={() => removeImage(0)}>
    //                     X
    //                 </div>
    //                 <img src={`${process.env.REACT_APP_API_URL}/${arr[0].url}`} alt="big" />
    //             </div>
    //             <div className="small-image-container">
    //                 {arr.map((item, index) => {
    //                     if (index !== 0) {
    //                         return (
    //                             <div
    //                                 className="small-image"
    //                                 key={item.url}
    //                                 style={{
    //                                     backgroundImage: `url(${process.env.REACT_APP_API_URL}/${item.url})`,
    //                                 }}
    //                             >
    //                                 <div className="delete-image" onClick={() => removeImage(index)}>
    //                                     X
    //                                 </div>
    //                             </div>
    //                         );
    //                     }
    //                     return null;
    //                 })}
    //                 <div className="small-image upload">
    //                     <input
    //                         className="item__input"
    //                         type="file"
    //                         id="file-upload"
    //                         multiple
    //                         accept="image/*"
    //                         onChange={handleFilesChange}
    //                     />
    //                     <label htmlFor="file-upload">
    //                         <h4>Thêm ảnh</h4>
    //                     </label>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };
    const handleSave = async () => {
        try {
            const x = validate('enterprise', enterpriseData);
            if (!isValid('enterprise', x)) {
                Object.values(x).forEach((error) => {
                    if (error) {
                        notifyError(error);
                    }
                });
            } else {
                const res = await enterpriseApi.edit({
                    ...enterpriseData,
                    name: enterpriseData.name,
                    phone: enterpriseData.phone,
                    address: enterpriseData.address,
                    // image_url: enterpriseData.image_url.map((item) => {
                    //     if (item.url) return item.url;
                    //     return item;
                    // })
                });
                if (res.status === 400) {
                    notifyError('Sửa nhà tư vấn không thành công');
                } else {
                    notifySuccess('Sửa nhà tư vấn thành công');
                    setTimeout(() => {
                        navigate('/consultant/list-consultant');
                    }, 2000);
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
                        <span>Tư vấn</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Sửa nhà tư vấn</span>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('content')}>
                        <div className={cx('content-detail-1')}>
                            <label>Tên đơn vị tư vấn</label>
                            <input
                                className={cx('input-7')}
                                placeholder="Nhập tên"
                                name=""
                                id=""
                                value={enterpriseData.name}
                                onChange={(e) =>
                                    setEnterpriseData({
                                        ...enterpriseData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cx('content-detail-1')}>
                            <label>Số điện thoại</label>
                            <input
                                className={cx('input-7')}
                                placeholder="Nhập tên"
                                name=""
                                id=""
                                value={enterpriseData.phone}
                                onChange={(e) =>
                                    setEnterpriseData({
                                        ...enterpriseData,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cx('content-detail-1')}>
                            <label>Địa chỉ cụ thể</label>
                            <input
                                className={cx('input-7')}
                                placeholder="Nhập tên"
                                name=""
                                id=""
                                value={enterpriseData.address}
                                onChange={(e) =>
                                    setEnterpriseData({
                                        ...enterpriseData,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cx('content-detail-1')}>
                            <label>Mã số thuế</label>
                            <input
                                className={cx('input-7')}
                                placeholder="Nhập tên"
                                name=""
                                id=""
                                value={enterpriseData.tax_code}
                                onChange={(e) =>
                                    setEnterpriseData({
                                        ...enterpriseData,
                                        tax_code: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cx('content-detail-1')}>
                            <label>Địa chỉ đăng ký mã số thuế</label>
                            <input
                                className={cx('input-7')}
                                placeholder="Nhập tên"
                                name=""
                                id=""
                                value={enterpriseData.address_register}
                                onChange={(e) =>
                                    setEnterpriseData({
                                        ...enterpriseData,
                                        address_register: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {/* <label htmlFor='file-upload'
                            style={{
                                color: 'red',
                                cursor: "pointer"
                            }}>
                            {enterpriseData.image_url === null || enterpriseData.image_url?.length === 0
                                ? isEmpty
                                : isNotEmpty(enterpriseData.image_url)
                            }
                        </label> */}
                        <ButtonComponent primary small onClick={handleSave}>
                            Cập nhật
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateConsultant;
