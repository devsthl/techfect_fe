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
                                                    placeholder="Ch???n l??nh v???c"
                                                // onChange={handleChangeCity}
                                                >
                                                    <Option value="C??ng ngh??? kh??ng gian m???ng">
                                                        C??ng ngh??? kh??ng gian m???ng
                                                    </Option>
                                                    <Option value="C??ng d?????c li???u s???ch">
                                                        C??ng ngh??? d?????c li???u s???ch
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
                                                    placeholder="Ch???n ?????a b??n"
                                                // onChange={handleChangeCity}
                                                >
                                                    <Option value="H?? n???i">H?? n???i</Option>
                                                    <Option value="H???i ph??ng">H???i Ph??ng</Option>
                                                </Select>
                                            </div>
                                            <div className="search-input">
                                                <Input
                                                    style={{
                                                        minWidth: '260px',
                                                    }}
                                                    placeholder="Nh???p t??? kh??a"
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
                                                    M?? s??? thu???: {item.tax_code}
                                                </span>
                                                <span className="consultants-details-grey">
                                                    S??? ??i???n tho???i: {item.phone}
                                                </span>
                                                <span className="consultants-details-grey">
                                                    ?????a ch???: {item.address}
                                                </span>
                                                <span className="consultants-details-grey">L??nh v???c: {item.field_id.name}</span>

                                            </div>
                                            <div className="consultants-details__right">
                                                <button className="consultants-details__action">
                                                    <FontAwesomeIcon icon={faCommentDots} />
                                                    <span>Chat ngay</span>
                                                </button>
                                                <button className="consultants-details__action">
                                                    <FontAwesomeIcon icon={faPhoneVolume} />
                                                    <span>G???i ??i???n</span>
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
