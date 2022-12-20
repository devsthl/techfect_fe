import React from 'react';
import classNames from 'classnames/bind';
import styles from './Wrapper2.module.scss';

const cx = classNames.bind(styles);

const Wrapper2 = ({ children, className }) => {
    return <div className={cx('wrapper', className)}>{children}</div>;
};

export default Wrapper2;
