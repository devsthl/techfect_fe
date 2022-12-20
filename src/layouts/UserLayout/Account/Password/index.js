import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserPassword.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';
import { type } from '@testing-library/user-event/dist/type';
import { changePassword } from '~/store/CustomerProfile/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { message as Notify } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const UserPassword = () => {
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [comfirmPassword, setComfirmPassword] = useState();
    const [hidePassword, setHidePassword] = useState(false);
    const [hideNewPassword, setHideNewPassword] = useState(false);
    const [hideComfirmPassword, setHideComfirmPassword] = useState(false);
    const [checkComfirm, setCheckComfirm] = useState(true);
    const navigate = useNavigate();

    const typePassword = !hidePassword ? 'password' : 'text';
    const typeNewPassword = !hideNewPassword ? 'password' : 'text';
    const typeComfirmPassword = !hideComfirmPassword ? 'password' : 'text';
    const { message } = useSelector((state) => state.customerReducer);

    const dispatch = useDispatch();

    const handleCurPassword = (e) => {
        setCurrentPassword(e.target.value);
    };

    useEffect(() => {
        if (message !== '') {
            if (message.errors === 'USER_PASSWORD_INVALID') {
                Notify.error('Sai mật khẩu');
            }
            if (message.message === 'Success') {
                Notify.success('Đổi mật khẩu thành công');
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('info');
                navigate('/login');
            }
        }
    }, [message]);

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleComfirmPassword = (e) => {
        setComfirmPassword(e.target.value);
    };

    const handleCheckComfirm = () => {
        newPassword === comfirmPassword ? setCheckComfirm(true) : setCheckComfirm(false);
    };

    const onSubmitChangePass = (e) => {
        e.preventDefault();

        if (newPassword === comfirmPassword) {
            dispatch(
                changePassword({
                    password: currentPassword,
                    new_password: newPassword,
                }),
            );
        }
    };

    return (
        <div className={cx('change-password')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>
                    <span>Đổi mật khẩu</span>
                </div>
                <div className={cx('content-main')}>
                    <form onSubmit={onSubmitChangePass}>
                        <div className={cx('form-group')}>
                            <label htmlFor="password">Mật khẩu:</label>
                            <div className={cx('input-group')}>
                                <input
                                    value={currentPassword}
                                    type={typePassword}
                                    name="password"
                                    id="password"
                                    placeholder="******"
                                    onChange={(e) => handleCurPassword(e)}
                                />
                                <FontAwesomeIcon
                                    onClick={() => setHidePassword(!hidePassword)}
                                    icon={!hidePassword ? faEyeLowVision : faEye}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="new-password">Mật khẩu mới:</label>
                            <div className={cx('input-group')}>
                                <input
                                    value={newPassword}
                                    type={typeNewPassword}
                                    name="new-password"
                                    id="new-password"
                                    placeholder="******"
                                    onChange={(e) => handleNewPassword(e)}
                                />
                                <FontAwesomeIcon
                                    onClick={() => setHideNewPassword(!hideNewPassword)}
                                    icon={!hideNewPassword ? faEyeLowVision : faEye}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="">Nhập lại mật khẩu:</label>
                            <div className={cx('input-group')}>
                                <input
                                    value={comfirmPassword}
                                    type={typeComfirmPassword}
                                    name="comfirm-password"
                                    id="comfirm-password"
                                    placeholder="******"
                                    onChange={(e) => handleComfirmPassword(e)}
                                    onBlur={handleCheckComfirm}
                                    onFocus={() => setCheckComfirm(true)}
                                />
                                <FontAwesomeIcon
                                    onClick={() => setHideComfirmPassword(!hideComfirmPassword)}
                                    icon={!hideComfirmPassword ? faEyeLowVision : faEye}
                                />
                            </div>
                            {checkComfirm ? (
                                <></>
                            ) : (
                                <span className={cx('error-message')}>Mật khẩu không trùng khớp</span>
                            )}
                        </div>
                        <div className={cx('submit-action')}>
                            <button className={cx('btn-submit')} type="submit">
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserPassword;
