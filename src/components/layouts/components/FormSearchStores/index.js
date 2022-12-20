import classNames from 'classnames/bind';
import styles from './FormSearchStores.module.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation, Trans } from 'react-i18next';
import { Select } from 'antd';

const cx = classNames.bind(styles);
function FormSearchStores() {
    const { t } = useTranslation();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>{/* <p>{t('formsearch.title')}</p> */}</div>
                <form>
                    <div className={cx('form-search')}>
                        <div className={cx('form-input-pick')}>
                            <div className={cx('search-bank')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <input placeholder={t('formsearch.searchstore')} />
                            </div>
                            <div className={cx('pick-stores')}>
                                <select required defaultValue="">
                                    <option value="" disabled selected>
                                        {t('formsearch.selectsall')}
                                    </option>
                                    <option value="food-store">{t('formsearch.selectsall1')}</option>
                                    <option value="store-agriculture">{t('formsearch.selectsall2')}</option>
                                    {/* <option selected value="coconut">Coconut</option> */}
                                    <option value="store-tech">{t('formsearch.selectsall3')}</option>
                                </select>
                            </div>
                            <div className={cx('pick-area')}>
                                <select required defaultValue="">
                                    <option value="" disabled selected>
                                        {t('formsearch.selectarea')}
                                    </option>
                                    <option value="food-store">{t('formsearch.selectarea1')}</option>
                                    <option value="store-agriculture">{t('formsearch.selectarea2')}</option>
                                    {/* <option selected value="coconut">Coconut</option> */}
                                    <option value="store-tech">{t('formsearch.selectarea3')}</option>
                                </select>
                            </div>
                        </div>
                        <button className={cx('form-button')}>{t('formsearch.btnsearch')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormSearchStores;
