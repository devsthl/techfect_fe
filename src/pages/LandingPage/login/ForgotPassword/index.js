import classNames from 'classnames/bind';
import styles from './ForgotPassWord.module.scss';
import { useTranslation, Trans } from 'react-i18next';
import ButtonComponent from '~/components/layouts/components/Button';
import usersApi from '~/api/usersApi';
import { useState } from 'react';
import ToastPopup, { notifyError, notifySuccess } from '~/toast/toast';

const cx = classNames.bind(styles);
function ForgotPassWord() {
    const { t } = useTranslation();
    const [email, setEmail] = useState();

    const handleForget = async (e) => {
        e.preventDefault();
        await usersApi.sendVerifyWeb({ user_name: email });
        if (!email) {
            notifyError('Vui lòng nhập e-mail!');
        } else {
            notifySuccess('Vui lòng kiểm tra e-mail!');
        }
        setEmail('');
    };
    return (
        <div className={cx('wrapper')}>
            <ToastPopup />
            <div className={cx('container')}>
                <div className={cx('content-login')}>
                    <div className={cx('content-right')}>
                        <span className={cx('title')}>{t('login.forgetpassword.title')}</span>
                        <form className={cx('login-form')} action="" onSubmit={handleForget}>
                            <div className={cx('form-item-input')}>
                                <input
                                    id={cx('username')}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder={t('login.forgetpassword.detail')}
                                    type="text"
                                ></input>
                            </div>
                            <p>{t('login.forgetpassword.title2')}</p>

                            <div>
                                <ButtonComponent
                                    primary4
                                    className={cx('btn-login')}
                                    type="submit"
                                    // to="/login/forgetpassword/checkotp"
                                >
                                    {t('login.forgetpassword.continue')}
                                </ButtonComponent>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassWord;
