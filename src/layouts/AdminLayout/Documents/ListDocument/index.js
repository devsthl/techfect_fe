import classNames from 'classnames/bind';
import images from '~/assets/images/home/header';
import styles from './ListDocument.module.scss';
import { Link } from 'react-router-dom';
import ButtonComponent from '~/components/layouts/components/Button';
import { Modal } from 'antd';
import documentApi from '~/api/Document/documents.Api';
import { useState, useEffect } from 'react';
import { getAllDocuments } from '~/store/Documents/documentsSlice';
import ToastPopup, { notifyError, notifySuccess, notifyWarning } from '~/toast/toast';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
function ListDocument({ item }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [id, setID] = useState();
    const { t } = useTranslation();
    const handleOk = () => {
        handleDelete(id);
        setIsOpen(false);
    };
    useEffect(() => {
        dispatch(getAllDocuments());
    }, 1000);
    const handleDelete = async (id) => {
        try {
            const res = await documentApi.delete(id);
            if (res.message === 'Success') {
                notifySuccess('Xóa thành công!');
            } else {
                notifySuccess('Xóa thành công!');
            }
            dispatch(getAllDocuments());
        } catch (error) {
            notifyError('Không xóa được!');
        }
    };
    const handleCancel = () => {
        setIsOpen(false);
    };
    const view = item.image_url.map((item1) => {
        if (item1.url) return item1.url;
        return item1;
    });

    return (
        <div className={cx('wrapper')}>
            <Modal visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
                Bạn có chắc chắn muốn xóa
            </Modal>
            <div className={cx('content-left')}>
                <div>
                    <p className={cx('type')}>PDF</p>
                </div>
                <div className={cx('des-title')}>
                    <p className={cx('title')}>{item.name}</p>
                    {/* <span className={cx('title2')}>{item.event.des}</span> */}
                    <div className={cx('list-function')}>
                        <div className={cx('time')}>
                            <img src={images.documenticontime} />
                            20/10/2020
                        </div>
                        <div className={cx('time')}>
                            <img src={images.documenticoneye} />
                            1000 {t('text.view')}
                        </div>
                        <div className={cx('time')}>
                            <img src={images.documenticondownload} />
                            1000 {t('text.download')}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('content-right')}>
                <div className={cx('right')}>
                    <img src={images.documenticonfolder} />
                    6.1 MB
                </div>
                <div className={cx('right2')}>
                    <img src={images.documenticondownload} />
                    {t('text.view')}
                </div>
                <div className={cx('detail-view')}>
                    {item.type === 1 ? (
                        <Link to={`/document`}>{t('text.See_details')}</Link>
                    ) : (
                        <a href={`${process.env.REACT_APP_API_URL}${`${view}`}`}>{t('text.See_details')}</a>
                    )}
                    <div className={cx('detail-edit-delete')}>
                        <Link to={`/edit-document-id=${item.id}`}>
                            <p>{t('text.edit')}</p>
                        </Link>
                        <p
                            onClick={() => {
                                setID(item.id);
                                setIsOpen(true);
                            }}
                        >
                            {t('text.delete')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListDocument;
