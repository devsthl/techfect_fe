import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function ButtonComponent({
    to,
    href,
    primary = false,
    default1 = false,
    primary2 = false,
    primary3 = false,
    primary4 = false,
    outline = false,
    small = false,
    small2 = false,
    large = false,
    normal = false,
    disabled = false,
    business = false,
    className,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    if (disabled) {
        delete props.onClick;
    }

    //remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        default1,
        primary2,
        primary3,
        primary4,
        business,
        normal,
        outline,
        disabled,
        small,
        small2,
        large,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default ButtonComponent;
