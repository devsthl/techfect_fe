import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faPhoneVolume, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Select } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities } from '~/store/CustomerProfile/customerSlice';
import { getAllField } from '~/store/Store/storeSlice';
import { getAllEnterprise } from '~/store/Enterprise/enterpriseSlice';
import './Advise.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { useTranslation } from 'react-i18next';
import { Wrapper } from '~/components/layouts/components/Popper';
import { useState } from 'react';

const { Option } = Select;

const Advise = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [showSearch, setShowSearch] = useState(false);
    const { allCities } = useSelector((state) => state.customerReducer);
    const { listField } = useSelector((state) => state.storesReducer);
    const { enterpriseList } = useSelector((state) => state.enterpriseReducer);
    useEffect(() => {
        dispatch(getAllCities());
        dispatch(getAllField());
        dispatch(getAllEnterprise());
    }, []);
    const checkImage = (arrImage) => {
        if (arrImage === null) return null;
        else return process.env.REACT_APP_API_URL + arrImage[0]?.url;

    };
    return (
        <div className="advise-wrapper" id="advise-activities">
            <div className="inner">
                <div className="content-main-advise">
                    <div className="search-group">
                        {/* <div className="form-group">
                            <label>{t('text.field')}</label>
                            <Select allowClear showSearch placeholder={t('text.Choose_field')}>
                                {listField.map((item) => {
                                    return (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="form-group">
                            <label>{t('text.Location')}</label>
                            <Select allowClear showSearch placeholder={t('text.Choose_area')}>
                                {allCities.map((item) => {
                                    return (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div> */}
                        <div className="search-btn">
                            <HeadlessTippy
                                zIndex={1}
                                interactive
                                visible={showSearch}
                                placement="bottom-start"
                                onClickOutside={() => setShowSearch(false)}
                                render={(attrs) => (
                                    <Wrapper tabIndex="-1" {...attrs}>
                                        <div className="search-group">
                                            <div className="search-field">
                                                <Select
                                                    style={{
                                                        minWidth: '260px',
                                                    }}
                                                    className="select-group"
                                                    // placeholder={t('text.province/city')}
                                                    placeholder="Chọn lĩnh vực"
                                                // onChange={handleChangeCity}
                                                >
                                                    <Option value="Công nghệ không gian mạng">
                                                        Công nghệ không gian mạng
                                                    </Option>
                                                    <Option value="Công dược liệu sạch">
                                                        Công nghệ dược liệu sạch
                                                    </Option>
                                                </Select>
                                            </div>
                                            <div className="search-location">
                                                <Select
                                                    style={{
                                                        minWidth: '260px',
                                                        zIndex: 1000000,
                                                    }}
                                                    className="select-group"
                                                    // placeholder={t('text.province/city')}
                                                    placeholder="Chọn địa bàn"
                                                // onChange={handleChangeCity}
                                                >
                                                    <Option value="Hà nội">Hà nội</Option>
                                                    <Option value="Hải phòng">Hải Phòng</Option>
                                                </Select>
                                            </div>
                                            <div className="search-input">
                                                <Input
                                                    style={{
                                                        minWidth: '260px',
                                                    }}
                                                    placeholder="Nhập từ khóa"
                                                />
                                            </div>
                                            <div className="btn-search">
                                                <Button type="primary">Search</Button>
                                            </div>
                                        </div>
                                    </Wrapper>
                                )}
                            >
                                <button
                                    onClick={() => {
                                        setShowSearch(!showSearch);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faSearch} /> {t('text.search')}
                                </button>
                            </HeadlessTippy>
                        </div>
                    </div>

                    <div className="consultants-wrap">
                        <div className="consultants-list">
                            {enterpriseList?.map((item, index) => {
                                return (
                                    <div className="consultants-item" key={index}>
                                        <div className="consultants-image">
                                            <img
                                                src={checkImage(item.image_url)}
                                                alt="Avatar"
                                            />
                                        </div>
                                        <div className="consultants-details">
                                            <div className="consultants-details__left">
                                                <span className="consultants-details__name">{item.name}</span>
                                                <span className="consultants-details-grey">
                                                    {item.name_of_exchange}
                                                </span>
                                                <span className="consultants-details-grey">
                                                    Mã số thuế: {item.tax_code}
                                                </span>
                                                <span className="consultants-details-grey">
                                                    Số điện thoại: {item.phone}
                                                </span>
                                                <span className="consultants-details-grey">
                                                    Địa chỉ: {item.address}
                                                </span>
                                                <span className="consultants-details-grey">Lĩnh vực: {item.field_id.name}</span>

                                            </div>
                                            <div className="consultants-details__right">
                                                <button className="consultants-details__action">
                                                    <FontAwesomeIcon icon={faCommentDots} />
                                                    <span>Chat ngay</span>
                                                </button>
                                                <button className="consultants-details__action">
                                                    <FontAwesomeIcon icon={faPhoneVolume} />
                                                    <span>Gọi điện</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advise;
