import classNames from 'classnames/bind';
import styles from './Document.module.scss';
import images from '~/assets/images/home/header';

import ButtonComponent from '~/components/layouts/components/Button';
import { useState } from 'react';
import ListDocument from './Components/ListDocument';
import { getAllDocuments } from '~/store/Documents/documentsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);
function Document() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { documentsList } = useSelector((state) => state.documentsReducer);
    useEffect(() => {
        dispatch(getAllDocuments());
    }, [dispatch]);
    const MENU = [
        {
            id: 1,
            title: t('text.Gallery'),
            image: <img src={images.documenticonimage} alt="" />,
        },
        {
            id: 2,
            title: t('text.Event_Material'),
            image: <img src={images.documenticonfolder} alt="" />,
        },
        {
            id: 3,
            title: 'Video',
            image: <img src={images.documenticonvideo} alt="" />,
        },
    ];
    const [currentId, setCurrentId] = useState(1);

    const handleSwitch = (e) => {
        setCurrentId(e);
    };
    const list = MENU.map((item, index) => {
        return (
            <div key={index}>
                <ButtonComponent
                    onClick={() => handleSwitch(item.id)}
                    leftIcon={item.image}
                    outline
                    large
                    className={currentId === item.id ? `${cx('currentId')}` : null}
                >
                    {item.title}
                </ButtonComponent>
            </div>
        );
    });
    const listImage = [
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
        {
            image: <img src={images.advisor1} />,
            video: (
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/embed/3beiUvff8vM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            ),
        },
    ];
    const checkImage = (arrImage) => {
        if (arrImage === null) return null;
        else return process.env.REACT_APP_API_URL + arrImage.url;
    };
    const listI = documentsList.map((item, index) => {
        return (
            <div className={cx('container-image')}>
                {item.type === 1 && (
                    <div className={cx('list-image')}>
                        <p className={cx('title-image')}>{item.name}</p>
                        <div className={cx('detail-image')}>
                            {item.image_url.map((images) => {
                                return <img src={checkImage(images)} />;
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    });
    const listV = listImage.map((item, index) => {
        return <div>{item.video}</div>;
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content-btn')}>
                    <div className={cx('btn')}>{list}</div>
                    <div className={cx('detail')}>
                        {currentId === 1 ? <div className={cx('deltai-images')}>{listI}</div> : null}
                        {currentId === 3 ? <div className={cx('detail-video')}>{listV}</div> : null}
                        {currentId === 2 ? (
                            <div className={cx('detail-download')}>
                                {documentsList.map((item, index) => {
                                    return (
                                        <ListDocument item={item} currentId={currentId} />
                                        // <div>123</div>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Document;
