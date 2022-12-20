// import classNames from "classnames/bind";
// import styles from './ModalRegister.module.scss'
import './ModalRegister.scss';
import { Tabs, Modal } from 'antd';
import 'antd/dist/antd.css';
import IndividualRegister from './Individual';
import { useTranslation, Trans } from 'react-i18next';
import { useState, useRef } from 'react';

const { TabPane } = Tabs;
// const cx = classNames.bind(styles)
function ModalRegister({ visible, onHide }) {
    const { t } = useTranslation();
    const childRef = useRef();

    const handleOkClose = () => {
        childRef.current.closeModalFromChild();
    };

    return (
        <>
            <Modal
                // onOk={visible}
                visible={visible}
                onCancel={onHide}
                width={700}
                className="modal-style"
                footer={null}
            >
                <div className="card-container">
                    <Tabs type="card" centered size={'large'}>
                        {/* <TabPane tab={t('register.enterprise')} key="1">
                            <IndividualRegister />
                        </TabPane> */}
                        <TabPane tab={t('register.individual')} key="2">
                            <IndividualRegister onHide={onHide} red={childRef} />
                        </TabPane>
                    </Tabs>
                </div>
            </Modal>
        </>
    );
}

export default ModalRegister;
