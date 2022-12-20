import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import usersApi from '~/api/usersApi';

import ToastPopup, { notifySuccess, notifyError } from '~/toast/toast';
import { isValid, validate } from '~/utils/validate';

import classNames from 'classnames/bind';
import styles from './Individual.module.scss';

import { useNavigate } from 'react-router-dom';
import ButtonComponent from '~/components/layouts/components/Button';

const cx = classNames.bind(styles);
function IndividualRegister({ onHide, ref }) {
    const { t } = useTranslation();
    const [currentModal, setCurrentModal] = useState(false);
    const navigate = useNavigate();
    const formData = new FormData();
    const [value, setValue] = useState({});

    useImperativeHandle(ref, () => ({
        closeModalFromChild() {
            setCurrentModal(false);
        },
    }));

    const handleUploadImage = async (e) => {
        for (const key of Object.keys(e.target.files)) {
            formData.append('files', e.target.files[key]);
        }
        try {
            const res = await usersApi.uploadImage(formData);
            setValue({ ...value, [e.target.name]: res.url[0] });
            notifySuccess('Upload ảnh thành công');
        } catch (error) {
            notifyError('Upload ảnh không thành công');
        }
    };

    function onChange(date, dateString) {
        setValue({ ...value, date_of_birth: dateString });
    }
    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const x = validate('user', value, 'add');
            if (!isValid('user', x)) {
                Object.values(x).forEach((error) => {
                    if (error) {
                        notifyError(error);
                    }
                });
            } else {
                const res = await usersApi.register(value);
                notifySuccess('Tạo người dùng thành công, vui lòng xác thực Email của bạn');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            notifyError('Tạo người dùng không thành công ...!');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <ToastPopup />
            <div className={cx('inner')}>
                <form>
                    <span className={cx('title')}>{t('register.form1.title')}</span>
                    <div className={cx('container')}>
                        <div className={cx('content-left')}>
                            <div>
                                <span>{t('register.form1.name')}(email)</span>
                                <input onChange={handleChange} name="user_name"></input>
                            </div>
                            <div>
                                <span>{t('register.form1.birthday')}</span>
                                <input type="date" onChange={onChange} />
                            </div>
                            <div className={cx('content-email')}>
                                <span>{t('register.form1.email')}</span>
                                <input onChange={handleChange} name="email"></input>
                            </div>
                        </div>
                        <div className={cx('content-right')}>
                            <div>
                                <span>{t('register.form1.password')}</span>
                                <input type="password" onChange={handleChange} name="password"></input>
                            </div>
                            <div>
                                <span>{t('register.form1.gender')}</span>
                                <div className={cx('pick-area')}>
                                    <div className={cx('male')}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            onChange={() => {
                                                setValue({ ...value, gender: 1 });
                                            }}
                                        />{' '}
                                        <p>Nam</p>
                                    </div>
                                    <div className={cx('female')}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            onChange={() => {
                                                setValue({ ...value, gender: 0 });
                                            }}
                                        />{' '}
                                        <p> Nữ</p>
                                    </div>
                                    {/* <select required defaultValue=""
                                            onChange={(event) => setGender(event.target.value)}
                                        >
                                            <option value="male" selected>{t('register.form1.male')}</option>
                                            <option value="store-agriculture">{t('register.form1.female')}</option>
                                        </select> */}
                                </div>
                            </div>
                            <div className={cx('phone')}>
                                <span>{t('register.form1.phone')}</span>
                                <input type="number" onChange={handleChange} name="phone"></input>
                            </div>
                        </div>
                    </div>
                    <div className={cx('uploadimage')}>
                        <label className={cx('upload')} htmlFor="labelUpload">
                            <FontAwesomeIcon icon={faCirclePlus} />
                            {t('register.form1.uploadimage')}
                        </label>
                        <input
                            type="file"
                            id="labelUpload"
                            accept="image/*"
                            name="avatar"
                            hidden
                            onChange={handleUploadImage}
                        />
                    </div>
                    <div className={cx('preview')}>
                        {value.avatar ? (
                            <img src={`${process.env.REACT_APP_API_URL}/${value.avatar}`} alt="" />
                        ) : (
                            <p>preview</p>
                        )}
                    </div>
                    <div className={cx('btn-submit')}>
                        <ButtonComponent small outline onClick={onHide}>
                            {t('register.back')}
                        </ButtonComponent>
                        <ButtonComponent small primary className="modal-btn-submit" onClick={handleSubmit}>
                            {t('register.register')}
                        </ButtonComponent>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default IndividualRegister;
