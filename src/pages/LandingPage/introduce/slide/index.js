import classNames from 'classnames/bind';
import styles from './SlideShowHistory.module.scss';
import ImageHistory from '~/assets/images/introduce';
import { useState } from 'react';

const cx = classNames.bind(styles);
function SlideShowHistory() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const list = ImageHistory.map((item, index) => {
        return (
            <div className={index === currentSlide ? cx('slide current') : cx('slide')} key={index}>
                {index === currentSlide && (
                    <div className={cx('detail-content')}>
                        <img src={item.image} alt="slide" />
                        <div className={cx('detail-document')}>
                            <h2>{item.heading}</h2>
                            <h3>{item.destitle}</h3>
                            <span>{item.des}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    });
    return <div className={cx('slide-container')}>{list}</div>;
}

export default SlideShowHistory;
