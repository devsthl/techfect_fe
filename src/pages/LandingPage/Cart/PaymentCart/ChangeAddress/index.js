import { Radio, Space } from 'antd';
import React from 'react';
import { useState } from 'react';
import './ChangeAddress.scss';

const ChangeAddress = ({ listAddress, handleChangeAddress }) => {
    const [idAddress, setIdAddress] = useState();

    const onChangeAddress = (e) => {
        setIdAddress(e.target.value);
    };

    const handleSubmit = () => {
        handleChangeAddress(idAddress);
    };

    return (
        <div className="change-address-wrapper">
            <Radio.Group onChange={onChangeAddress}>
                <Space direction="vertical">
                    {listAddress.map((item) => {
                        return <Radio value={item.id}>{item.address_detail.address}</Radio>;
                    })}
                </Space>
            </Radio.Group>

            <div className="action-submit">
                <button onClick={handleSubmit}>Chọn</button>
            </div>
        </div>
    );
};

export default ChangeAddress;
