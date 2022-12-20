import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import coursesApi from '~/api/CourseApi/coursesApi';
import ChooseTicket from './ChooseTicket';
import './CourseRegister.scss';
import PaymentTicket from './PaymentTicket';
import QuestionsForm from './QuestionsForm';
import TicketRecipient from './TicketRecipient';

const CourseRegister = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [quantityRegis, setQuantityRegis] = useState(0);
    const [step, setStep] = useState('');
    const [listSubcribers, setListSubcribers] = useState();
    const [courseData, setCourseData] = useState({});
    const [paymentMethod, setPaymentMethod] = useState(0);
    const [inforReceiveTicket, setInforReceiveTicket] = useState({
        contact_name: '',
        address: '',
        email: '',
        phone: '',
    });

    const { id } = useParams();

    useEffect(() => {
        const getCourseById = async () => {
            const res = await coursesApi.getCourseById(id);
            setCourseData(res);
        };
        getCourseById();
    }, [id]);

    useEffect(() => {
        setStep(searchParams.get('key'));
    }, [searchParams]);

    const handleListData = (value) => {
        setListSubcribers(value);
    };

    return (
        <div className="course-register">
            <div className="course-register__header">
                <span className="course-register__name">Miễn phí 2 ngày học TechFest online</span>
                <span className="course-register__location">DA VINCI ACADEMY</span>
                <div className="course-register__time">Tuesday, 20 September 2022, 8:00 PM+0700</div>
            </div>
            <div className="course-register__content">
                <div className="content-left">
                    {step === null ? (
                        <ChooseTicket quantityRegis={quantityRegis} setQuantityRegis={setQuantityRegis} />
                    ) : step === 'step-question-form' ? (
                        <QuestionsForm id={id} handleListData={handleListData} quantityRegis={quantityRegis} />
                    ) : step === 'payment' ? (
                        <PaymentTicket
                            setPaymentMethod={setPaymentMethod}
                            setInforReceiveTicket={setInforReceiveTicket}
                            courseData={courseData}
                            quantityRegis={quantityRegis}
                            id={id}
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <div className="content-right">
                    <TicketRecipient
                        inforReceiveTicket={inforReceiveTicket}
                        courseData={courseData}
                        paymentMethod={paymentMethod}
                        quantityRegis={quantityRegis}
                        listSubcribers={listSubcribers}
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseRegister;
