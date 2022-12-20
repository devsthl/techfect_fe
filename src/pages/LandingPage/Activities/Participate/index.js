import { message, Modal } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllEventsWithPag } from '~/store/Categories/eventSlice';
import './Participate.scss';
import RegCompetition from './RegCompetition';

const Participate = () => {
    const [showModalRegCompetition, setShowModalRegCompetition] = useState();
    const [idCompetition, setIdCompetition] = useState();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { eventListPag } = useSelector((state) => state.eventsReducer);

    useEffect(() => {
        dispatch(
            getAllEventsWithPag({
                type: 3,
                page_index: 1,
                page_size: 5,
            }),
        );
    }, []);

    let newDate = new Date();

    return (
        <div className="competition-wrapper" id="competition-activity">
            <div className="list-competition">
                {eventListPag.map((item) => {
                    return (
                        <div key={item.id} className="competition-item">
                            <img
                                src="https://images.all-free-download.com/images/graphiclarge/beach_cloud_dawn_horizon_horizontal_landscape_ocean_601821.jpg"
                                alt=""
                            />
                            <div className="competition-details">
                                <h3>{item.name}</h3>
                                <span className="date-time">Date : 22/12/2011 (16:00 {t('text.to')} 22:00)</span>
                                <div className="status">
                                    {t('text.status')} :
                                    <span>
                                        {newDate > Date.parse(item.start_time) && newDate < Date.parse(item.end_time)
                                            ? t('text.On_going')
                                            : newDate < Date.parse(item.start_time)
                                            ? t('text.Up_coming')
                                            : t('text.Ended')}
                                    </span>
                                </div>
                                <div className="program">
                                    {t('text.Programmes')}: <span>{item.des}</span>
                                </div>
                            </div>
                            <div className="action-submit">
                                <button
                                    onClick={() => {
                                        setShowModalRegCompetition(true);
                                        setIdCompetition(item);
                                    }}
                                >
                                    {t('text.Register')}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Modal
                wrapClassName="modal-cus modal-register-competition"
                title="Đăng ký tham gia"
                centered
                footer={null}
                onCancel={() => setShowModalRegCompetition(false)}
                visible={showModalRegCompetition}
            >
                <RegCompetition visible={setShowModalRegCompetition} idCompetition={idCompetition} />
            </Modal>
        </div>
    );
};

export default Participate;
