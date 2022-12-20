import classNames from 'classnames/bind';
import FormSearchStores from '~/components/layouts/components/FormSearchStores';
import styles from './Stores.module.scss';
import { Pagination, Skeleton } from 'antd';
import ListStores from './Components/ViewStore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllField } from '~/store/Store/storeSlice';

const cx = classNames.bind(styles);
const Stores = () => {
    const dispatch = useDispatch();
    const { listField, loading } = useSelector((state) => state.storesReducer);

    useEffect(() => {
        dispatch(getAllField());
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-stores')}>
                <h1 className={cx('field-title')}>LÀNG KHỞI NGHIỆP</h1>
                <div className={cx('content-stores-detail')}>
                    <div className={cx('content-formsearch')}>
                        <FormSearchStores />
                    </div>
                    {loading ? (
                        <Skeleton width={8} loading={loading} active />
                    ) : (
                        listField?.map((item, index) => {
                            return <ListStores key={index} item={item} />;
                        })
                    )}
                </div>
                <Pagination defaultCurrent={1} total={150} />
            </div>
        </div>
    );
};

export default Stores;
