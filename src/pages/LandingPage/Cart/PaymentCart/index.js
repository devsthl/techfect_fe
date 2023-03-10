import { faAngleLeft, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Modal, Skeleton } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images/home/header';
import { getAllAddress } from '~/store/CustomerProfile/customerSlice';
import formatCash from '~/utils/formatCash';
import ChangeAddress from './ChangeAddress';
import './PaymentCart.scss';
import Voucher from './Voucher';
import voucherApi from '~/api/Voucher/VoucherApi';
import { applyVoucher, checkoutCart, getAllProductInCart } from '~/store/Cart/cartSlice';
import store from '~/store/store';

const PaymentCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { listAddress, loading } = useSelector((state) => state.customerReducer);
    const { dataCheckout, listProducts } = useSelector((state) => state.cartReducer);

    const [editAddressModal, setEditAddressModal] = useState(false);
    const [editVoucherModal, setEditVoucherModal] = useState(false);
    const [addressReplace, setAddressReplace] = useState();
    const [customerId, setCustomerId] = useState(0);
    const [dataVoucher, setDataVoucher] = useState();

    useEffect(() => {
        dispatch(getAllAddress());
        dispatch(getAllProductInCart());
    }, [dispatch]);

    // useEffect(() => {
    //     const tpData = listProducts?.store?.map((storeItem) => {
    //         return {
    //             storeId: storeItem.id,
    //             products: storeItem.products.map((item) => {
    //                 return {
    //                     url: item.image_url[0].url,
    //                     name: item.name,
    //                     id: item.id,
    //                     quantity: item.quantity,
    //                     price: item.price,
    //                 };
    //             }),
    //             ship_price: 200,
    //         };
    //     });

    //     dispatch(
    //         checkoutCart({
    //             orders: tpData,
    //         }),
    //     );
    // }, [listProducts]);

    useEffect(() => {
        const addressDefault = listAddress.find((item) => item.default_address === 1);
        setAddressReplace(addressDefault);
        setCustomerId(addressDefault?.customer_id);
    }, [listAddress]);

    const handleChangeAddress = (value) => {
        setEditAddressModal(false);
        const tpAddress = listAddress.find((item) => item.id === value);
        setAddressReplace(tpAddress);
    };

    const handleChooseVoucher = async (value) => {
        const data = {
            store_id: value.storeId,
            customer_id: customerId,
            products: value.products.map((item) => {
                return {
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                };
            }),
        };

        const res = await voucherApi.getVoucherStore(data);

        setDataVoucher(res);
        setEditVoucherModal(true);
    };

    const handleAddVoucher = async (value) => {
        const tpData = {
            orders: dataCheckout.orders.map((item) => {
                if (item.storeId === value.store_id) {
                    return {
                        ...item,
                        voucher_id: value.id,
                    };
                } else {
                    return {
                        ...item,
                    };
                }
            }),
            all_product_price: dataCheckout.all_product_price,
            all_shipping_fee: dataCheckout.all_shipping_fee,
            total_price: dataCheckout.total_price,
        };

        dispatch(applyVoucher(tpData));
    };

    console.log('datacheckout', dataCheckout);

    return (
        <div className="payment-cart-wrapper" id="payment-cart">
            <div className="inner">
                <div className="payment-header">
                    <div className="header-action">
                        <div className="back-to-cart">
                            <FontAwesomeIcon icon={faAngleLeft} />
                            <span
                                onClick={() => {
                                    navigate('/my-cart');
                                }}
                            >
                                Tr??? l???i gi??? h??ng
                            </span>
                        </div>
                        <div className="header-title">Thanh to??n</div>
                        <div className="header-right"></div>
                    </div>
                    <div className="header-address">
                        <Skeleton loading={loading}>
                            <div className="address-details">
                                <div className="address-title">
                                    <img src={images.locationIcon} alt="Location" />
                                    <span>?????a ch??? nh???n h??ng</span>
                                </div>
                                <span>{addressReplace?.name}</span>
                                <span>{addressReplace?.address_detail.address}</span>
                            </div>
                        </Skeleton>
                        <div className="action-replace">
                            <button onClick={() => setEditAddressModal(true)}>Thay ?????i</button>
                        </div>
                    </div>
                </div>
                <div className="payment-main">
                    <div className="payment-cart">
                        <div className="product-payment-header">
                            <div className="title">
                                <span>S???n ph???m</span>
                            </div>
                            <div className="type"></div>
                            <div className="price">????n gi??</div>
                            <div className="quantity">S??? l?????ng</div>
                            <div className="cost">Th??nh ti???n</div>
                        </div>
                        <div className="store-group">
                            {dataCheckout.orders?.map((storeItem) => {
                                return (
                                    <div key={storeItem?.id} className="list-store">
                                        <div className="store-header">
                                            <span>{storeItem.name}</span>
                                            <div className="chat-group">
                                                <FontAwesomeIcon icon={faMessage} />
                                                <span>Chat ngay</span>
                                            </div>
                                        </div>
                                        <div className="store-product">
                                            <div className="list-product">
                                                {storeItem?.products?.map((item) => {
                                                    return (
                                                        <div className="product-item">
                                                            <div className="image-name-group">
                                                                <img
                                                                    src={`${process.env.REACT_APP_API_URL}${item?.url}`}
                                                                    alt="Avatar"
                                                                />
                                                                <span>{item.name}</span>
                                                            </div>
                                                            <div className="type-group">
                                                                <span></span>
                                                            </div>
                                                            <div className="price-group">
                                                                {formatCash(item.price.toString())}??
                                                            </div>
                                                            <div className="quantity-group">{item.quantity}</div>
                                                            <div className="cost-group">
                                                                {formatCash((item.price * item.quantity).toString())}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="voucher-group">
                                                <div className="voucher">
                                                    <div></div>
                                                    <div className="voucher-title">Voucher c???a Shop</div>
                                                    <span className="price-voucher">
                                                        {storeItem.hasOwnProperty('reduce_product_price')
                                                            ? `Gi?? tr??? voucher: ${storeItem.reduce_product_price} ??`
                                                            : ''}
                                                    </span>
                                                    <span
                                                        className="voucher-action"
                                                        onClick={() => handleChooseVoucher(storeItem)}
                                                    >
                                                        Ch???n voucher kh??c
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="delivery-group">
                                                <div className="note-group">
                                                    <label>L???i nh???n:</label>
                                                    <Input placeholder="L??u ?? cho ng?????i b??n ..." />
                                                </div>
                                                <div className="delivery-details">
                                                    <label>????n v??? v???n chuy???n:</label>
                                                    <div className="delivery">
                                                        <div className="delivery-header">
                                                            <span>Giao h??ng nhanh</span>
                                                            <span>Thay ?????i</span>
                                                            <span>{storeItem.ship_price}</span>
                                                        </div>
                                                        <span>Nh???n h??ng v??o 28-30/9</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="total-price">
                                                <p>
                                                    T???ng s??? ti???n s???n ph???m:
                                                    <span>{formatCash(storeItem.all_store_price.toString())} ??</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="payment-bottom">
                    <div className="my-cart__right-wrapper">
                        <div className="my-cart__right">
                            <div className="order-summary">
                                <span className="order-summary__title">T??m t???t ????n h??ng</span>
                                <div className="order-summary__group">
                                    <label>Th??nh ti???n</label>
                                    <span className="money">
                                        {formatCash(dataCheckout?.all_product_price?.toString())}
                                    </span>
                                </div>
                                <div className="order-summary__group">
                                    <label>Ph?? v???n chuy???n</label>
                                    <span className="money">
                                        {formatCash(dataCheckout?.all_shipping_fee?.toString())} ??
                                    </span>
                                </div>
                                <div className="order-summary__group">
                                    <label>Gi???m gi??</label>
                                    <span className="money">
                                        {dataCheckout.hasOwnProperty('reduce_all_product_price')
                                            ? formatCash(dataCheckout?.reduce_all_product_price?.toString())
                                            : 0}{' '}
                                        ??
                                    </span>
                                </div>
                                <div className="total-money">
                                    <label>T???ng c???ng</label>
                                    <div className="total-money__number">
                                        <span className="total-money__number-price">
                                            {formatCash(dataCheckout?.total_price?.toString())} ??
                                        </span>
                                        <span className="total-money__vat">???? bao g???m VAT n???u c??</span>
                                    </div>
                                </div>
                                {/* <div className="voucher-code">
                                    <input type="text" placeholder="Nh???p m?? gi???m gi??" />
                                </div> */}
                            </div>
                        </div>
                        <div className="order-action">
                            <button
                            // onClick={handleSubmitCheckout}
                            >
                                Thanh to??n
                            </button>
                        </div>
                        <div className="payment-method">
                            <span>Ch??ng t??i ch???p nh???n:</span>
                            <div className="payment-method__group">
                                <img src={images.CODImage} alt="Avatar" />
                                <img src={images.visaImage} alt="Avatar" />
                                <img src={images.masterCardImage} alt="Avatar" />
                                <img src={images.atmImage} alt="Avatar" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                centered
                title="?????i ?????a ch???"
                footer={null}
                onCancel={() => setEditAddressModal(false)}
                visible={editAddressModal}
            >
                <ChangeAddress handleChangeAddress={handleChangeAddress} listAddress={listAddress} />
            </Modal>

            <Modal
                centered
                title="Ch???n Voucher"
                footer={null}
                onCancel={() => setEditVoucherModal(false)}
                visible={editVoucherModal}
            >
                <Voucher
                    dataVoucher={dataVoucher}
                    handleAddVoucher={handleAddVoucher}
                    setEditVoucherModal={setEditVoucherModal}
                />
            </Modal>
        </div>
    );
};

export default PaymentCart;
