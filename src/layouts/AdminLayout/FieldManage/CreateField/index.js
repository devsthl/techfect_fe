import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, message } from 'antd';
import React from 'react';
import { useState } from 'react';
import storeApi from '~/api/StoreApi/storeApi';
import './CreateField.scss';
import { useTranslation } from 'react-i18next';

const CreateField = () => {
    const {t} = useTranslation()
    const [loading, setLoading] = useState(false);
    const [fieldData, setFieldData] = useState({
        name: '',
        des: '',
    });

    const handleChangeField = (e) => {
        setFieldData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await storeApi.createField(fieldData);
        if (result.message === 'error') {
            message.error('Tạo lĩnh vực không thành công');
        } else {
            message.success('Tạo lĩnh vực thành công');
        }
    };

    return (
        <div className="create-field" id="field-wrapper">
            <div className="inner">
                <div className="header-main">
                    <div className="header-title">
                        <span>{t('text.company')}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>{t('text.company_list')}</span>
                    </div>
                </div>
                <div className="content-main">
                    <h3>{t('text.basic_information')}</h3>
                    <div className="field-group">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>{t('text.Store_name')}</label>
                                <Input name="name" onChange={handleChangeField} />
                            </div>
                            <div className="form-group">
                                <label>{t('text.Store_description')}</label>
                                <Input.TextArea name="des" onChange={handleChangeField} />
                            </div>
                            <h3>{t('text.Founder_information')}</h3>
                            <div className="form-group">
                                <label>{t('footer.forminput.name')}</label>
                                <Input name="des" onChange={handleChangeField} />
                            </div>
                            <div className="form-group">
                                <label>{t('text.description')}</label>
                                <Input name="des" onChange={handleChangeField} />
                            </div>
                            <div className="action-submit">
                                <button type="submit">{t('text.create_stores')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateField;
