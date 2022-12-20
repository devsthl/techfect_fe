import 'antd/dist/antd.css';
import { Tabs, Modal } from 'antd';


function ModalConfirm({ visible, onHide }) {
    return (
        <>
            <Modal
                visible={visible}
                onCancel={onHide}
            >
                <div>dang ky thanh cong</div>
            </Modal>
        </>
    );
}

export default ModalConfirm;