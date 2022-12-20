import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import './ListConsultant.scss'
import ButtonComponent from '~/components/layouts/components/Button';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import enterpriseApi from '~/api/Enterprise/EnterpriseApi';
import { getAllEnterprise } from '~/store/Enterprise/enterpriseSlice';
import ToastPopup, { notifyError, notifySuccess } from '~/toast/toast';
import { useTranslation } from 'react-i18next';
function ListConsultant() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [id, setID] = useState();
    const { enterpriseList } = useSelector((state) => state.enterpriseReducer);
    useEffect(() => {
        dispatch(getAllEnterprise())
    }, 1000)
    const handleDelete = async (id) => {
        try {
            const res = await enterpriseApi.delete(id);
            if (res.message === "Success") {
                notifySuccess("Xóa thành công!")

            }
            else {
                notifySuccess("Xóa thành công!")
            }
            dispatch(
                getAllEnterprise()
            );
        } catch (error) {
            notifyError("Không xóa được!");
        }
    }
    const checkImage = (arrImage) => {
        if (arrImage === null) return null;
        else return process.env.REACT_APP_API_URL + arrImage[0]?.url;

    };
    const handleOk = () => {
        handleDelete(id);
        setIsOpen(false);
    };
    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <div className="consultants-wrapper">
            <span>{t('text.consultant_list')}</span>
            <Modal
                visible={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >Bạn có chắc chắn muốn xóa</Modal>
            <div className="consultants-list">
                <ToastPopup />
                {
                    enterpriseList?.map((item, index) => {
                        return (
                            <div className="consultants-item" key={index}>
                                <div className="consultants-image">
                                    <img src={checkImage(item.image_url)} alt="Avatar" />
                                </div>
                                <div className="consultants-details">
                                    <div className="consultants-details__left">
                                        <span className="consultants-details__name">{item.name}</span>
                                        <span className="consultants-details-grey">{item.name_of_exchange}</span>
                                        <span className="consultants-details-grey">Mã số thuế: {item.tax_code}</span>
                                        <span className="consultants-details-grey">Số điện thoại: {item.phone}</span>
                                        <span className="consultants-details-grey">Địa chỉ: {item.address}</span>
                                        <span className="consultants-details-grey">Lĩnh vực: {item.field_id.name}</span>
                                    </div>
                                    <div className="consultants-details__right">

                                        <ButtonComponent
                                            onClick={
                                                () => {
                                                    setID(item.id)
                                                    setIsOpen(true)
                                                }
                                            }
                                            primary
                                            small
                                            leftIcon={<FontAwesomeIcon icon={faTrash} />}>{t('text.delete')}</ButtonComponent>
                                        <Link
                                            to={`/consultant/edit-consultant-id=${item.id}`}
                                        >
                                            <ButtonComponent primary small leftIcon={<FontAwesomeIcon icon={faWrench} />}
                                            >{t('text.edit')}</ButtonComponent>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ListConsultant;