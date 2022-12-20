import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './CreatePackage.scss';

const CreatePackage = () => {
    return (
        <div className="wrapper" id="create-package">
            <div className="inner">
                <div className="header-main">
                    <div className="header-title">
                        <span>Quản lý gói</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <span>Tạo gói mới</span>
                    </div>
                </div>
                <div className="content-main"></div>
            </div>
        </div>
    );
};

export default CreatePackage;
