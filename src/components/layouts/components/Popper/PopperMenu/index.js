import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './PopperMenu.module.scss';
import { Wrapper2 as PopperWrapper2 } from '~/components/layouts/components/Popper';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);
function PopperMenu({ children, items = [], setShowProfile }) {
    const renderItem = items.map((item, index) => {
        return (
            <span key={index}>
                {item.icon}
                {item.title}
            </span>
        );
    });
    return (
        <Tippy
            interactive
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                    <PopperWrapper2>{renderItem}</PopperWrapper2>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default PopperMenu;
