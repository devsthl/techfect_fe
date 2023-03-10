import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateProduct.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Cascader, Form, Input, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import JoditEditor from 'jodit-react';
import { useDispatch, useSelector } from 'react-redux';
import { getTreeCategory } from '~/store/Categories/categorySlice';
import axios from 'axios';
import emptyIcon from '~/assets/images/Products/empty.svg';
import uploadIcon from '~/assets/images/Products/upload.svg';
import productsApi from '~/api/ProductsApi/productsApi';
import { useParams } from 'react-router-dom';
import { getProductById } from '~/store/Products/productsSlice';

const cx = classNames.bind(styles);
const { Option } = Select;

const EditProduct = () => {
    const dispatch = useDispatch();
    const { tree_category } = useSelector((state) => state.categoryReducer);
    const { productById } = useSelector((state) => state.productsReducer);
    const [isDisable, setIsDisable] = useState(true);
    const [files, setFiles] = useState([]);
    const { id } = useParams();

    const [productData, setProductData] = useState({
        name: productById.name,
        content: productById.content,
        store: productById.store,
        original_price: productById.original_price,
        quantity: productById.quantity,
        des: productById.des,
        image_url: productById.image_url,
        category_id: productById?.category?.id,
        store_id: productById?.store?.id,
    });
    // const [productData, setProductData] = useState({
    //     name: '',
    //     content: '',
    //     category: { id: '' },
    //     store: '',
    //     original_price: '',
    //     quantity: '',
    //     des: '',
    //     image_url: [],
    //     category_id: 0,
    //     store_id: 0,
    // });

    let formData = new FormData();
    useEffect(() => {
        dispatch(getTreeCategory());
        dispatch(getProductById(id));
    }, [dispatch, id]);

    // useEffect(() => {
    //     setProductData({

    //     })
    // }, [productById])

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
            <h3>Hi???n t???i ch??a c?? ???nh</h3>
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
                Th??m ???nh
            </label>
        </div>
    );

    // const isNotEmpty = (arr) => {
    //     return (
    //         <div className="image-container">
    //             <div className="big-image">
    //                 <div className="delete-image" onClick={() => removeImage(0)}>
    //                     X
    //                 </div>
    //                 {/* <img src={`${process.env.REACT_APP_API_URL}/${arr[0].url}`} alt="big" /> */}
    //             </div>
    //             <div className="small-image-container">
    //                 {arr.map((item, index) => {
    //                     if (index !== 0) {
    //                         return (
    //                             <div
    //                                 className="small-image"
    //                                 key={item.url}
    //                                 style={{
    //                                     backgroundImage: `url(${process.env.REACT_APP_API_URL}/${item.url})`,
    //                                 }}
    //                             >
    //                                 <div className="delete-image" onClick={() => removeImage(index)}>
    //                                     X
    //                                 </div>
    //                             </div>
    //                         );
    //                     }
    //                     return null;
    //                 })}
    //                 <div className="small-image upload">
    //                     <input
    //                         className="item__input"
    //                         type="file"
    //                         id="file-upload"
    //                         multiple
    //                         accept="image/*"
    //                         onChange={handleFilesChange}
    //                     />
    //                     <label htmlFor="file-upload">
    //                         <h4>Th??m ???nh</h4>
    //                         <img src={uploadIcon} alt="upload" />
    //                     </label>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await productsApi.create({
            ...productData,
            image_url: productData.image_url.map((item, index) => {
                if (item.url) return item.url;
                return item;
            }),
        });
    };

    return (
        <div className={cx('create-product-wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>Qu???n l?? s???n ph???m</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Ch???nh s???a s???n ph???m</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('content-main')}>
                        <div className={cx('content-left')}>
                            <div className={cx('general-info')}>
                                <div className={cx('general-info-title')}>
                                    <h3>Th??ng tin chung</h3>
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="product-name">T??n s???n ph???m</label>
                                    <Form.Item className={cx('form-item-group')} name="product-name">
                                        <Input
                                            className={cx('input-10')}
                                            placeholder="Nh???p t??n s???n ph???m"
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
                                        <label htmlFor="">Nh?? cung c???p</label>
                                        <Form.Item className={cx('form-item-group')} name="supplier">
                                            <Select className={cx('select-group')} placeholder="Ch???n nh?? cung c???p">
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select>
                                        </Form.Item>
                                    </div> */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="">Lo???i</label>
                                        <Form.Item className={cx('form-item-group')} name="type">
                                            {/* <Select className={cx('select-group')} placeholder="Ch???n lo???i s???n ph???m">
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
                                                placeholder="Ch???n danh m???c"
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
                                    <label htmlFor="">M?? t??? s???n ph???m</label>
                                    <JoditEditor
                                        className="abcs"
                                        value={productData.des}
                                        onChange={(value) => setProductData({ ...productData, des: value })}
                                    />
                                </div>
                                <div className={cx('form-group', 'quote')}>
                                    <label htmlFor="product-quote">Tr??ch d???n</label>
                                    <Input
                                        className={cx('input-10')}
                                        placeholder="Tr??ch d???n s???n ph???m"
                                        id="product-quote"
                                        value={productData.content}
                                        onChange={(e) => setProductData({ ...productData, content: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={cx('products-image')}>
                                <div className="product-image__title">
                                    <h3>H??nh ???nh s???n ph???m</h3>
                                </div>
                                <div className="product-image__content">
                                    {/* {productData.image_url === null || productData.image_url?.length === 0
                                        ? isEmpty
                                        : isNotEmpty(productData.image_url)} */}
                                </div>
                            </div>
                            <div className={cx('products-price')}>
                                <div className={cx('products-price-title')}>
                                    <h3>Gi?? s???n ph???m</h3>
                                </div>
                                <div className="price-group">
                                    <div className="form-group">
                                        <label htmlFor="price">
                                            Gi?? b??n <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input
                                            name="price"
                                            id="price"
                                            placeholder="0 ??"
                                            value={productData.price}
                                            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="compare-price">
                                            Gi?? g???c <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input
                                            name="compare-price"
                                            id="compare-price"
                                            placeholder="0 ??"
                                            value={productData.original_price}
                                            onChange={(e) =>
                                                setProductData({ ...productData, original_price: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('transport')}>
                                <div className="transport-title">
                                    <h3>V???n chuy???n</h3>
                                </div>
                                <div className="transport-content">
                                    <div className="transport-checkbox">
                                        <Input type="checkbox" placeholder="0"></Input>
                                        <span>Ch???n ????? cho ph??p giao h??ng v???i s???n ph???m n??y</span>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Kh???i l?????ng <FontAwesomeIcon icon={faCircleQuestion} />
                                        </label>
                                        <Input type="text" name="weight" placeholder="0" suffix="grams"></Input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-right')}>
                            {/* <div className={cx('display')}>
                                <div className="display-title">
                                    <h3>Hi???n th???</h3>
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
                                    <h3>S??? l?????ng</h3>
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
                            {/* <div className={cx('brand')}></div>
                            <div className={cx('promotion')}></div> */}
                        </div>
                    </div>
                    <div className="submit-action">
                        <button className="btn-submit" type="submit">
                            Th??m
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
