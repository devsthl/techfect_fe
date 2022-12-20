import classNames from 'classnames/bind';
import styles from './CheckOtp.module.scss';
import { useTranslation, Trans } from 'react-i18next';
import ButtonComponent from '~/components/layouts/components/Button';
import axios from 'axios';

const cx = classNames.bind(styles);
function CheckOtp() {
    const { t } = useTranslation();
    return (
        <div className={cx('wrapper')}>
            <h3 style={{ color: 'white' }}>Vui lòng xác nhận email để tiếp tục</h3>
            {/* <ToastPopup /> */}
            {/* <div className={cx('container')}>
                <div className={cx('content-login')}>
                    <div className={cx('content-right')}>
                        <span className={cx('title')}>{t('login.checkotp.title')}</span>
                        <form className={cx('login-form')} action=""
                            onSubmit={handleForget}
                        >
                            <p>{t('login.checkotp.title2')}</p>
                            <div className={cx('form-item-input')}>
                                <input
                                    id={cx('username')}
                                    type="number"
                                    // onChange={(e) => {
                                    //     setUsername(e.target.value);
                                    // }}
                                    placeholder={t('login.checkotp.title3')}
                                >
                                </input>
                            </div>
                            <ButtonComponent primary4 className={cx('btn-login')} type="submit"
                                to="/login/forgetpassword/changepassword"
                            >
                                {t('login.forgetpassword.continue')}
                            </ButtonComponent>
                            <span>{t('login.checkotp.title4')}</span>

                        </form>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default CheckOtp;
