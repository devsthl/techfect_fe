import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateProduct.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Cascader, Form, Input, message, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import JoditEditor from 'jodit-react';
import { useDispatch, useSelector } from 'react-redux';
import { getTreeCategory } from '~/store/Categories/categorySlice';
import axios from 'axios';
import emptyIcon from '~/assets/images/Products/empty.svg';
import uploadIcon from '~/assets/images/Products/upload.svg';
import productsApi from '~/api/ProductsApi/productsApi';
import { getMyStore } from '~/store/Store/storeSlice';

const cx = classNames.bind(styles);
const { Option } = Select;

const CreateProduct = () => {
    const dispatch = useDispatch();
    const { tree_category } = useSelector((state) => state.categoryReducer);
    const { storeById } = useSelector((state) => state.storesReducer);
    const [isDisable, setIsDisable] = useState(true);
    const [files, setFiles] = useState([]);
    const [productData, setProductData] = useState({
        name: '',
        content: '',
        original_price: '',
        quantity: '',
        size: {
            height: '',
            length: '',
            weight: '',
            width: '',
        },
        des: '',
        image_url: [],
        category_id: 0,
        store_id: storeById.id,
    });

    console.log('storeById', storeById);

    let formData = new FormData();

    useEffect(() => {
        dispatch(getTreeCategory());
        dispatch(getMyStore());
    }, [dispatch]);

    const handleFilesChange = async (e) => {
        setFiles(e.target.files);
        for (const key of Object.keys(e.target.files)) {
            formData.append('files', e.target.files[key]);
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData);
            setFiles([]);
            setProductData({
                ...productData,
                image_url: productData.image_url.concat(
                    res.data.url.map((image) => {
                        return {
                            url: image,
                        };
                    }),
                ),
            });
            setIsDisable(false);
        } catch (error) {
            console.log(error);
        }
    };

    const removeImage = (position) => {
        setProductData({
            ...productData,
            image_url: productData.image_url.filter((_, index) => position !== index),
        });
    };

    const isEmpty = (
        <div className="is-empty">
            <h3>Hiện tại chưa có ảnh</h3>
            <img src={emptyIcon} alt="empty" />
            <input
                type="file"
                multiple
                accept="img/*"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFilesChange}
            />
            <label style={{ cursor: 'pointer' }} htmlFor="file-upload">
                Thêm ảnh
            </label>
        </div>
    );

    const isNotEmpty = (arr) => {
        return (
            <div className="image-container">
                <div className="big-image">
                    <div className="delete-image" onClick={() => removeImage(0)}>
                        X
                    </div>
                    <img src={`${process.env.REACT_APP_API_URL}/${arr[0].url}`} alt="big" />
                </div>
                <div className="small-image-container">
                    {arr.map((item, index) => {
                        if (index !== 0) {
                            return (
                                <div
                                    className="small-image"
                                    key={item.url}
                                    style={{
                                        backgroundImage: `url(${process.env.REACT_APP_API_URL}/${item.url})`,
                                    }}
                                >
                                    <div className="delete-image" onClick={() => removeImage(index)}>
                                        X
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div className="small-image upload">
                        <input
                            className="item__input"
                            type="file"
                            id="file-upload"
                            multiple
                            accept="image/*"
                            onChange={handleFilesChange}
                        />
                        <label htmlFor="file-upload">
                            <h4>Thêm ảnh</h4>
                            <img src={uploadIcon} alt="upload" />
                        </label>
                    </div>
                </div>
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await productsApi.create({
            ...productData,
            image_url: productData.image_url.map((item, index) => {
                if (item.url) return item.url;
                return item;
            }),
            store_id: storeById?.id,
        });

        if (res.message === 'Success') {
            message.success('Thêm sản phẩm thành công');
        } else {
            message.error('Thêm sản phẩm không thành công');
        }
    };

    return (
        <div className={cx('create-product-wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Quản lý sản phẩm</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Tạo đơn hàng mới</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('content-main')}>
                        <div className={cx('content-left')}>
                            <div className={cx('general-info')}>
                                <div className={cx('general-info-title')}>
                                    <h3>Thông tin chung</h3>
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="product-name">Tên sản phẩm</label>
                                    <Form.Item className={cx('form-item-group')} name="product-name">
                                        <Input
                                            className={cx('input-10')}
                                            placeholder="Nhập tên sản phẩm"
                                            id="product-name"
                                            value={productData.name}
                                            onChange={(e) => {
                                                setProductData({ ...productData, name: e.target.value });
                                                // handleisDisable()
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                                <div className={cx('supplier-type-group')}>
                                    {/* <div className={cx('form-group')}>
                                        <label htmlFor="">Nhà cung cấp</label>
                                        <Form.Item className={cx('form-item-group')} name="supplier">
                                            <Select className={cx('select-group')} placeholder="Chọn nhà cung cấp">
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select>
                                        </Form.Item>
                                    </div> */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="">Loại</label>
                                        <Form.Item className={cx('form-item-group')} name="type">
                                            {/* <Select className={cx('select-group')} placeholder="Chọn loại sản phẩm">
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select> */}

                                            <Cascader
                                                options={tree_category}
                                                // value={path}
                                                // changeOnSelect
                                                // showSearch={{
                                                //     filter,
                                                // }}
                                                placeholder="Chọn danh mục"
                                                onChange={(value) => {
                                                    // setPath(value);
                                                    setProductData({
                                                        ...productData,
                                                        category_id: value[value.length - 1],
                                                    });
                                                    // handleisDisable()
                                                }}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="">Mô tả sản phẩm</label>
                                    <JoditEditor
                                        className="abcs"
                                        value={productData.des}
                                        onChange={(value) => setProductData({ ...productData, des: value })}
                                    />
                                </div>
                                <div className={cx('form-group', 'quote')}>
                                    <label htmlFor="product-quote">Trích dẫn</label>
                                    <Input
                                        className={cx('input-10')}
                                        placeholder="Trích dẫn sản phẩm"
                                        id="product-quote"
                                        value={productData.content}
                                        onChange={(e) => setProductData({ ...productData, content: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={cx('products-image')}>
                                <div className="product-image__title">
                                    <h3>Hình ảnh sản phẩm</h3>
                                </div>
                                <div className="product-image__content">
                                    {productData.image_url === null || productData.image_url?.length === 0
                                        ? isEmpty
                                        : isNotEmpty(productData.image_url)}
                                </div>
                            </div>
                            <div className={cx('products-price')}>
                                <div className={cx('products-price-title')}>
                                    <h3>Giá sản phẩm</h3>
                                </div>
                                <div className="price-group">
                                    <div className="form-group">
                                        <label htmlFor="price">
                                            Giá bán <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input
                                            name="price"
                                            id="price"
                                            placeholder="0 đ"
                                            value={productData.price}
                                            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="compare-price">
                                            Giá gốc <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input
                                            name="compare-price"
                                            id="compare-price"
                                            placeholder="0 đ"
                                            value={productData.original_price}
                                            onChange={(e) =>
                                                setProductData({ ...productData, original_price: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className={cx('transport')}>
                                <div className="transport-title">
                                    <h3>Vận chuyển</h3>
                                </div>
                                <div className="transport-content">
                                    <div className="transport-checkbox">
                                        <Input type="checkbox" placeholder="0"></Input>
                                        <span>Chọn để cho phép giao hàng với sản phẩm này</span>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Khối lượng <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input type="text" name="weight" placeholder="0" suffix="grams"></Input>
                                        <label>
                                            Chiều dài <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input type="text" name="weight" placeholder="0" suffix="cm"></Input>
                                        <label>
                                            Chiều rộng <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input type="text" name="weight" placeholder="0" suffix="cm"></Input>
                                        <label>
                                            Chiều cao <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input type="text" name="weight" placeholder="0" suffix="cm"></Input>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className={cx('content-right')}>
                            {/* <div className={cx('display')}>
                                <div className="display-title">
                                    <h3>Hiển thị</h3>
                                </div>
                                <div className="group-check-display">
                                    <div className="checkbox-group">
                                        <Input type="checkbox" name="website" id="website" />
                                        <label htmlFor="website">Website</label>
                                    </div>
                                    <div className="checkbox-group">
                                        <Input type="checkbox" name="hararetail" id="hararetail" />
                                        <label htmlFor="hararetail">Hararetail</label>
                                    </div>
                                </div>
                            </div> */}
                            <div className={cx('products-group')}>
                                <div className="products-title">
                                    <h3>Số lượng</h3>
                                </div>
                                <div className={cx('form-group')}>
                                    <Input
                                        type="text"
                                        name="quantity"
                                        id="quantity"
                                        value={productData.quantity}
                                        onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={cx('transport')}>
                                <div className="transport-title">
                                    <h3>Vận chuyển</h3>
                                </div>
                                <div className="transport-content">
                                    {/* <div className="transport-checkbox">
                                        <Input type="checkbox" placeholder="0"></Input>
                                        <span>Chọn để cho phép giao hàng với sản phẩm này</span>
                                    </div> */}
                                    <div className="form-group">
                                        <label>
                                            Khối lượng <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>

                                        <Input
                                            type="text"
                                            name="weight"
                                            placeholder="0"
                                            suffix="grams"
                                            onChange={(e) =>
                                                setProductData({
                                                    ...productData,
                                                    size: {
                                                        ...productData.size,
                                                        weight: parseInt(e.target.value),
                                                    },
                                                })
                                            }
                                        ></Input>
                                        <label>
                                            Chiều dài <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input
                                            type="text"
                                            name="length"
                                            placeholder="0"
                                            suffix="cm"
                                            onChange={(e) =>
                                                setProductData({
                                                    ...productData,
                                                    size: {
                                                        ...productData.size,
                                                        length: parseInt(e.target.value),
                                                    },
                                                })
                                            }
                                        ></Input>
                                        <label>
                                            Chiều rộng <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input
                                            type="text"
                                            name="width"
                                            placeholder="0"
                                            suffix="cm"
                                            onChange={(e) =>
                                                setProductData({
                                                    ...productData,
                                                    size: {
                                                        ...productData.size,
                                                        width: parseInt(e.target.value),
                                                    },
                                                })
                                            }
                                        ></Input>
                                        <label>
                                            Chiều cao <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input
                                            type="text"
                                            name="height"
                                            placeholder="0"
                                            suffix="cm"
                                            onChange={(e) =>
                                                setProductData({
                                                    ...productData,
                                                    size: {
                                                        ...productData.size,
                                                        height: parseInt(e.target.value),
                                                    },
                                                })
                                            }
                                        ></Input>
                                    </div>
                                </div>
                            </div>
                            {/* <div className={cx('brand')}></div>
                            <div className={cx('promotion')}></div> */}
                        </div>
                    </div>
                    <div className="submit-action">
                        <button className="btn-submit" type="submit">
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
