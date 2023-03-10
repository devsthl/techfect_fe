import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images/home/header';
import { useTranslation, Trans } from 'react-i18next';
import ButtonComponent from '../Button';
import footerBg from '~/assets/images/home/header/footer.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Footer() {
    const { t } = useTranslation();

    return (
        <div className={cx('wrapper')}>
            {/* <img src={footerBg} alt="banner" className={cx('wrapper-bannber')} />
            <div className={cx('inner')}>
                <div className={cx('container')}>
                    <div className={cx('contents')}>
                        <div className={cx('content-des')}>
                            <p>{t('footer.content')}</p>
                        </div>
                    </div>
                    <div className={cx('form-register')}>
                        <div className={cx('form-register-detail')}>
                            <div className={cx('form-register-detail-list')}>
                                <h3>{t('footer.notification')}</h3>
                                <p>{t('footer.title')}</p>
                                <div className={cx('form-input')}>
                                    <input type="name" placeholder={t('footer.forminput.name')}></input>
                                    <input placeholder={t('footer.forminput.workplace')}></input>
                                    <input placeholder={t('footer.forminput.email')}></input>
                                </div>
                                <ButtonComponent primary small>
                                    {t('homecustomer.register')}
                                </ButtonComponent>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div> */}
            <div className={cx('inner')}>
                <div className={cx('col-group')}>
                    <h5>C??NG TY C??? PH???N C??NG NGH??? S??? SMILETECH</h5>
                    <span className={cx('row-group')}>
                        <FontAwesomeIcon className={cx('phone-icon')} icon={faPhone} /> Hotline: 19001000
                    </span>
                    <span className={cx('row-group')}>
                        <FontAwesomeIcon className={cx('mail-icon')} icon={faEnvelope} /> Mail: contact@smiletech.vn
                    </span>
                    <span>?????a ch???: Villa 3 - B1, Ng?? 40 Xu??n La, Xu??n La, T??y H???, H?? N???i</span>
                    <span>S??? ??i???n tho???i: (+84) 24 3350 3168</span>
                </div>
                <div className={cx('col-group')}>
                    <h5>PH????NG TH???C THANH TO??N</h5>
                    <span className={cx('row-group')}>
                        <img
                            className={cx('payment-icon')}
                            src="https://www.plusweb.vn/uploads/public/2017/04/27/1493265225208_apps-icon-onepay-visa.png"
                            alt=""
                        />
                    </span>
                    <h5 className={cx('delivery')}>?????I T??C THANH TO??N V?? V???N CHUY???N</h5>
                    <span className={cx('row-group')}>
                        <img
                            className={cx('payment-icon')}
                            src="https://theme.hstatic.net/200000472237/1000829412/14/logo.png?v=502"
                            alt=""
                        />
                    </span>
                </div>
                <div className={cx('col-group')}>
                    <h5>K???T N???I V???I CH??NG T??I</h5>
                    <span className={cx('row-group')}>
                        <img className={cx('social-icon')} src={images.fb} alt="" />
                        <img className={cx('social-icon')} src={images.twitter} alt="" />
                        <img className={cx('social-icon')} src={images.whatsapp} alt="" />
                        <img className={cx('social-icon')} src={images.linkien} alt="" />
                    </span>
                    <h5 className={cx('delivery')}>T???I ???NG D???NG MUA H??NG</h5>
                    <span className={cx('row-group')}>
                        <img
                            src="https://tradeline.vn/_next/image?url=%2Fimages%2Fpayment%2FqrTradeline.png&w=96&q=75"
                            alt=""
                        />
                        <div className={cx('right-action')}>
                            <img src="https://tradeline.vn/images/payment/appstore.svg" alt="" />
                            <img src="https://tradeline.vn/images/payment/ggplay.svg" alt="" />
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
