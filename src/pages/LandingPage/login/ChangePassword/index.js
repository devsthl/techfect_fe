import classNames from 'classnames/bind';
import styles from './ChangePassWord.module.scss';
import { useTranslation, Trans } from 'react-i18next';
import ButtonComponent from '~/components/layouts/components/Button';
import ModalConfirm from '~/components/Modal/ModalConfirmChangePassword';
import { useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import usersApi from '~/api/usersApi';
import ToastPopup, { notifyError, notifySuccess } from '~/toast/toast';

const cx = classNames.bind(styles);

function ChangePassWord() {
    const { id } = useParams();
    const [currentModal, setCurrentModal] = useState(false);
    const [key, setkey] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (
            password.length === 0 ||
            password.length < 6 ||
            confirmPassword.length < 6 ||
            (confirmPassword === 0 && !confirmPassword) ||
            !password ||
            password !== confirmPassword
        ) {
            notifyError('Nhập mật khẩu không khớp hoặc bỏ trống, vui lòng nhập lại!');
            setPassword('');
            setConfirmPassword('');
        } else {
            const res = await usersApi.forgetPassWordWeb({
                token: keys,
                password: password,
            });
            notifySuccess('Đổi mật khẩu thành công!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            setPassword('');
            setConfirmPassword('');
        }
    };
    const handleClose = () => {
        setCurrentModal(false);
    };
    const { t } = useTranslation();
    const handleForget = () => {
        setCurrentModal(false);
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const keys = searchParams.get('key');

    return (
        <div className={cx('wrapper')}>
            <ToastPopup />
            <ModalConfirm visible={currentModal} onHide={handleClose} />
            <div className={cx('container')}>
                <div className={cx('content-login')}>
                    <div className={cx('content-right')}>
                        <span className={cx('title')}>{t('login.changepassword.title1')}</span>
                        <form className={cx('login-form')} action="" onSubmit={handleForget}>
                            <p>{t('login.changepassword.title2')}</p>
                            <div className={cx('form-item-input')}>
                                <input
                                    id={cx('username')}
                                    type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    placeholder={t('login.changepassword.title3')}
                                ></input>
                            </div>
                            <div className={cx('form-item-input')}>
                                <input
                                    id={cx('username')}
                                    type="password"
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                    placeholder={t('login.changepassword.title4')}
                                ></input>
                            </div>
                            <ButtonComponent
                                primary4
                                className={cx('btn-login')}
                                type="submit"
                                // to="/login/forgetpassword/changepassword"
                                onClick={handleConfirm}
                            >
                                {t('login.confirm')}
                            </ButtonComponent>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassWord;
