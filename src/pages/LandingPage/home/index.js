import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye, faStore, faHeart, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './Home.scss';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import bannerCourse from '~/assets/images/ListCourses/bannerCourse.jpg';
import banner2 from '~/assets/images/ListCourses/banner2.jpg';
import banner3 from '~/assets/images/ListCourses/banner3.jpg';
import banner4 from '~/assets/images/ListCourses/banner4.jpg';
import advise1 from '~/assets/images/home/header/advise1.jpg';
import advise2 from '~/assets/images/home/header/advise2.jpg';
import advise3 from '~/assets/images/home/header/advise3.jpg';
import advise4 from '~/assets/images/home/header/advise4.jpg';
import advise5 from '~/assets/images/home/header/advise5.jpg';
import advise6 from '~/assets/images/home/header/advise6.jpg';
import consultant1 from '~/assets/images/home/header/donguyenhung.jpeg';
import consultant2 from '~/assets/images/home/header/doankieumy.jpeg';
import consultant3 from '~/assets/images/home/header/truongducluong.jpeg';

import { getAllField } from '~/store/Store/storeSlice';
import { getAllCourse } from '~/store/Course/courseSlice';
import { getAllNews } from '~/store/News/newsSlice';
import { getAllProduct } from '~/store/Products/productsSlice';
import { message, Skeleton } from 'antd';
import CartApi from '~/api/Cart/cartApi';
import formatCash from '~/utils/formatCash';
import { onLike } from '~/store/Like/likeSlice';

function Home() {
    const { isAuth } = useSelector((state) => state.userReducer);
    const { listField } = useSelector((state) => state.storesReducer);
    const { listCourses } = useSelector((state) => state.courseReducer);
    const { listNews } = useSelector((state) => state.newsReducer);
    const { listProductsOfStore, loading } = useSelector((state) => state.productsReducer);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    useEffect(() => {
        dispatch(getAllField());
        dispatch(getAllCourse(1, 3));
        dispatch(
            getAllNews({
                index: 1,
                size: 3,
            }),
        );
        dispatch(getAllProduct());
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
        rows: 1,
    };

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: false,
        rows: 1,
    };

    const imageArray = [
        {
            id: 1,
            url: banner2,
        },
        {
            id: 2,
            url: banner3,
        },
        {
            id: 3,
            url: banner4,
        },
    ];

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

    const handleLikeProduct = async (item) => {
        if (user === null) {
            message.warning('Bạn phải đăng nhập để yêu thích sản phẩm');
        } else {
            dispatch(onLike({ product_id: item.id }));
        }
    };

    console.log('listProductsOfStore', listProductsOfStore.message === 'error');

    return (
        <div className="home-wrapper">
            {/* <div className="contact_btn">
                <button>
                    <FontAwesomeIcon icon={faPhone} /> (+84) 24 3350 3168
                </button>
            </div> */}
            <div className="inner">
                <div className="slider-group">
                    <Slider {...settings}>
                        {imageArray.map((item) => {
                            return (
                                <div className="img-group">
                                    <img src={item.url} alt="" />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                <div className="content-main">
                    <div data-aos="fade-up" className="booth-startup">
                        <h2>{t('text.Startup_Community')}</h2>
                        <div className="list-booth">
                            <Slider {...settings2}>
                                {listField.map((item) => {
                                    return (
                                        <div className="booth-item">
                                            <Skeleton loading={loading}>
                                                <div className="booth-item-wrapper">
                                                    <div className="image-wrap">
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL}${item.image_url[0].url}`}
                                                            alt=""
                                                        />
                                                        <div className="overlay-wrap">
                                                            <FontAwesomeIcon
                                                                onClick={() => {
                                                                    navigate(`/stores/viewstore/${item.id}`);
                                                                }}
                                                                icon={faEye}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="detail-wrap">
                                                        <p>Smile Tech</p>
                                                        <h5
                                                            onClick={() => {
                                                                navigate(`/stores/viewstore/${item.id}`);
                                                            }}
                                                        >
                                                            {item.name}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </Skeleton>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                    <div data-aos="fade-up" className="store-group">
                        <div className="top-sell-product">
                            <h2>{t('text.Best_selling')}</h2>
                            <div className="list-product">
                                {listProductsOfStore.status === 500 ? (
                                    <></>
                                ) : (
                                    listProductsOfStore?.map((item, index) => {
                                        if (index <= 9) {
                                            return (
                                                <Skeleton loading={loading}>
                                                    <div className="product-item">
                                                        <div
                                                            className="img-group"
                                                            onClick={() => {
                                                                navigate(`/stores/viewstore/detail-product/${item.id}`);
                                                            }}
                                                        >
                                                            <img
                                                                src={`${process.env.REACT_APP_API_URL}${item.image_url[0].url}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="text-group">
                                                            <ul>
                                                                <li className="p_icon"></li>
                                                                <li>
                                                                    <div
                                                                        className="add_cart_btn"
                                                                        onClick={() => handleAddToCart(item)}
                                                                    >
                                                                        Add To Cart
                                                                    </div>
                                                                </li>
                                                                <li className="p_icon">
                                                                    <FontAwesomeIcon
                                                                        style={
                                                                            item?.total_like === 1
                                                                                ? { color: 'red' }
                                                                                : {}
                                                                        }
                                                                        onClick={() => handleLikeProduct(item)}
                                                                        icon={faHeart}
                                                                    />
                                                                </li>
                                                            </ul>
                                                            <p className="store-name">
                                                                <FontAwesomeIcon icon={faStore} />
                                                                {item.store.name}
                                                            </p>
                                                            <h4>{item.name}</h4>
                                                            <h5>
                                                                <span>
                                                                    {formatCash(item.original_price.toString())} đ
                                                                </span>
                                                                <del>{formatCash(item.price.toString())} đ</del>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </Skeleton>
                                            );
                                        } else {
                                            return <></>;
                                        }
                                    })
                                )}
                            </div>
                        </div>
                        <div data-aos="fade-up" className="new-product">
                            <h2>{t('text.new_product')}</h2>
                            <div className="list-product">
                                {listProductsOfStore.map((item, index) => {
                                    if (index <= 9) {
                                        return (
                                            <div className="product-item">
                                                <div
                                                    className="img-group"
                                                    onClick={() => {
                                                        navigate(`/stores/viewstore/detail-product/${item.id}`);
                                                    }}
                                                >
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}${item.image_url[0].url}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="text-group">
                                                    <ul>
                                                        <li className="p_icon"></li>
                                                        <li>
                                                            <a className="add_cart_btn" href="#">
                                                                Add To Cart
                                                            </a>
                                                        </li>
                                                        <li className="p_icon">
                                                            <FontAwesomeIcon
                                                                style={item?.total_like === 1 ? { color: 'red' } : {}}
                                                                onClick={() => handleLikeProduct(item)}
                                                                icon={faHeart}
                                                            />
                                                        </li>
                                                    </ul>
                                                    <p className="store-name">
                                                        <FontAwesomeIcon icon={faStore} />
                                                        {item.store.name}
                                                    </p>
                                                    <h4>{item.name}</h4>
                                                    <h5>
                                                        <span>{formatCash(item.original_price.toString())} đ</span>
                                                        <del>{formatCash(item.price.toString())} đ</del>
                                                    </h5>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return <></>;
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-up" className="course-banner">
                        <img src={bannerCourse} alt="" />
                    </div>
                    <div data-aos="fade-up" className="course-group">
                        <h2>{t('text.Courses')}</h2>
                        <div className="list-course">
                            {listCourses.map((item, index) => {
                                if (index <= 2) {
                                    return (
                                        <div key={index} className="course-item">
                                            <div
                                                className="image"
                                                onClick={() => {
                                                    user === null
                                                        ? message.info('Bạn phải đăng nhập')
                                                        : navigate(`/course-register/${item.id}`);
                                                    window.scrollTo(0, 0);
                                                }}
                                            >
                                                <img
                                                    src={
                                                        item.image_url === undefined
                                                            ? ''
                                                            : `${process.env.REACT_APP_API_URL}${item.image_url[0].url}`
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="course-text">
                                                <div className="course-text__top">
                                                    <h3
                                                        onClick={() => {
                                                            user === null
                                                                ? message.info('Bạn phải đăng nhập')
                                                                : navigate(`/course-register/${item.id}`);
                                                            window.scrollTo(0, 0);
                                                        }}
                                                    >
                                                        {item.name}
                                                    </h3>
                                                    <span className="course-desc">{item?.des}</span>
                                                </div>
                                                <span className="date">
                                                    Từ {item.begin_date.substring(5, 10)} đến{' '}
                                                    {item.over_date.substring(5, 10)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return <></>;
                                }
                            })}

                            <div className="btn-show-more-course">
                                <button
                                    onClick={() => {
                                        navigate('/activities?key=courses');
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    Xem thêm
                                </button>
                            </div>
                        </div>
                        <div data-aos="fade-up" className="advise-group">
                            <h2>{t('text.Consultants')}</h2>
                            <div className="list-consultants">
                                <div className="consultants-item">
                                    <div className="image-group">
                                        <img src={consultant1} alt="" />
                                        <div>
                                            <h5>Đỗ Nguyên Hưng</h5>
                                            <span>{t('text.Leader_of_Education_technology_Community')}</span>
                                        </div>
                                    </div>
                                    <div className="social-network">
                                        <FontAwesomeIcon icon={faFacebook} />
                                        <FontAwesomeIcon icon={faTwitter} />
                                        <FontAwesomeIcon icon={faInstagram} />
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </div>
                                </div>

                                <div className="consultants-item">
                                    <div className="image-group">
                                        <img src={consultant2} alt="" />
                                        <div>
                                            <h5>Đoàn Kiều My</h5>
                                            <span>{t('text.Leader_of_Pioneer_technology_Community')}</span>
                                        </div>
                                    </div>
                                    <div className="social-network">
                                        <FontAwesomeIcon icon={faFacebook} />
                                        <FontAwesomeIcon icon={faTwitter} />
                                        <FontAwesomeIcon icon={faInstagram} />
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </div>
                                </div>

                                <div data-aos="fade-up" className="consultants-item">
                                    <div className="image-group">
                                        <img src={consultant3} alt="" />
                                        <div>
                                            <h5>Trương Đức Lượng</h5>
                                            <span>{t('text.Leader_of_Cybersecurity_technology_Community')}</span>
                                        </div>
                                    </div>
                                    <div className="social-network">
                                        <FontAwesomeIcon icon={faFacebook} />
                                        <FontAwesomeIcon icon={faTwitter} />
                                        <FontAwesomeIcon icon={faInstagram} />
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-up" className="news-group">
                            <h2>{t('text.Highlights')}</h2>
                            <div className="list-news">
                                {listNews?.map((item) => {
                                    return (
                                        <div className="blog__item">
                                            <Link to={`/news/${item.id}`} className="blog__item-thumb">
                                                <img
                                                    src={
                                                        item?.image_url === undefined || item?.image_url.length === 0
                                                            ? ''
                                                            : `${process.env.REACT_APP_API_URL}${item?.image_url[0].url}`
                                                    }
                                                    alt="blog"
                                                />
                                                <div className="blog__item-date">
                                                    <div className="date__day">30</div>
                                                    <div className="date__month">August</div>
                                                </div>
                                                <div className="blog__item-background"></div>
                                            </Link>

                                            <div className="blog__item-main">
                                                <Link to={`/news/${item.id}`} className="blog__item-name">
                                                    {item.name}
                                                </Link>
                                                <div className="blog__item-des">Tin tức công nghệ mới nhất</div>
                                                <Link to={`/news/${item.id}`} className="read__more">
                                                    {t('text.Read_more')}
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="cooperate-group">
                            <img data-aos="fade-right" src={advise1} alt="" />
                            <img data-aos="fade-right" src={advise2} alt="" />
                            <img data-aos="fade-right" src={advise3} alt="" />
                            <img data-aos="fade-left" src={advise4} alt="" />
                            <img data-aos="fade-left" src={advise5} alt="" />
                            <img data-aos="fade-left" src={advise6} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
