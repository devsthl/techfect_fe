import classNames from 'classnames/bind';
import { useState } from 'react';
import Competition from './Components/Competition';
import styles from './Events.module.scss';
import Competition2 from './Components/Competition2';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

function Events() {
    const { t } = useTranslation();
    const [current, setCurrent] = useState(1);
    const MENU = [
        {
            id: 1,
            title: t('text.WORKSHOPS'),
        },
        {
            id: 2,
            title: t('text.Competition'),
        },
        // {
        //     id: 3,
        //     title: "KHÁC"
        // },
    ];
    const MENU2 = [
        {
            id: 1,
            title: t('text.Avatar'),
        },
        {
            id: 2,
            title: t('text.Time'),
        },
        {
            id: 3,
            title: t('text.Programmes'),
        },
        {
            id: 3,
            title: t('text.Location'),
        },
        {
            id: 3,
            title: t('text.status'),
        },
    ];
    const list2 = MENU2.map((item, index) => {
        return (
            <div key={index} className={cx('list-title')}>
                {item.title}
            </div>
        );
    });
    const list = MENU.map((item, index) => {
        return (
            <div
                key={index}
                className={current === item.id ? `${cx('list-item')}` : ''}
                onClick={() => setCurrent(item.id)}
            >
                {item.title}
            </div>
        );
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('switch')}>{list}</div>
            {/* <div className={cx('title')}>{list2}</div> */}
            <div className={cx('content')}>
                {current === 1 ? (
                    <>
                        <Competition />
                    </>
                ) : null}
                {current === 2 ? (
                    <div>
                        <Competition2 />
                    </div>
                ) : null}
                {current === 3 ? <div>component3</div> : null}
            </div>
        </div>
    );
}

export default Events;
