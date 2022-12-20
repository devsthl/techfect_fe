import { Dropdown, Menu, message, Space } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import images from '~/assets/images/home/header';
import { useTranslation, Trans } from 'react-i18next';

function Language() {
    const { t, i18n } = useTranslation();
    const [visible, setVisible] = useState(false);
    const language = localStorage.getItem('i18nextLng');

    const handleMenuClick = ({ key }) => {
        i18n.changeLanguage(key);
        window.location.reload();
    };
    const handleVisibleChange = (flag) => {
        setVisible(flag);
    };

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'VI',
                    key: 'vi',
                    icon: <img src={images.vi} />,
                },
                {
                    label: 'EN',
                    key: 'en',
                    icon: <img src={images.en} />,
                },
            ]}
        />
    );
    return (
        <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
            <Space>
                {language === 'vi' ? <img src={images.vi} alt="" /> : <img src={images.en} alt="" />}
                <img src={images.vector} alt="" />
            </Space>
        </Dropdown>
    );
}

export default Language;
