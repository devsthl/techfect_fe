import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import CardProduct from '~/components/layouts/components/CardProduct';
import { getProductByStore } from '~/store/Products/productsSlice';
import CardInforCompany from './CardInforCompany';
import './CompanyDetail.scss';
import CompanyProject from './CompanyProject';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CardProductCompanyDetail from './CardProductCompanyDetail';

const CompanyDetail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { productByStore } = useSelector((state) => state.productsReducer);

    useEffect(() => {
        dispatch(
            getProductByStore({
                id: id,
                index: 1,
                size: 10,
            }),
        );
    }, [dispatch, id]);

    return (
        <div className="company-detail-wrapper">
            <div className="company-detail-inner">
                <div className="card-infor-wrap">
                    <CardInforCompany />
                </div>
                <div className="company-project">
                    <h2>Dự án</h2>
                    <div className="list-project">
                        <CompanyProject />
                        <CompanyProject />
                        <CompanyProject />
                    </div>
                </div>
                <div className="company-products">
                    <h2>Sản phẩm của doanh nghiệp</h2>
                    <div className="list-product">
                        {productByStore?.data?.map((item) => {
                            return <CardProductCompanyDetail item={item} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;
