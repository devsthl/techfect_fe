import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import onePayApi from '~/api/Onepay/onepay';

const PaymentOnepay = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const key = searchParams.get('vpc_MerchTxnRef');
    const type = searchParams.get('type');
    console.log('type', typeof type);

    useEffect(() => {
        if (key !== null && type === '4') {
            const checkTransaction = async () => {
                const res = await onePayApi.checkTransaction({ payment_code: key.toString() });
            };
            checkTransaction();
        }
        if (key !== null && type === '2') {
            const checkTransactionPackage = async () => {
                const res = await onePayApi.checkTransactionPackage({ payment_code: key.toString() });
            };
            checkTransactionPackage();
        }
    }, [key, type]);

    const handleToLogin = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            Chúc mừng bạn đã đăng ký thành công.{' '}
            <button
                style={{
                    background: '#ffffff',
                    cursor: 'pointer',
                    color: '#0000FF',
                }}
                onClick={handleToLogin}
            >
                Bấm vào đây
            </button>{' '}
            để trở về đăng nhập lại
        </div>
    );
};

export default PaymentOnepay;
