'use strict';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import './MyCart.scss';
import { Checkbox, Input, message, Skeleton, Spin, Tree } from 'antd';
import images from '~/assets/images/home/header';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCart, deleteProductInCart, getAllProductInCart, updateQuantityCart } from '~/store/Cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import CartApi from '~/api/Cart/cartApi';
import { getAllAddress } from '~/store/CustomerProfile/customerSlice';

const MyCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { listProducts, loadingUpdate, loading } = useSelector((state) => state.cartReducer);
    const { listAddress, message } = useSelector((state) => state.customerReducer);
    const [priceCart, setPriceCart] = useState(0);
    const [defaultAddress, setDefaultAddress] = useState({});
    const [shippingFee, setShippingFee] = useState([]);
    const [dataCheckout, setDataCheckout] = useState();
    const [loadingCheckout, setLoadingCheckout] = useState(false);

    useEffect(() => {
        dispatch(getAllProductInCart());
        dispatch(getAllAddress());
    }, [dispatch]);

    console.log(listAddress);

    useEffect(() => {
        const defaultAddress = listAddress?.filter((item) => item.default_address === 0);
        setDefaultAddress(defaultAddress[0]);
    }, [listAddress]);

    const handleIncrease = (item) => {
        setPriceCart(0);
        const data = {
            id_order_detail: item.id_order_detail,
            quantity: item.quantity - 1,
        };
        dispatch(updateQuantityCart(data));
    };

    useEffect(() => {
        dispatch(checkoutCart(dataCheckout));
        if (dataCheckout !== undefined) {
            setTimeout(() => {
                setLoadingCheckout(false);
                navigate('/payment-cart');
                window.scrollTo(0, 0);
            }, 500);
        }
    }, [dataCheckout]);

    const handleCrease = (item) => {
        setPriceCart(0);
        const data = {
            id_order_detail: item.id_order_detail,
            quantity: item.quantity + 1,
        };
        dispatch(updateQuantityCart(data));
    };

    const handleDelete = async (id) => {
        const arr = [id];

        const data = {
            id: arr,
        };

        dispatch(deleteProductInCart(data));
    };

    function formatCash(str) {
        return str
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ',') + prev;
            });
    }

    const tpArray2 = [
        {
            title: (
                <div className="my-cart-title-group">
                    <h2>Chọn tất cả</h2>
                    <button
                        onClick={() => {
                            navigate('/store-details');
                        }}
                    >
                        Mua thêm
                    </button>
                </div>
            ),
            key: 'all-store',
            children: listProducts?.store?.map((storeItem) => {
                return {
                    ...storeItem,
                    title: (
                        <div className="cart-details__header">
                            <span>{storeItem.name}</span>
                            <FontAwesomeIcon icon={faMessage} />
                        </div>
                    ),
                    key: storeItem.id,
                    children: storeItem?.products?.map((item) => {
                        return {
                            ...item,
                            title: (
                                <div key={item.id} className="commodity-details">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}${item.image_url[0].url}`}
                                        alt={item.name}
                                    />
                                    <div className="commodity-right__group">
                                        <div className="info-commodity">
                                            <span className="commodity-name">{item.name}</span>
                                            <div className="color-size-group">
                                                <div className="color">
                                                    <label>Màu: </label>
                                                    {item.color}
                                                </div>
                                                <div className="size">
                                                    <label>Size: </label>
                                                    {item.size}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="commodity-price">
                                            <span className="current-price">
                                                {formatCash(item?.price.toString())} đ
                                            </span>
                                            {/* <span className="old-price">{item.old_price} đ</span> */}
                                        </div>
                                        <div className="commodity-quantity">
                                            <div className="commodity-quantity__group">
                                                <button
                                                    disabled={loadingUpdate ? true : false}
                                                    onClick={() => handleIncrease(item)}
                                                >
                                                    <FontAwesomeIcon className="minus" icon={faMinus} />
                                                </button>
                                                <input
                                                    disabled={loadingUpdate ? true : false}
                                                    value={item.quantity}
                                                ></input>
                                                <button
                                                    disabled={loadingUpdate ? true : false}
                                                    onClick={() => handleCrease(item)}
                                                >
                                                    <FontAwesomeIcon className="plus" icon={faPlus} />
                                                </button>
                                            </div>
                                            <FontAwesomeIcon
                                                onClick={() => handleDelete(item.id_order_detail)}
                                                className="delete-commodity-btn"
                                                icon={faTrash}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ),
                            key: item.id,
                        };
                    }),
                };
            }),
        },
    ];

    const [checkedKeys, setCheckedKeys] = useState([]);
    const [dataCart, setDataCart] = useState({});

    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };

    const shipData = async (data) => {
        const res = await CartApi.getShipFee(data);
        setShippingFee([...shippingFee, res]);
    };

    const handleSubmitCheckout = () => {
        setLoadingCheckout(true);
        if (checkedKeys.length === 0) {
            message.error('Không có sản phẩm nào trong giỏ');
        } else {
            const tpStore = [];
            listProducts.store.map((storeItem) => {
                const tp = checkedKeys.find((itemCheck) => itemCheck === storeItem.id);
                if (tp !== undefined) {
                    tpStore.push({
                        ...storeItem,
                        ship_price: 20000,
                    });
                } else {
                    const tpArray = [];
                    storeItem.products.map((itemProd) => {
                        const tp2 = checkedKeys.find((itemCheck) => itemCheck === itemProd.id);
                        if (tp2 !== undefined) {
                            tpArray.push(itemProd);
                        }
                    });

                    if (tpArray.length === 0) {
                    } else {
                        tpStore.push({
                            ...storeItem,
                            products: tpArray,
                            ship_price: 20000,
                        });
                    }
                }
            });

            const tpData = {
                orders: tpStore,
            };

            const feeArray = [];

            const ship = Promise.all(
                tpData?.orders.map(async (item) => {
                    const data = {
                        ship_unit_id: item.ship_unit_id,
                        from_district: item?.address.district.ghn_id,
                        to_district: defaultAddress?.address_detail.district.ghn_id,
                        to_ward_code: defaultAddress?.address_detail.ward.ghn_id,
                        products: item?.products.map((item) => {
                            return {
                                ...item,
                                height: 5,
                                length: 5,
                                weight: 200,
                                width: 5,
                            };
                        }),
                    };

                    const res = await CartApi.getShipFee(data);
                    return res;
                }),
            );

            const response = ship.then(async (value) => {
                const lastData = {
                    orders: tpData?.orders.map((item, index) => {
                        return {
                            ...item,
                            ship_price: value[index][0]?.total,
                        };
                    }),
                };

                setDataCheckout(lastData);
            });
        }
    };

    return (
        <div className="my-cart-wrapper">
            <Spin spinning={loadingCheckout}>
                <div className="my-cart__header">
                    <h2>Giỏ hàng của tôi</h2>
                </div>
                <Skeleton loading={loading}>
                    <Tree
                        checkable
                        selectable={true}
                        allowDrop={false}
                        defaultExpandAll={true}
                        defaultExpandParent
                        selectedKeys={false}
                        autoExpandParent={true}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        treeData={tpArray2}
                    />
                    {/* <div className="my-cart__left-group">
                        {listProducts?.store?.map((storeItem) => {
                            return (
                                <div key={storeItem.id} className="my-cart__left">
                                    <div className="cart-details">
                                        <div className="cart-details__header">
                                            <span>{storeItem.name}</span>
                                            <FontAwesomeIcon icon={faMessage} />
                                        </div>
                                        <div className="cart-details__main">
                                            {storeItem.products.map((item) => {
                                                return (
                                                    <div key={item.id} className="commodity-details">
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL}${item.image_url[0].url}`}
                                                            alt={item.name}
                                                        />
                                                        <div className="commodity-right__group">
                                                            <div className="info-commodity">
                                                                <span className="commodity-name">{item.name}</span>
                                                                <div className="color-size-group">
                                                                    <div className="color">
                                                                        <label>Màu: </label>
                                                                        {item.color}
                                                                    </div>
                                                                    <div className="size">
                                                                        <label>Size: </label>
                                                                        {item.size}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="commodity-price">
                                                                <span className="current-price">
                                                                    {formatCash(item?.price.toString())} đ
                                                                </span>
                                                            </div>
                                                            <div className="commodity-quantity">
                                                                <div className="commodity-quantity__group">
                                                                    <button
                                                                        disabled={loadingUpdate ? true : false}
                                                                        onClick={() => handleIncrease(item)}
                                                                    >
                                                                        <FontAwesomeIcon className="minus" icon={faMinus} />
                                                                    </button>
                                                                    <input
                                                                        disabled={loadingUpdate ? true : false}
                                                                        value={item.quantity}
                                                                    ></input>
                                                                    <button
                                                                        disabled={loadingUpdate ? true : false}
                                                                        onClick={() => handleCrease(item)}
                                                                    >
                                                                        <FontAwesomeIcon className="plus" icon={faPlus} />
                                                                    </button>
                                                                </div>
                                                                <FontAwesomeIcon
                                                                    onClick={() => handleDelete(item.id_order_detail)}
                                                                    className="delete-commodity-btn"
                                                                    icon={faTrash}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div> */}
                </Skeleton>

                <div className="my-cart__right-wrapper">
                    <div className="order-action">
                        <button onClick={handleSubmitCheckout}>Tiến hành đặt hàng</button>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default MyCart;
