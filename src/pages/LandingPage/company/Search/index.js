import { Button, Input, Select } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities } from '~/store/CustomerProfile/customerSlice';
import { getAllField, getStoreAllPaging } from '~/store/Store/storeSlice';
import './Search.scss';
const Search = () => {
    const { Option } = Select;
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState({
        field_id: '',
        city_id: '',
        name: '',
    });

    console.log('searchData', searchData);

    const { allCities } = useSelector((state) => state.customerReducer);
    const { listField } = useSelector((state) => state.storesReducer);

    useEffect(() => {
        dispatch(getAllCities());
        dispatch(getAllField());
    }, [dispatch]);

    const handleSearch = (e) => {
        setSearchData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmitSearch = () => {
        dispatch(
            getStoreAllPaging({
                page: {
                    index: 1,
                    size: 8,
                },
                data: searchData,
            }),
        );
    };

    return (
        <div className="search-inner">
            <div className="filter-field">
                <Select
                    style={{
                        width: '360px',
                    }}
                    name="field_id"
                    className="select-group"
                    placeholder="Chọn lĩnh vực"
                    onChange={(value) => {
                        setSearchData({
                            ...searchData,
                            field_id: value,
                        });
                    }}
                >
                    <Option value="">Tất cả</Option>
                    {listField.map((item, index) => {
                        return (
                            <Option key={index} value={item.id}>
                                {item.name}
                            </Option>
                        );
                    })}
                </Select>
            </div>
            <div className="filter-location">
                <Select
                    style={{
                        width: '160px',
                    }}
                    name="city_id"
                    className="select-group"
                    placeholder="Chọn lĩnh vực"
                    onChange={(value) => {
                        setSearchData({
                            ...searchData,
                            city_id: value,
                        });
                    }}
                >
                    <Option key={0} value="">
                        Tất cả
                    </Option>
                    {allCities.map((item, index) => {
                        return (
                            <Option key={index} value={item.id}>
                                {item.name}
                            </Option>
                        );
                    })}
                </Select>
            </div>
            <div className="search-input">
                <Input
                    style={{
                        minWidth: '400px',
                    }}
                    name="name"
                    placeholder="Nhập từ khóa"
                    onChange={handleSearch}
                />
            </div>
            <div className="btn-search">
                <Button onClick={handleSubmitSearch} type="primary">
                    Search
                </Button>
            </div>
        </div>
    );
};

export default Search;
