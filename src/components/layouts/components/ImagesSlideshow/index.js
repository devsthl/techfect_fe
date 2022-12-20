import classNames from 'classnames/bind';
import styles from './ImagesSlideshow.module.scss';
import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const cx = classNames.bind(styles);

function ImagesSlideshow({ slides }) {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const handleNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    return (
        <div className={cx('slide-container')}>
            {/* <div className={cx('leftArrow')} onClick={handlePrev}>❮</div>
            <div className={cx('rightArrow')} onClick={handleNext}>❯</div> */}
            <div className={cx('imageSlide')}>{slides[currentIndex]}</div>
            <div className={cx('sologan')}>
                <p className={cx('name')}>TECHFEST</p>
                <span>{t('home.name')}</span>
            </div>
        </div>
    );
}

export default ImagesSlideshow;
