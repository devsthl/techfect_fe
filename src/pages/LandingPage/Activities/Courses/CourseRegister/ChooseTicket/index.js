import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import './ChooseTicket.scss';

const ChooseTicket = ({ setQuantityRegis, quantityRegis }) => {
    const [disabledDown, setDisabledDown] = useState();
    const [disabledUp, setDisabledUp] = useState();

    useMemo(() => {
        if (quantityRegis === 0) {
            setDisabledDown(true);
        } else {
            setDisabledDown(false);
        }
        if (quantityRegis === 5) {
            setDisabledUp(true);
        } else {
            setDisabledUp(false);
        }
    }, [quantityRegis]);

    return (
        <div className="choose-ticket">
            <div className="choose-ticket__header">
                <div className="participate">Số người tham gia</div>
                <div className="ticket-price">Giá vé</div>
                <div className="quantity">Số lượng</div>
            </div>
            <div className="choose-ticket__body">
                <div className="content-participate">Số lượng người tham gia ( Số lượng từ 3-5 người )</div>
                <div className="content-price">0 VNĐ</div>
                <div className="content-quantity">
                    <div className="commodity-quantity__group">
                        <button disabled={disabledDown} onClick={() => setQuantityRegis(quantityRegis - 1)}>
                            <FontAwesomeIcon className="minus" icon={faMinus} />
                        </button>
                        <input value={quantityRegis}></input>
                        <button disabled={disabledUp} onClick={() => setQuantityRegis(quantityRegis + 1)}>
                            <FontAwesomeIcon className="plus" icon={faPlus} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseTicket;
