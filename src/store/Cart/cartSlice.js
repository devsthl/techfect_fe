import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { message } from 'antd';
import CartApi from '~/api/Cart/cartApi';
import voucherApi from '~/api/Voucher/VoucherApi';

export const addProductToCart = createAsyncThunk('cart/addToCart', async (data) => {
    await CartApi.addToCart(data);
});

export const getAllProductInCart = createAsyncThunk('cart/getAllCart', async () => {
    const listData = await CartApi.getAllCart();
    return listData;
});

export const updateQuantityCart = createAsyncThunk('cart/updateQuantity', async (data, thunkAPI) => {
    const newData = {
        quantity: data.quantity,
    };
    const resultData = await CartApi.updateQuantity(newData, data.id_order_detail);
    return data;
});

export const deleteProductInCart = createAsyncThunk('cart/deleteCart', async (data, thunkAPI) => {
    const resultData = await CartApi.deleteProductInCart(data);
    thunkAPI.dispatch(getAllProductInCart());
});

export const checkoutCart = createAsyncThunk('cart/checkout', async (data, thunkAPI) => {
    const resultData = await CartApi.checkoutCart(data);
    return resultData;
});

export const getShipFee = createAsyncThunk('cart/getShipFee', async (data, thunkAPI) => {
    const resultData = await CartApi.getShipFee(data);
    return resultData;
});

export const applyVoucher = createAsyncThunk('voucher/apply-vouhcer', async (data, thunkAPI) => {
    const resultData = await voucherApi.applyVoucherStore(data);
    if (resultData.message === 'error') {
        message.error('Lỗi không add được voucher');
    } else {
        message.success('Thêm voucher thành công');
    }
    return resultData;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        loadingUpdate: false,
        listProducts: [],
        dataCheckout: {},
    },
    reducers: {},
    extraReducers: {
        [getAllProductInCart.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllProductInCart.rejected]: (state, action) => {
            state.loading = false;
        },
        [getAllProductInCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.listProducts = action.payload;
        },
        [checkoutCart.pending]: (state, action) => {
            state.loading = true;
        },
        [checkoutCart.rejected]: (state, action) => {
            state.loading = false;
        },
        [checkoutCart.fulfilled]: (state, action) => {
            state.loading = false;

            // const tpData = {
            //     ...current(state.listProducts),
            //     store: current(state.listProducts)?.store?.map((storeItem) => {
            //         const storeFiltered = action.payload.orders.filter((item) => item.storeId === storeItem.id);
            //         return {
            //             ...storeItem,
            //             ship_price: storeFiltered[0].ship_price,
            //             all_store_price: storeFiltered[0].all_store_price,
            //             product_price: storeFiltered[0].product_price,
            //             products: [...storeItem.products],
            //         };
            //     }),
            //     all_product_price: action.payload.all_product_price,
            //     all_shipping_fee: action.payload.all_shipping_fee,
            //     total_price: action.payload.total_price,
            // };

            state.dataCheckout = action.payload;
        },
        [applyVoucher.pending]: (state, action) => {
            state.loading = true;
        },
        [applyVoucher.rejected]: (state, action) => {
            state.loading = false;
        },
        [applyVoucher.fulfilled]: (state, action) => {
            state.loading = false;
            state.dataCheckout = action.payload;
        },
        [updateQuantityCart.pending]: (state, action) => {
            state.loadingUpdate = true;
        },
        [updateQuantityCart.rejected]: (state, action) => {
            state.loadingUpdate = false;
        },
        [updateQuantityCart.fulfilled]: (state, { payload }) => {
            state.loadingUpdate = false;
            state.listProducts = {
                ...current(state.listProducts),
                store: current(state.listProducts)?.store?.map((storeItem) => {
                    return {
                        ...storeItem,
                        products: storeItem.products.map((item) => {
                            if (item.id_order_detail === payload.id_order_detail) {
                                const tpItem = { ...item };
                                tpItem.quantity = payload?.quantity;
                                return tpItem;
                            } else return item;
                        }),
                    };
                }),
            };
        },
        [deleteProductInCart.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProductInCart.rejected]: (state, action) => {
            state.loading = false;
        },
        [deleteProductInCart.fulfilled]: (state, action) => {
            state.loading = false;
            const listStores = current(state.listProducts);
            const tpArr = [];

            // const handleStore = () => {
            //     for (let i of listStores.store) {
            //         if (i.products.length === 1 && i.products[0].id_order_detail === action.payload) {
            //             continue;
            //         } else {
            //             tpArr.push(i);
            //         }
            //     }
            // };

            // const data = {
            //     ...current(state.listProducts),
            //     store: current(state.listProducts)?.store?.map((storeItem) => {
            //         if (
            //             storeItem.products.length === 1 &&
            //             storeItem.products[0].id_order_detail === action.payload[0]
            //         ) {
            //         }
            //         return {
            //             ...storeItem,
            //             products: storeItem.products.filter((item) => item.id_order_detail !== action.payload[0]),
            //         };
            //     }),
            // };
        },
    },
});

export const { addToCart } = cartSlice.actions;
const { reducer: cartReducer } = cartSlice;
export default cartReducer;
