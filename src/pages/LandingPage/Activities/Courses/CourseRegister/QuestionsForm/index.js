import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Collapsible from 'react-collapsible';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './QuestionsForm.scss';

const QuestionsForm = ({ quantityRegis, handleListData, id }) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('key') === 'step-question-form' && quantityRegis === 0) {
            navigate(`/course-register/${id}`);
        } else {
            const tpArray = [];
            for (let i = 0; i < quantityRegis; i++) {
                tpArray.push({
                    id: `person-${i}`,
                    contact_name: '',
                    address: '',
                    email: '',
                    phone: '',
                });
            }

            setData(tpArray);
        }
    }, [quantityRegis]);

    const handleChangeInput = (e) => {
        const tpData = data.map((item) => {
            if (item.id === e.target.id) {
                return {
                    ...item,
                    [e.target.name]: e.target.value,
                };
            } else {
                return item;
            }
        });

        setData(tpData);
        handleListData(tpData);
    };

    return (
        <div className="question-form">
            <div className="question-form__header">
                <h2>CÂU HỎI CHO TỪNG NGƯỜI THAM DỰ</h2>
            </div>
            <div className="question-form__content">
                {data.map((item) => {
                    return (
                        <Collapsible
                            key={item.id}
                            trigger={
                                <div className="header-group">
                                    <span className="header-left">Vé có giới hạn</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            }
                        >
                            <div className="form-details">
                                <div className="form-details__header">
                                    <h3>Thông tin cơ bản</h3>
                                </div>
                                <div className="form-details__content">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="contact_name">
                                                    Tên liên lạc <span>*</span>
                                                </label>
                                                <input
                                                    autoComplete="false"
                                                    id={item.id}
                                                    name="contact_name"
                                                    placeholder="Nhập tên"
                                                    onChange={handleChangeInput}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="address">
                                                    Địa chỉ <span>*</span>
                                                </label>
                                                <input
                                                    autoComplete="false"
                                                    id={item.id}
                                                    name="address"
                                                    placeholder="Nhập địa chỉ"
                                                    onChange={handleChangeInput}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="email">
                                                    Email <span>*</span>
                                                </label>
                                                <input
                                                    autoComplete="false"
                                                    onChange={handleChangeInput}
                                                    id={item.id}
                                                    name="email"
                                                    placeholder="Nhập email"
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="phone">
                                                    Điện thoại <span>*</span>
                                                </label>
                                                <input
                                                    autoComplete="false"
                                                    id={item.id}
                                                    name="phone"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={handleChangeInput}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapsible>
                    );
                })}

                <Collapsible
                    trigger={() => {
                        return <div>abc</div>;
                    }}
                >
                    <p style={{ background: 'red' }}>
                        This is the collapsible content. It can be any element or React component you like.
                    </p>
                    <input type="text" placeholder="nhap vao day" name="person-1" />
                </Collapsible>
            </div>
        </div>
    );
};

export default QuestionsForm;
