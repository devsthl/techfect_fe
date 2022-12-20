import React from 'react';
import classNames from 'classnames/bind';
import styles from './CreateGroup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const cx = classNames.bind(styles);

const CreateGroup = () => {
    const {t} = useTranslation()
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-main')}>
                    <div className={cx('header-title')}>
                        <span>{t('text.group')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.add_group')}</span>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('form-wrapper')}>
                        <div className={cx('upload-avatar')}></div>
                        <Form className={cx('form-inner')}>
                            <div className={cx('bottom-form')}>
                                <div className={cx('form-left')}>
                                    <div className={cx('form-left-group')}>
                                        <label htmlFor="name-input">{t('text.group_name')}</label>
                                        <Form.Item className={cx('form-group')} name="group-name">
                                            <Input className={cx('input-7')} id="name-input" placeholder={t('text.enter_group_name')} />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('form-left-group')}>
                                        <label htmlFor="email-input">Email</label>
                                        <Form.Item className={cx('form-group')} name="email">
                                            <Input
                                                className={cx('input-7')}
                                                id="email-input"
                                                placeholder={t('login.forgetpassword.detail')}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={cx('form-left-group')}>
                                        <label htmlFor="address-input">{t('register.form1.address')}</label>
                                        <Form.Item className={cx('form-group')} name="address">
                                            <Input
                                                className={cx('input-7')}
                                                id="address-input"
                                                placeholder={t('text.enter_address')}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={cx('form-right')}>
                                    <div className={cx('form-right-group')}>
                                        <label htmlFor="address-input">{t('text.Privacy')}</label>
                                        <Form.Item className={cx('form-group')} name="phone">
                                            <Select
                                                className={cx('select-group')}
                                                placeholder={t('text.public')}
                                                // onChange={handleChange}
                                            >
                                                <Option value="jack">{t('text.public')}</Option>
                                                <Option value="lucy">{t('text.private')}</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className={cx('form-right-group')}>
                                        <label htmlFor="website-input">{t('register.form1.address')}</label>
                                        <Form.Item className={cx('form-group')} name="website">
                                            <Input
                                                className={cx('input-3')}
                                                id="website-input"
                                                placeholder={t('text.enter_website_link')}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('action-submit')}>
                                <button className={cx('btn-submit')} type="submit">
                                    {t('text.add_group')}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;
