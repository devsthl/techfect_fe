import React from 'react';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import usersApi from '~/api/usersApi';

const ConfirmRegister = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get('key');

    useEffect(() => {
        const sendToken = async () => {
            await usersApi.confirmRegister({
                token: token.toString(),
            });
        };
        sendToken();
    }, [token]);

    return (
        <h3
            style={{
                padding: '20px 0',
                textAlign: 'center',
            }}
        >
            Chúc mừng bạn đã đăng ký thành công. <Link to={'/login'}>Bấm vào đây</Link> để đăng nhập
        </h3>
    );
};

export default ConfirmRegister;
