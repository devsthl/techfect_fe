import { Spin } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreAllPaging } from '~/store/Store/storeSlice';
import CardCompany from './CardCompany';
import './Company.scss';
import Search from './Search';

const Company = () => {
    const dispatch = useDispatch();
    const { listStoreAllPaging, loading } = useSelector((state) => state.storesReducer);

    useEffect(() => {
        dispatch(
            getStoreAllPaging({
                page: {
                    index: 1,
                    size: 8,
                },
                data: {
                    field_id: '',
                    city_id: '',
                    name: '',
                },
            }),
        );
    }, []);

    console.log('listStoreAllPaging', listStoreAllPaging);

    return (
        <div className="company-wrapper">
            <Spin spinning={loading}>
                <div className="company-inner">
                    <div className="search-group">
                        <Search />
                    </div>
                    <div className="list-company">
                        {listStoreAllPaging?.data?.length === 0 ? (
                            <h3>Không tìm thấy doanh nghiệp nào phù hợp</h3>
                        ) : (
                            listStoreAllPaging?.data?.map((item) => {
                                return <CardCompany item={item} />;
                            })
                        )}
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default Company;
