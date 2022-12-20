import classNames from 'classnames/bind';
import styles from './DetailStore.module.scss';
import images from '~/assets/images/home/header';
import { useEffect, useState } from 'react';
import ButtonComponent from '~/components/layouts/components/Button';
import SwitchChoose from '../Components/SwitchChoose';
import CardProduct from '~/components/layouts/components/CardProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '~/store/Products/productsSlice';
import { message, Skeleton } from 'antd';
import formatCash from '~/utils/formatCash';
import productsApi from '~/api/ProductsApi/productsApi';
import CartApi from '~/api/Cart/cartApi';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { onLikeProductDetail } from '~/store/Like/likeSlice';

const cx = classNames.bind(styles);
function DetailStore() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { id } = useParams();
    const { productById, loading, listProductsOfStore } = useSelector((state) => state.productsReducer);
    const [currentImg, setCurrentImg] = useState(1);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        dispatch(getProductById(id));
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getAllProduct = async () => {
            const result = await productsApi.getAll();
            setProductList(result);
        };
        getAllProduct();
    }, []);

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    }

    useEffect(() => {
        if (isEmpty(productById) === false) {
            setCurrentImg(productById.image_url[0].id);
        }
    }, [productById]);

    const handleAddToCart = async (value) => {
        const data = {
            product_id: value.id.toString(),
            quantity: 1,
            store_id: value.store.id,
        };

        const result = await CartApi.addToCart(data);
        if (result.product_id === value.id.toString()) {
            message.success('Thêm vào giỏ hàng thành công');
        } else {
            message.error('Lỗi');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {isEmpty(productById) === true ? (
                    <h1>Không có sản phẩm phù hợp</h1>
                ) : (
                    <div className={cx('container1')}>
                        <div className={cx('content1')}>
                            <div className={cx('content1-detail1')}>
                                {productById.image_url.map((image) => {
                                    return (
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}${image.url}`}
                                            className={
                                                currentImg === image.id ? `${cx('active')}` : `${cx('img-small')}`
                                            }
                                            onClick={() => setCurrentImg(image.id)}
                                            alt=""
                                        />
                                    );
                                })}
                            </div>
                            <div className={cx('content1-detail2')}>
                                <img
                                    src={`${process.env.REACT_APP_API_URL}${
                                        productById.image_url.find((item) => item.id === currentImg)?.url
                                    }`}
                                    className={cx('img-large')}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className={cx('content2')}>
                            <Skeleton loading={loading}>
                                <p className={cx('title')}>{productById.name}</p>
                                <p className={cx('title-store')}>{t('homecustomer.stores')}:</p>
                                <p className={cx('title-name')}>{productById.content}</p>
                                <p className={cx('title-price')}>
                                    Price: <span>{formatCash(productById.price.toString())} đ</span>
                                </p>
                            </Skeleton>
                            <div className={cx('btn-group')}>
                                {productById.is_like ? (
                                    <button
                                        className={cx('unfavorite-btn')}
                                        onClick={() => {
                                            dispatch(onLikeProductDetail({ product_id: productById.id }));
                                        }}
                                    >
                                        <HeartOutlined /> Bỏ yêu thích
                                    </button>
                                ) : (
                                    <button
                                        className={cx('love-btn')}
                                        onClick={() => {
                                            dispatch(onLikeProductDetail({ product_id: productById.id }));
                                        }}
                                    >
                                        <HeartOutlined /> {t('text.favorite')}
                                    </button>
                                )}

                                <button className={cx('addToCart-btn')} onClick={() => handleAddToCart(productById)}>
                                    <ShoppingCartOutlined /> {t('text.Add_to_cart')}
                                </button>
                            </div>
                            <p className={cx('title-share')}>Share:</p>
                            <div className={cx('social')}>
                                <img src={images.twitter} alt="" />
                                <img src={images.fb} alt="" />
                                <img src={images.linkien} alt="" />
                                <img src={images.whatsapp} alt="" />
                                <img src={images.mess} alt="" />
                            </div>
                        </div>
                    </div>
                )}
                <div className={cx('container2')}>
                    <SwitchChoose item={productById} />
                </div>
                <div className={cx('container3')}>
                    <div className={cx('product')}>
                        <p>{t('text.Related_products')}</p>
                        <div className={cx('list-product')}>
                            {productList.map((item) => {
                                return <CardProduct item={item} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailStore;
