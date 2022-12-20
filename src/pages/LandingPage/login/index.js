import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images/login/staff';
import { useTranslation, Trans } from 'react-i18next';
import usersApi from '~/api/usersApi';
import ToastPopup, { notifyError, notifySuccess } from '~/toast/toast';
import { useSelector } from 'react-redux';
import ButtonComponent from '~/components/layouts/components/Button';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { isAdmin, isCustomer, isEnterprise } from '~/utils/utils';
import jwt_decode from 'jwt-decode';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import ModalRegister from '~/components/Modal/ModalRegister';
import packageApi from '~/api/Package/packageApi';

const cx = classNames.bind(styles);
function Login() {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberChecked, setRememberChecked] = useState(false);
    const [currentModal, setCurrentModal] = useState(false);
    const navigate = useNavigate();

    const { isAuth } = useSelector((state) => state.userReducer);

    const account = localStorage.getItem('account') === null ? null : JSON.parse(localStorage.getItem('account'));

    useEffect(() => {
        if (account?.checked) {
            setUsername(account?.user_name);
            setPassword(account?.password);
            setRememberChecked(account?.checked);
        }
    }, []);

    useEffect(() => {
        if (isCustomer() && isAuth && navigate('/'));
        if (isAdmin() && isAuth && navigate('/businessmanage/listbusiness'));
        if (isEnterprise() && isAuth && navigate('/'));
    }, [isAuth, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await usersApi.login({
                user_name: username.trim(),
                password: password.trim(),
            });
            if (res.message === 'error') notifyError('Đăng nhập không thành công, Vui lòng nhập lại!');
            else {
                notifySuccess('Đăng nhập thành công');

                localStorage.setItem('user', JSON.stringify(res));
                localStorage.setItem('access_token', JSON.stringify(res.access_token));
                localStorage.setItem('refresh_token', JSON.stringify(res.refresh_token));
                localStorage.setItem('info', JSON.stringify(res));
                const resPackage = await packageApi.getPackageRegistered();
                localStorage.setItem('package', JSON.stringify(resPackage));

                if (rememberChecked) {
                    localStorage.setItem(
                        'account',
                        JSON.stringify({
                            user_name: username.trim(),
                            password: password.trim(),
                            checked: rememberChecked,
                        }),
                    );
                } else {
                    localStorage.removeItem('account');
                }

                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            notifyError('Đăng nhập không thành công');
        }
    };

    const handleClose = (e) => {
        setCurrentModal(false);
    };

    const handleSubmit = async (response) => {
        var user = jwt_decode(response.credential);
        const data = {
            user: {
                email: user.email,
                familyName: user.familyName,
                givenName: user.givenName,
                id: user.sub,
                name: user.name,
                photo: user.name,
            },
        };

        const res = await usersApi.loginGoolge(data);
        if (res.message === 'error') notifyError('Đăng nhập không thành công, Vui lòng nhập lại!');
        else {
            notifySuccess('Đăng nhập thành công');
            const resPackage = packageApi.getPackageRegistered();
            console.log('resPackage', resPackage);
            localStorage.setItem('user', JSON.stringify(res));
            localStorage.setItem('access_token', JSON.stringify(res.access_token));
            localStorage.setItem('refresh_token', JSON.stringify(res.refresh_token));
            localStorage.setItem('info', JSON.stringify(res));
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    const responseFacebook = async (response) => {
        if (response.status !== 'unknown') {
            const data = {
                accessToken: response.accessToken,
                email: response.email,
                name: response.name,
                picture: response.picture,
                id: response.id,
            };

            if (data.id !== undefined) {
                const res = await usersApi.loginFacebook(data);
                if (res.message === 'error') notifyError('Đăng nhập không thành công, Vui lòng nhập lại!');
                else {
                    notifySuccess('Đăng nhập thành công');
                    localStorage.setItem('user', JSON.stringify(res));
                    localStorage.setItem('access_token', JSON.stringify(res.access_token));
                    localStorage.setItem('refresh_token', JSON.stringify(res.refresh_token));
                    localStorage.setItem('info', JSON.stringify(res));
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ModalRegister visible={currentModal} onHide={handleClose} />
            <div className={cx('container')}>
                <ToastPopup />
                <div className={cx('content-login')}>
                    <div className={cx('content-right')}>
                        <span className={cx('title')}>{t('login.title')}</span>
                        <form className={cx('login-form')} action="" onSubmit={handleLogin}>
                            <div className={cx('form-item-input')}>
                                <img src={images.UserIcon} alt="icon" />
                                <input
                                    value={username}
                                    id={cx('username')}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    placeholder={t('login.username')}
                                    type="text"
                                    autoComplete="false"
                                ></input>
                            </div>
                            <div className={cx('form-item-input')}>
                                <img src={images.PasswordIcon} alt="icon" />
                                <input
                                    id={cx('password')}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    placeholder={t('login.password')}
                                    value={password}
                                    type="password"
                                    autoComplete="false"
                                ></input>
                            </div>
                            <div className={cx('password-action')}>
                                <div className={cx('remember-password')}>
                                    <input
                                        id={cx('btn-checkbox')}
                                        checked={rememberChecked}
                                        onChange={() => {
                                            setRememberChecked(!rememberChecked);
                                        }}
                                        type="checkbox"
                                    />
                                    <span>{t('login.repassword')}</span>
                                </div>
                                <ButtonComponent to="/login/forgetpassword" className={cx('forgot-password')}>
                                    <p>{t('login.fopassword')}</p>
                                </ButtonComponent>
                            </div>
                            <div>
                                <ButtonComponent primary4 className={cx('btn-login')} type="submit">
                                    {t('login.login')}
                                </ButtonComponent>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={cx('content-login-social')}>
                    <div className={cx('content-login-social-detail')}>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                handleSubmit(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                        />
                        <FacebookLogin
                            appId="582180726997209"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            render={(renderProps) => (
                                <button
                                    style={{
                                        background: '#6686CA',
                                        fontSize: '14px',
                                        height: '40px',
                                        color: '#ffffff',
                                        border: '1px solid #6686CA',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={renderProps.onClick}
                                >
                                    <FontAwesomeIcon
                                        style={{
                                            fontSize: '1.8rem',
                                            marginRight: '8px',
                                        }}
                                        icon={faFacebook}
                                    />
                                    Đăng nhập với Facebook
                                </button>
                            )}
                        />
                    </div>
                    <div className={cx('content-login-register')}>
                        <p>{t('login.account')}</p>
                        <p
                            className={cx('register')}
                            onClick={() => {
                                setCurrentModal(true);
                            }}
                        >
                            {t('login.register')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
